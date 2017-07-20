<template>
    <div class="top0" v-if="!in_app">
        <div class="top_container">

            <div class="top_left">
                <a class="top_back" href="/">
                    <span class="home_arrow"></span>
                </a>
            </div>
            <div class="title_container">
                您来晚了
            </div>
            <div class="top_right">
                <a href="/" class="top_home">
                    <span class="home_icon"></span>
                </a>
            </div>
        </div>
    </div>

    <div class="activity_late">
        来晚了，活动已结束！
    </div>

    <div class="orange_title ">
        <span class="orange_title_font">猜你喜欢</span>
    </div>
    <category
      :list = "list"
      :no_more = "no_more"
      :errors = "errors"
      :loading = "beforeFirstLoading"></category>

</template>
<style>
    .activity_late {
        width: 100%;
        height: 120px;
        background-color: #d9d9dc;
        font-size: 16px;
        color: #333;
        text-align: center;
        line-height: 120px;
        margin-bottom: -12px;
    }
    body{
        padding-bottom: 0;
    }
</style>
<script>
//    import bd_goods_1 from '../../module/index/feed/bd_goods_1.vue'
    import layout from "../../module/layout/api.es6"
    import category from "../../src/component/com-maybeyoulike.vue";
    export default{
        el:"#overtime",
        data(){
            return{
                msg:'hello vue',
                in_app:false,
                goodsListConfig:{
                    dataUrl:window.goodsUrl,
                    noRefresh:true,
                    refer:"overtime"
                },
              no_more: false,
              beforeFirstLoading: false,
              ajaxing:true,
              errors:false,
              list:[],
            }
        },
        components:{
//            bd_goods_1:bd_goods_1
          category: category,
        },
        ready:function () {
            if(window.Units&&Units.isApp()){
                this.in_app = true;
                $(document.body).addClass("in_app");
            }
        },
        created() {
            this.getData();
        },
      methods: {
        getData: function () {
          const scope = this;
          if (!scope.no_more) {
            if (scope.ajaxing) {
              scope.beforeFirstLoading = true;
              scope.ajaxing = false;
              $.ajax({
                type : "POST",
                url : "/api/mg/sale/index/getPageSecond",
                data : layout.strSign('like'),
                dataType: 'json',
                success : function(data) {
                  if (data.data) {
                    localStorage.setItem('likeList', JSON.stringify(data))
                    sessionStorage.setItem('likeList', JSON.stringify(data))
                    scope.list = data.data.feedList[0].body.dataList,
                      scope.beforeFirstLoading = false,
                      scope.no_more = true
                  } else {
                    scope.list = JSON.parse(localStorage.getItem('likeList')).data.feedList[0].body.dataList,
                      scope.beforeFirstLoading = false,
                      scope.no_more = true
                  }
                  scope.ajaxing = true,
                    scope.errors = false
                },
                error: function (e) {
                  scope.errors = true
                  scope.ajaxing = false
                  scope.beforeFirstLoading = false
                  setTimeout(function () {
                    scope.ajaxing = true;
                  },1000)
                }
              })
            }
          }
        }
      }
    }
</script>
