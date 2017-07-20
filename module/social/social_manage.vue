<template>
  <div class="social_manage" style="overflow: scroll;" :style="{height:document.body.clientHeight-44+'px'}">
    <base-title value="群信息"></base-title>
    <div>
      <group>
        <cell title="群主" class="avatar_outer">
          <div slot="value">
            <span class="v-middle mr6" v-text="communityHolderName"></span>
            <img class="avatar_con"
                 :src="communityHolderImage"
                 alt="">
          </div>
        </cell>
        <cell title="群名称" :value="communityTitle"></cell>
        <cell title="群成员" is-link :link="{path:'/member/'+socialId}" >
                        <span slot="child" class="avatar_list">
                            <img v-for="(communityMemberItem,index) in communityMemberList" class="avatar_con mr10"
                                 :src="communityMemberItem.avatar"
                                 v-if="index<avatarNum"
                                 alt="">
                        </span>
        </cell>
        <cell title="群介绍" :inline-desc="communityIntro" :value="describe">

        </cell>
      </group>

      <group>
        <div @click="goToGroup()">
          <cell :title="momGrowUpTitle" is-link ></cell>
        </div>
      </group>
      <div style="height: 40px"></div>
    </div>



  </div>
</template>

<script>
  let axios = require("axios");
  require('es6-promise').polyfill();
  import WebStorageCache from 'web-storage-cache';
  import {Scroller, Group, CellBox, Toast, ToastPlugin} from 'vux';
  import Cell from '../vux-fix/cell.vue'
  import baseTitle from '../baseTitle.vue';
  import common from '../common/common.es6';
  import utils from  '../../utils/utils.es6';
  import lay from '../index/layout.es6';
  Vue.use(ToastPlugin);
  let socialManageCache = new WebStorageCache({storage: 'sessionStorage'});
  import dialog from "../../utils/dialog.es6";


  export default {
    components: {
      Group,
      Cell,
      CellBox,
      baseTitle,
      Toast,
      Scroller
    },
    data() {
      return {
        socialId: "",
        communityHolderName: "", //群主昵称
        communityHolderImage: "//pic.davdian.com/free/default_head_icon_0419.png", // 群主头像
        communityTitle: "", //群名称
        communityMemberList: [], //群成员
        showMenus: false,
        communityIntro: null,
        describe: "未设置",
        momGrowUpTitle: "",
        monGrowUpContent: "javascript:void(0)",
        avatarNum:0
      }
    },
    computed: {
      sessionKey(){
        return "social_manage_" + this.socialId;
      },
      nextSessionKey(){
        return "social_manage_member_" + this.socialId;
      }
    },
    mounted() {
      let that = this;
      if (localStorage.getItem('equipment')){
        window.history.back()
      }
      this.setId();
      this.getData();
      that.setAvatarNum();
      window.onresize = function () {
        that.setAvatarNum();
      }
    },
    methods: {
      setAvatarNum(){
        var that = this;
        var w = document.body.clientWidth;
        var w0 = w<375?36:40;
        setTimeout(function () {
          var w2 = document.body.clientWidth;
          if(w==w2){
            that.avatarNum = Math.floor((w-100)/w0);
          }
        },100);
      },
      goToGroup(){
        socialManageCache.set("socialManageFlag",1);
        window.location=this.monGrowUpContent;
      },
      setId(){
        this.socialId = this.$route.params.id || 0;
      },
      /**
       *  预加载数据
       */
      preloadData(){
        let that = this;
        let obj = {communityId: that.socialId, pageIndex: 0, pageSize: 50};
        let dataUrl = '/api/mg/community/group/member_list';
        axios.post(dataUrl, lay.strSign('socialmanage', obj))
          .then(function (respone) {
            if (respone.data && !+respone.data.code) {
              socialManageCache.set(that.nextSessionKey, respone.data.data);
            } else {

            }
          })
          .catch(function (error) {

          });
      },
      getData(){
        let that = this;
        let data = this.getDataFromSession();
        if (!data) {
          that.getDataFromNetwork(function (data) {
            that.setData(data);
          });
        } else {
          that.setData(data);
        }
      },
      getDataFromSession(){
        return socialManageCache.get(this.sessionKey);
      },
      getDataFromNetwork(callback){
        let that = this;
        if (typeof callback === "function") {
          let obj = {communityId: that.socialId};
          let dataUrl = '/api/mg/community/group/info';
//          dataUrl="../data/communityManage.json";
          axios.post(dataUrl, lay.strSign('socialmember', obj))
            .then(function (respone) {
              let result = respone.data;
              if (+result.code) {
                dialog.alert('网络异常，请稍后重试(', result.code, ")");
              } else {
                callback(result.data);
              }
            })
            .catch(function (error) {
              dialog.alert('网络异常');
            });
        }
      },
      setData(data){
        let that = this;
        let {
          communityHolderName,
          communityHolderImage,
          communityTitle,
          communityMember: {
            list
          },
          communityIntro,
          momGrowUp: {
            title,
            command: {
              content
            }
          }
        } = data;
        this.communityHolderName = communityHolderName;
        this.communityHolderImage = communityHolderImage;
        this.communityTitle = communityTitle;
        this.communityMemberList = list;
        this.communityIntro = communityIntro.replace(/\n/g,"<br/>");
        if (communityIntro) {
          this.describe = "";
        }
        if (!communityTitle || communityTitle === "") {
          this.communityTitle = "未设置";
        }
        this.momGrowUpTitle = title;
        this.monGrowUpContent = content;
        this.$nextTick(function () {
          that.preloadData();
          that.$refs.manage.reset();
        })
      }
    }
  }

</script>

<style scoped>
  .weui-cell__ft:after:after{
    height: 8px;
    width: 8px;
    border-width: 1px 1px 0 0;
    color: #999;
  }

  .avatar_outer{
    height: 70px;
  }

  .avatar_con {
    width: 50px;
    border-radius: 50px;
  }

  .v-middle {
    vertical-align: middle;
  }

  .mr6 {
    margin-right: 6px;
  }
  .mr10 {
    margin-right: 10px;
  }

  .avatar_list {
    position: absolute;
    left: 4.5em;
  }

  .avatar_list .avatar_con {
    width: 30px;
  }
  @media screen and (max-width: 374px){
    .avatar_list .avatar_con {
      width: 26px;
    }
  }
</style>
<style>
  .social_manage .vux-label, .social_manage .weui-cell__ft, .social_manage .v-middle {
    font-size: 14px;
    line-height: 24px;
  }
</style>
