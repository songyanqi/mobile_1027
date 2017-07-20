<template>
    <div>
        <div class="idcardList" v-if="list.length">
            <ul>
                <li v-for="(item, index) in list">
                    <div @click="checkout(index,item.id)">
                        <div class="name">{{item.cardName}}</div>
                        <div class="idcardNumber">身份证号：{{item.cardId}}</div>
                        <div class="idcardImg clearfix">
                            <span><img :src="item.cardHead"></span>
                            <span><img :src="item.cardTail"></span>
                        </div>
                    </div>
                    <div class="delete clearfix">
                        <span @click="deleteCard(index,item.id)" class="delete_btn"><i
                                class="delete_icon"></i>删除</span>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="!list.length && requestSuccess==true" class="idcard_none">
            <div class="img"><img
                    src="//pic.davdian.com/free/2017/02/22/236_194_60d8471d13f3d8f76a67188f53ff8787.png">
            </div>
            <div class="prompt">您还没有完善证件信息，快去添加吧</div>
            <a :href="idcardAddUrl+'?fromPage='+fromPage"><div class="idcard_btn">添加证件信息</div></a>
        </div>
    </div>
</template>

<style>
.idcardList li{
    margin-top: 10px;
    padding: 10px;
    background: #fff;
}
.idcardList li .name{
    font-size: 14px;
}
.idcardList li .idcardNumber{
    margin-top: 10px;
    color: #666;
    font-size: 14px;
}
.idcardList li .idcardImg{
    margin-top: 10px;
}
.idcardList li .idcardImg span{
    float:left;
    width:100px;
    margin-right: 10px;
}
.idcardList li .delete{
    position: relative;
    margin-top: 10px;
    height: 17px;
    text-align: right;
    padding-top:13px;
    padding-bottom: 3px;
}
.idcardList li .delete .delete_btn{
    font-size: 12px;
    vertical-align: top;
    color: #666;
}
.idcardList li .delete .delete_btn .delete_icon{
    width:16px;
    height: 18px;
    background: url("//pic.davdian.com/free/2017/02/22/32_36_e47057e83a51dfc652ffa9fb2d63a1dd.png") no-repeat;
    background-size: 16px;
    display: inline-block;
    margin-right: 5px;
}
.idcardList li .delete:after{
    content: '';
    position: absolute;
    left: 0;
    background: #E1E1E1;
    width: 100%;
    height: 1px;
    top:0;
}
/*Retina屏为2的时候调用下面的样式*/
@media
only screen and (-webkit-min-device-pixel-ratio:2),
only screen and (min-device-pixel-ratio:2),
only screen and (min--moz-device-pixel-ratio:2),
only screen and (-o-min-device-pixel-ratio:4/2),
only screen and (min-resolution:2dppx)
{
    .idcardList li .delete:after{
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
}

.idcard_none{
    padding-top: 50px;
    text-align: center;
}
.idcard_none .img{
    width: 118px;
    margin: 0 auto;
}
.idcard_none .prompt{
    font-size: 14px;
    margin: 30px 0 50px;
}
.idcard_btn{
    width: 275px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #FF4A7D;
    border-radius: 2.5px;
    margin: 0 auto;
}
</style>

<script>
    import common from "./common/common.es6";
    export default{
        data(){
            return{
                list:[],
                fromPage:window.fromPage,
                requestSuccess:false,
                idcardAddUrl:window.idcardAddUrl,
                Addressee:'',
            }
        },
        created(){
            if(window.Units && Units.isApp()){
                var that=this;
                setTimeout(function () {
                    that.appdata();
                },200)
            }
            else {
                this.getData();
            }
        },
        methods:{
            appdata:function () {
                var that=this;
                var callback=function (result) {
                    if(+result.code){
                        that.checkout(0,result.id)
                    }
                    else{
                        history.go(-1)
                    }
                };
                var mincallback=function () {
                    that.getData();
                };
                window.bravetime.selectIdentity(callback,mincallback);
            },
           getData:function(){
               //如果有这个cookie就不请求数据
               if(window.idcardreload == 'user_center_idcard') {
                   return false;
               };
               var scope = this;
               if(scope.fromPage=="user_center"){
                   scope.Addressee=""
               }else{
                   //获取订单确认页传过来的收货人,根据收货人显示他的证件信息
                   scope.Addressee=sessionStorage.getItem("Addressee");
               }
               common.getDataWithSign({
                   url:window.idcardListUrl,
                   type:"POST",
                   dataType: "json",
                   updata:{
                       cardName:scope.Addressee||""
                   },
                   success:function(result){
                       scope.requestSuccess=true;
                       if (result.data) {
                           scope.list = scope.list.concat(result.data.dataList);
                       }
                   },error:function(){
                       bravetime.info("网络异常，请稍后重试");
                   }
               });
           },
            deleteCard:function(index,idcard_id){
                var that=this;
                window.bravetime.newConfirm("海关要求购买跨境商品需提供订购人实名信息，若删除证件信息，下单时需要重新认证，确认删除吗？", {
                    okLink: function () {
                        bravetime.addLoader({little: true});
                        common.getDataWithSign({
                            url: idcardDeleteUrl,
                            type: "POST",
                            dataType: 'json',
                            updata: {
                                id: idcard_id
                            },
                            success: function () {
                                bravetime.removeLoader();
                                sessionStorage.setItem("idcard","idcardcheck");
                                that.list.splice(index, 1);
                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.info("网络异常，请稍后重试");
                            }
                        });
                    }
                });
            },
            checkout:function(index,idcard_id){
                var that=this;
                that.Addressee=sessionStorage.getItem("Addressee");
                if(that.fromPage=="checkout"||that.fromPage=="order_detail"){
                    bravetime.addLoader({little: true});
                    common.getDataWithSign({
                        url: idcardCheckoutUrl,
                        type: "POST",
                        dataType: 'json',
                        updata: {
                            id: idcard_id,
                            cardName:that.Addressee
                        },
                        success: function (result) {
                            bravetime.removeLoader();
                            if(result.code){
                                bravetime.info(result.data.msg);
                            }
                            else {
                                //选择证件信息成功后去掉收货人姓名
                                sessionStorage.removeItem("Addressee");
                                //记录被选中,在订单确认页获取,如果有就刷新订单确认页面
                                sessionStorage.setItem("idcard","idcardcheck");
                                history.go(-1);
                            }
                        },
                        error: function () {
                            bravetime.removeLoader();
                            bravetime.info("网络异常，请稍后重试");
                        }
                    });
                }
            }
        }
    }
</script>
