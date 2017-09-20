<template>
  <!--底部菜单栏-->
  <div class="com-footer" v-if="!isDvdApp">
    <div class="btns">
      <a class="btn" :class="{active: active == 'home'?true:false }" href="/" :style="styleList['btn1']">
        <div class="pic-title">
          <img class="pic" v-if="active == 'home'" :src="useSkinPackageImg(btnList[0],'//pic.davdian.com/free/footer-icon/home-active.png',1)">
          <img class="pic" v-else  :src="useSkinPackageImg(btnList[0],'//pic.davdian.com/free/footer-icon/home.png',0)">
          <div class="title" :style="styleList[active == 'home'?'selectedColor':'normalColor']">首页</div>
        </div>
      </a>
      <a class="btn" :class="{active:active == 'school'?true:false}" href="/course.html"  :style="styleList['btn2']">
        <div class="pic-title">
          <img class="pic" v-if="active == 'school'" :src="useSkinPackageImg(btnList[1],'//pic.davdian.com/free/footer-icon/school-active.png',1)">
          <img class="pic" v-else :src="useSkinPackageImg(btnList[1],'//pic.davdian.com/free/footer-icon/school.png',0)">
          <div class="title" :style="styleList[active == 'school'?'selectedColor':'normalColor']">学院</div>
        </div>
      </a>
      <a class="btn" v-if="btnList[2]" :style="styleList['btn3']" :href="styleList['showUrl']">
        <img class="pic" :src="useSkinPackageImg(btnList[2],'',1)" v-if="false">
        <img class="pic" :src="useSkinPackageImg(btnList[2],'',0)" v-if="true">
      </a>
      <a class="btn" v-else style="font-size: 16px;" href="/act_1018_main.html">
        1018<br>测试入口
      </a>
      <a class="btn" :class="{active:active == 'dynamic'?true:false}" href="/articles.html"  :style="styleList['btn4']">
        <div class="pic-title">
          <img class="pic" v-if="active == 'dynamic'" :src="useSkinPackageImg(btnList[3],'//pic.davdian.com/free/footer-icon/dynamic-active.png?2',1)">
          <img class="pic" v-else :src="useSkinPackageImg(btnList[3],'//pic.davdian.com/free/footer-icon/dynamic.png?2',0)">
          <div class="title" :style="styleList[active == 'dynamic'?'selectedColor':'normalColor']">动态</div>
        </div>
      </a>
      <a class="btn" :class="{active: active == 'center' ? true : false}" href="/center.html"  :style="styleList['btn5']">
        <div class="pic-title">
          <img class="pic" v-if="active == 'center'" :src="useSkinPackageImg(btnList[4],'//pic.davdian.com/free/footer-icon/center-active.png',1)">
          <img class="pic" v-else  :src="useSkinPackageImg(btnList[4],'//pic.davdian.com/free/footer-icon/center.png',0)">
          <div class="title" :style="styleList[active == 'center' ? 'selectedColor' : 'normalColor']">我的</div>
        </div>
      </a >
    </div>
  </div>
</template>

