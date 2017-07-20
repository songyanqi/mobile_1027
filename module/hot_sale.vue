<template>
    <div class="paysuccess_recommend">
        <div class="paysuccess_recommend_title">
            <div class="text">热销商品推荐</div>
        </div>
    </div>
    <category></category>
</template>

<script>
    var category = require("../module/category.vue");
    export default{
        components:{
            category:category
        },
        data:function(){
            return{
                list:[],
                ajaxing:true,
            }
        },
        ready:function () {
            this.getData();
        },
        methods:{
            getData:function(){
                var scope = this;
                if(scope.ajaxing){
                    scope.ajaxing = false;
                    //请求数据
                    $.ajax({
                        url:goodsUrl,
                        dataType:"json",
                        success: function (result) {
                            scope.ajaxing = true;
                            scope.list = result.data;
                        },error:function () {
                            bravetime.ajaxError();
                            scope.ajaxing = true;
                        }
                    })

                }
            },
            change:function(){
                this.$broadcast('changeData',this.list);
            },
        },
        watch:{
            "list":"change"
        }
    }
</script>