<template>
    <div>
        <base-title value="群成员"></base-title>
        <scroller height="-44" lock-x scrollbar-y ref="scroller"
                  :use-pullup="true" :pullup-config="pullConfig"
                  @on-pullup-loading="pullupCallback">
            <div>
                <div class="member_container">
                    <div v-for="(member, index) in memberList" class="member_item vux-1px-b" :index="index">
                        <img slot="icon" class="avatar_con mr6" :src="member.avatar"/>
                        <span v-text="member.name" class="member_name"></span>
                        <span v-text="'邀'+member.inviteNum+'位好友'" class="invite_number"></span>
                    </div>
                </div>
                <divider v-if="!more">没有更多了</divider>
            </div>
        </scroller>
    </div>
</template>

<script>
    let axios = require("axios");
    require('es6-promise').polyfill();

    import baseTitle from '../baseTitle.vue';
    import common from '../common/common.es6';
    import utils from  '../../utils/utils.es6';
    import lay from '../index/layout.es6';
    import {Scroller, Group, Cell, LoadMore, Divider} from 'vux';
    import WebStorageCache from 'web-storage-cache';
    let socialManageMemberCache =  new WebStorageCache({storage: 'sessionStorage'});
    import dialog from "../../utils/dialog.es6";


    export default {
        components: {
            baseTitle,
            Scroller,
            Group,
            Cell,
            LoadMore,
            Divider
        },
        data () {
            return {
                pullConfig: {
                    content: '上拉加载更多',
                    pullUpHeight: 60,
                    height: 40,
                    autoRefresh: false,
                    downContent: '释放以加载数据',
                    upContent: '加载中...',
                    loadingContent: '加载中...',
                    clsPrefix: 'xs-plugin-pullup-'
                },
                memberList: [],
                socialId: "",
                pageIndex:0,
                more:1
            }
        },
        computed: {
            sessionKey(){
                return "social_manage_member_" + this.socialId;
            }
        },
        mounted() {
            this.setId();
            this.getData();
        },
        methods: {
            setId(){
                this.socialId = this.$route.params.id || 0;
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
                return socialManageMemberCache.get(this.sessionKey);
            },
            getDataFromNetwork(callback){
                let that = this;
                if (typeof callback === "function") {
                    let obj = {communityId: that.socialId,pageIndex:that.pageIndex,pageSize:20};
                    let dataUrl = '/api/mg/community/group/member_list';
                    axios.post(dataUrl,lay.strSign('socialmember', obj))
                        .then(function (respone) {
                            let result = respone.data;
                            if (+result.code) {
                                dialog.alert('网络异常，请稍后重试(' , result.code , ")");
                                that.done();
                            } else {
                                callback(result.data);
                            }
                        })
                        .catch(function (error) {
                            dialog.alert('网络异常');
                            that.done();
                        });
                }
            },
            // 加载完成
            done(){
                var that = this;
                that.$refs.scroller.reset();
                that.$refs.scroller.donePullup();
                if(!that.more){
                    that.$refs.scroller.disablePullup();
                }
            },
            setData(data){
                var that = this;
                this.memberList = this.memberList.concat(data.dataList);
                this.more = +data.more;
                this.pageIndex = data.nextPageIndex;
                console.log(data.dataList,this.memberList);
                this.$nextTick(function(){
                    that.done();
                })
            },
            pullupCallback(){
                let that = this;
                this.getDataFromNetwork(function (data) {
                    that.setData(data);
                })
            }

        }
    }

</script>
<style scoped>
    .member_container{
        background-color: #fff;
        padding: 0 5px;
    }
    .member_item {
        padding: 10px;
        position: relative;
        border-bottom: 1px solid #eee;
        line-height: 30px;
    }

    .avatar_con {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }

    .invite_number{
        font-size:10px;
        position:absolute;
        right:10px;
        color:#999;
    }

    .mr6 {
        margin-right: 6px;
    }

    .member_name{
        height: 26px;
        overflow: hidden;
        display: inline-block;
        position: absolute;
        right: 80px;
        left: 46px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

