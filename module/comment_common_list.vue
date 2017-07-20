<template>
    <div>
        <div class="order_list_item">
            <ul class="be_evaluated_list">
                <li v-for = 'item in list' :data-goods_id="item.goods_id">
                    <a :href='"/"+item.goods_id+".html"' class="goods_pic">
                        <img :src = 'item.img'>
                    </a>
                    <div class="goods_con">
                        <a  :href='"/"+item.goods_id+".html"'  class="goods_title">{{ item.goods_name }}</a>
                        <a  v-if = "item.comment_details && item.comment_details.length" :href="item.comment_details" :class="item.can_comment==0 ? 'view_evaluate_btn1' : 'view_evaluate_btn'">查看评价</a>
                        <a  v-show = "item.can_comment==1" :data-href="item.comment_link" @click="evaluate" class="evaluate_btn pull-right">评价</a>
                        <a  v-show = "item.can_comment==2" :data-href="item.comment_link" @click="evaluate" class="evaluate_btn pull-right">追加评价</a>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show = 'loading' class="refresh">
            <div class="uil-default-css-normal" style="-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;"><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;"></div></div>
            <div>数据加载中...</div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return{
                list:[],
                loading:false,
            }
        },
        created(){
            //评价之后返回来刷新页面
            if(sessionStorage.getItem('orderEvaluateRefresh')){
                sessionStorage.removeItem('orderEvaluateRefresh');
                setTimeout(function () {
                    location.reload();
                },200);
                return false
            }
            this.getData();
        },
        methods:{
            getData:function(){
                var scope = this;
                scope.loading = true;//显示加载动画
                if($("#orderArriveList").length){
                    var dataurl=window.orderArriveListUrl
                }
                if($("#commentList").length){
                    var dataurl=window.commentListUrl
                }
                $.ajax({
                    url:dataurl,
                    type:"POST",
                    dataType: "json",
                    data:{},
                    success:function(result){
                        scope.loading = false;
                        if (result["error"]) {
                            bravetime.info(result["msg"]);
                        }
                        else{
                            scope.list = scope.list.concat(result.data);
                        }
                    },error:function(){
                        scope.loading = false;
                        bravetime.info("网络异常，请稍后重试");
                    }
                });
            },
            evaluate:function(event){
                var href = event.target.dataset.href;
                if(window.Units && Units.isApp()){
                    window.evaCallback = function () {
                        setTimeout(function () {
                            location.reload();
                        },300);
                    };
                }
                else {
                    sessionStorage.setItem('orderEvaluateRefresh',"Refresh");
                }
                bravetime.openNewPage({type:1,url:href,jsMethod:'evaCallback()'});
                //禁止默认行为
                event.preventDefault();
                return false;
            },
        }
    }
</script>