<script>
  import ua from '../common/js/module/ua.js';
  import encrypt from '../common/js/module/encrypt.js';

  export default {
    props: {
      // 取值范围 home school dynamic center
      active: {
        type: String,
        default: 'home'
      },
      cartNum: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        isDvdApp: ua.isDvdApp(),
        bottomTab:[],
        bottomStyle:{}
      }
    },
    computed: {
        btnList:function () {
          return this.bottomTab;
        },
        styleList:function () {
          return this.bottomStyle;
        }
    },
    created(){
    },
    mounted() {
      this.useSkinpackage();
    },
    methods: {
      changStyle(json){
        //初始化存储数组
        this.bottomTab=[];
        //存入图片信息
        this.bottomTab.push({defaultImage:json["10"].listData[0].normalImagePath,selectedImage:json["10"].listData[0].selectedImagePath});
        this.bottomTab.push({defaultImage:json["10"].listData[1].normalImagePath,selectedImage:json["10"].listData[1].selectedImagePath});
        this.bottomTab.push({defaultImage:json["10"].listData[2].normalImagePath,selectedImage:json["10"].listData[2].selectedImagePath});
        this.bottomTab.push({defaultImage:json["10"].listData[3].normalImagePath,selectedImage:json["10"].listData[3].selectedImagePath});
        this.bottomTab.push({defaultImage:json["10"].listData[4].normalImagePath,selectedImage:json["10"].listData[4].selectedImagePath});
        //存入样式信息
        this.bottomStyle.btn1={"marginTop":json["10"].listData[0].marginTop + "px"};
        this.bottomStyle.btn2={"marginTop":json["10"].listData[1].marginTop + "px"};
        this.bottomStyle.btn3={"marginTop":json["10"].listData[2].marginTop + "px"};
        this.bottomStyle.btn4={"marginTop":json["10"].listData[3].marginTop + "px"};
        this.bottomStyle.btn5={"marginTop":json["10"].listData[4].marginTop + "px"};
        //存入活动的点击链接
        this.bottomStyle.showUrl=json["10"].listData[2].showActivityUrl;
        //底部tab文字的默认样式和选中样式
        this.bottomStyle.normalColor={"color":"#"+json["10"].listData[0].normalColor.substr(2)};
        this.bottomStyle.selectedColor={"color":"#"+json["10"].listData[0].selectedColor.substr(2)};

      },
      useSkinpackage(){
        var that=this;

        if(localStorage.getItem("skinPackage")) {
          var skinInfo = JSON.parse((localStorage.getItem("skinPackage")));
          skinInfo.map(function (item, index) {
             var now = new Date().getTime().toString().substr(0,10);
             var startTime = item.startTime;
             var endTime = item.endTime;
             if (parseInt(startTime) <= parseInt(now) && parseInt(endTime) > parseInt(now)) {
               that.changStyle(item.json);
             }
           });
         }
      },
      useSkinPackageImg(newImg,oldImg,flag){
          //flag=1 表示选中状态的图片
          //flag=0 表示未选中状态的图片
          if(newImg){
              if(flag==1){//selectedImage
                  if(newImg.selectedImage){
                      return newImg.selectedImage;
                  }
                  return oldImg;
              }else if(flag==0){//defaultImage
                if(newImg.defaultImage){
                  return newImg.defaultImage;
                }
                return oldImg;
              }
          }
          return oldImg;
      },
      /**
       * 接口名称:
       * 接口文档:
       */
      getData(){
        let ts = this;
        $.ajax({
          cache: false,
          async: true,
          url: '/api/m/index/cart?_=' + Date.now(),
          type: 'post',
          dataType: 'json',
          data: encrypt({}),
          success(response) {
            ts.response = response;
          },
          error(error) {
//            ts.response = require('../json/center.json');
            console.error('ajax error:' + error.status + ' ' + error.statusText);
          }
        });
      },
    },
    filters: {},
    watch: {},
  }
</script>

<style lang="sass" lang="scss" rel="stylesheet/scss">
  @import "../common/css/util/all";
  .pic{
    max-width:100%;
  }
  // 底部菜单栏
  .com-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    font-size: 0;
    max-width: $pageMaxWidth;
    z-index: 9;
    &:before {
      content: '';
      display: block;
      width: 100%;
      border-top: 1px solid #E3DFD8;;
      transform: scaleY(0.5);
    }
    .btns {
      display: flex;
      height: 50px;
      .btn {
        flex: 1;
        display: block;
        text-align: center;
        .pic-title {
          position: relative;
          display: inline-block;
          .pic {
            display: inline-block;
            width: 50px;
            height: 50px;
            .num {
              position: absolute;
              top: 0;
              right: -8px;
              @include circle(16px);
              background: #FF4A7D;
              font-size: 10px;
              color: white;
              font-style: normal;
            }
          }
          .title {
            position: absolute;
            top: 30px;
            width: 100%;
            line-height: 14px;
            font-size: 10px;
            color: #999;
          }
        }
        &.active {
          .pic-title {
            .pic {
              .num {
              }
            }
            .title {
              color: #FF4A7D;
            }
          }
        }

      }
    }
  }
</style>
