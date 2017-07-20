<template>
    <div class = "mt_10" id = "comon">
        <div class="df_new_title_2" style="border-bottom: none">
            <span class="df_new_font">猜你喜欢</span>
        </div>
        <div class="logo_container"  v-show = "beforeFirstLoading">
            <div class="logo_left"></div>
            <div class="logo_right"></div>
        </div>
        <div style="clear: both;">
        </div>
        <category refer="guess_detail" :referer="referer"></category>
        <!--<category refer="guess_detail"-->
                  <!--:referer="referer"-->
                  <!--:list = "list"-->
                  <!--:loading = "beforeFirstLoading"></category>-->

    </div>
</template>

<script>
    var category = require("../module/category.vue");
//      var category = require("../src/component/com-maybeyoulike.vue");
    export default {
        el:"#maybeYouLike",
        data:function(){
            return{
                loading:false,
                no_more:false,
                ajaxing:true,
                beforeFirstLoading:false,
                list:[],
                referer:{}
            }
        },
        components:{
            category:category,
        },
        created:function(){
            this.scroll();

            var height = $("body").height() - 20;

            if(height < $(window).height()){
                this.getData();
            }
        },
        methods:{
            scroll:function(){
                var scope = this;
                $(window).scroll(function(){//滚动条滚动事件
                    if(window.disabledGoodsLoading){
                        return false;
                    }
                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置
                        scope.getData();
                    }
                })
            },
            getData:function(){
                var scope = this;
                if(!scope.no_more) {
                    if (scope.ajaxing) {
                        scope.beforeFirstLoading = true;//显示加载动画
                        scope.ajaxing = false;
                        $.ajax({
                            url: maybeYouLikeUrl,
                            dataType: "json",
                            success: function (result) {
                                scope.ajaxing = true;
                                scope.beforeFirstLoading = false;//获取数据成功 加载动画隐藏
                                scope.list = result.data;
                                scope.referer = result.referer;
                                scope.no_more = true;//判定值 改为false
                            }, error: function () {
                                scope.ajaxing = true;
                                scope.beforeFirstLoading = false;
                                scope.no_more = true;
                            }
                        });
                    }
                }
            },
            change:function(){
                this.$broadcast('changeData',this.list);
            },
            no_mores:function () {
                this.$broadcast('no_mores',this.no_more);
            }

        },
        watch:{
            'list':'change',
            'no_more':'no_mores',
        }

    }
</script>
