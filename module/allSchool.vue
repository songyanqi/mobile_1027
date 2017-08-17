<template>
    <div>
        <coursetitle v-if="!inApp"></coursetitle>
        <index-feed :data="feedList"></index-feed>
        <study :data="data"></study>
        <div class='footerBlock'></div>
        <!--<index-foot :data='footData' v-if='!app'></index-foot>-->
        <index-foot active="school" v-if='!app' class="footer"></index-foot>
    </div>
</template>


<script>
    import layout from "./index/layout.es6"
    import indexFeed from '../module/index/index_feed.vue'
    import coursetitle from '../module/course_title.vue'
//    import indexFoot from '../module/index/index_footer.vue'
    import indexFoot from '../src/component/com-footer.vue'
    import common from "./common/common.es6";
    import study from "./index/feed/bd_study_0.vue";


    export default{
        data:function(){
            return{
                feedList:[],
                footData: {
                    active: 1,
                    cart: 0
                },
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                inApp:window.Units&&Units.isApp(),
                data: {
                    "body":{
                      "tplId":"bd_study_0",
                      "bgColor":"0x333333",
                      "dataList":[
                        {
                          "albumId":"0", // 专辑id
                          "musicId":"0", // 音频id
                          "isFree":"0",//0免费 1:付费
                          "title":"第78级 小猪佩奇",
                          "time":"240",//秒数
                          "album":"<小猪佩奇>",
                          "isPlay":"0",//0:不可播 1:可播
                          "fileLink":"http://haba.davdian.com/aaaa/01.mp3",
                          "imageUrl":"//pic.davdian.com/free/2017/08/16/181efe7696e4dc1981c7bc0473f21783.jpg",
                          "command": {
                            "albumContent" : "专辑详情",
                            "musicContent" : "音乐详情",
                          }
                        },
                      ]
                    }
                  }
            }
        },
        created:function () {
          console.log(44444);
        },
        mounted:function () {
            this.init()
        },

        methods:{
            init(){
              var that = this
              $.ajax({
                type:'post',
                url : '/api/mg/content/course/index',
                dataType: 'json',
                data : layout.strSign('course'),
                success:function(data){
                  that.feedList = data.data.feedList
                },
                error:function (e) {
                  console.log('e->', e)
                }
              })
              this.cart()
            },
            cart: function () {
                var that = this
                $.ajax({
                    type : "POST",
                    url : layout.config.cart,
                    data : layout.strSign('cart'),
                    dataType: 'json',
                    success : function(data) { 
                        if (data.code == 0) {
                            layout.dataVersion('cart', data)
                            if (data.data) {
                                localStorage.setItem('cartList', JSON.stringify(data))
                                that.footData.cart = data.data.goodsNum
                            } else {
                                that.footData.cart = JSON.parse(localStorage.getItem('cartList')).data.goodsNum
                            }
                        }
                    },
                    error: function (e) {
                        console.log("Oops, error", e)
                    }  
                })
            }
        },
        components:{
            indexFeed:indexFeed,
            coursetitle:coursetitle,
            indexFoot:indexFoot,
             study:study
        }
    }
</script>
<style>
    body{
        padding-top: 0;
    }
</style>
<style scoped>
    .footerBlock{
        width: 100%;
        height: 50px;
    }
  .footer{
    z-index: 4;
  }
</style>
