<template>
    <div>
        <coursetitle v-if="!inApp"></coursetitle>
        <index-feed :data="feedList"></index-feed>
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
                name:"allSchool",
                data:[]
            }
        },
        created:function () {
          console.log(44444);
        },
        mounted:function () {
            this.init()
            if (window.appData){
              window.appData.isAudioAbsorb = 1
              window.appData.isShowAudio = 1
            } else {
              window.appData = {
                'isAudioAbsorb':1,
                'isShowAudio':1
              }
            }
            
            setTimeout(function(){
                window.bravetime.initHead()
            },500)
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
            indexFoot:indexFoot
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
