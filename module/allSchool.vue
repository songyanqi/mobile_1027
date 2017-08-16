<template>
    <div>
        <coursetitle v-if="!inApp"></coursetitle>
        <bd_study_0></bd_study_0>
        <index-feed :data="feedList"></index-feed>
        
        <div class='footerBlock'></div>
        <!--<index-foot :data='footData' v-if='!app'></index-foot>-->
        <index-foot active="school" v-if='!app'></index-foot>
    </div>
</template>


<script>
    import layout from "./index/layout.es6"
    import indexFeed from '../module/index/index_feed.vue'
    import coursetitle from '../module/course_title.vue'
//    import indexFoot from '../module/index/index_footer.vue'
    import indexFoot from '../src/component/com-footer.vue'
    import common from "./common/common.es6";
    import bd_study_0 from "./index/feed/bd_study_0.vue";

    export default{
        data:function(){
            return{
                feedList:[],
                footData: {
                    active: 1,
                    cart: 0
                },
                app: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
                inApp:window.Units&&Units.isApp()
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
            bd_study_0:bd_study_0
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
</style>
