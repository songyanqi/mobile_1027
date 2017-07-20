<template>
    <div class="idcard_edit">
        <div class="edit_con">
            <div class="infoEnter">收件人:<input style="width:80%;"  placeholder="收件人姓名(需与身份证姓名保持一致)" v-model="addressee"></div>
            <div class="infoEnter">身份证号码:<input style="width:70%;" placeholder="请输入身份证号码" v-model="idcardNumber" maxlength="18"></div>
            <div class="idcardImg_add">
                <div class="title">身份证照片</div>
                <div class="prompt">
                    <p>1. 请原比例上传身份证照片</p>
                    <p>2. 请确保身份证姓名、身份证号码未被遮挡，能够清晰辨认</p>
                    <p>3. 如无法正常添加照片，请更新最新版APP或使用微信打开。</p>
                </div>
                <div class="upload_container box">
                    <div class="pic_upload item" >
                        <img :src="cardHead+(uploadcardHead==1?'@200h_304w_1e_1c_2o':'')" alt="身份证正面">
                        <span class="paper_text">身份证正面</span>
                        <input type="file" @change="onFileChange($event,'cardHead')" class="upload_input" accept="image/*">
                    </div>
                    <div class="pic_upload item ml10">
                        <img :src="cardTail+(uploadcardTail==1?'@200h_304w_1e_1c_2o':'')" alt="身份证反面">
                        <span class="paper_text">身份证反面</span>
                        <input type="file" @change="onFileChange($event,'cardTail')" class="upload_input" accept="image/*">
                    </div>
                </div>
            </div>
        </div>
        <div class="idcard_edit_prompt">根据海关规定，购买跨境商品需要提供身份信息，大V店保证您的信息仅用于商品清关，不做其他用途使用。</div>
        <div class="submit_btn" @click="submit">确认提交</div>
    </div>
</template>

<style>
    .idcard_edit .edit_con{
        background: #fff;
    }
    .idcard_edit .edit_con .infoEnter{
        color: #666;
        position: relative;
        padding: 12px 10px;
    }
    .idcard_edit .edit_con .infoEnter input{
        font-size: 14px;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-left: 10px;
        line-height: 20px;
    }
    .idcard_edit .edit_con .infoEnter:after{
        content: '';
        position: absolute;
        left: 0;
        background: #E1E1E1;
        width: 100%;
        height: 1px;
        bottom: 0;
    }
    .idcard_edit .edit_con .idcardImg_add{
        padding: 12px 10px 10px;
    }
    .idcard_edit .edit_con .idcardImg_add .title{
        font-size:14px;
        color: #666;
        padding-bottom: 12px;
    }
    .idcard_edit .edit_con .idcardImg_add .prompt{
        background: #FFEFF4;
        border-radius: 3px;
        color: #FF4A7D;
        padding: 10px;
        font-size: 12px;
        position: relative;
        margin-bottom: 10px;
    }
    .idcard_edit .edit_con .idcardImg_add .prompt:after{
        content: "";
        position: absolute;
        left: 18px;
        top: -5px;
        border-bottom: 5px solid #FFEFF4;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: transparent;
        width: 0;
        height: 0;
    }
    .idcard_edit_prompt{
        font-size: 12px;
        color: #666;
        padding: 10px 10px 40px;
    }
    .pic_upload {
        background-color: #F7F7F7;
        padding: 10px;
        text-align: center;
        position: relative;
    }
    .pic_upload:before{
        content: '';
        position: absolute;
        top: -1px;
        left: 0;
        border: 1px solid #ddd;
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .pic_upload .upload_input {
        position: absolute;
        left: 10px;
        right: 10px;
        top: 10px;
        bottom: 40px;
        width: 100%;
    }
    .upload_input{
        opacity: 0;
    }
    .pic_upload img {
        margin-bottom: 10px;
        position: relative;
    }
    .upload_container .close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        background-size: 100%;
        background-image: url(//pic.davdian.com/free/close_btn_0829.png);
    }
    /*Retina屏为2的时候调用下面的样式*/
    @media
    only screen and (-webkit-min-device-pixel-ratio:2),
    only screen and (min-device-pixel-ratio:2),
    only screen and (min--moz-device-pixel-ratio:2),
    only screen and (-o-min-device-pixel-ratio:4/2),
    only screen and (min-resolution:2dppx)
    {
        .idcard_edit .edit_con .infoEnter:after{
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
        }
        .pic_upload:before{
            top: 0;
            width: 200%;
            height: 200%;
            transform: scale(0.5);
            transform-origin: left top;

            -ms-transform: scale(0.5); 		/* IE 9 */
            -ms-transform-origin: left top; 		/* IE 9 */

            -webkit-transform: scale(0.5);	/* Safari 和 Chrome */
            -webkit-transform-origin: left top;	/* Safari 和 Chrome */

            -moz-transform: scale(0.5);		/* Firefox */
            -moz-transform-origin: left top;		/* Firefox */

            -o-transform: scale(0.5);		/* Opera */
            -o-transform-origin: left top;		/* Opera */
        }
    }


    .submit_btn{
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
                addressee:'',
                idcardNumber:'',
                cardHead:'//pic.davdian.com/free/2017/02/24/304_200_ae8ece835b2cc45c268cd26afcac7612.jpg',
                cardTail:'//pic.davdian.com/free/2017/02/24/304_200_18de8666e1fd08c8b04d7a8717974074.jpg',
                uploadcardHead:0,
                uploadcardTail:0,
            }
        },

        created(){

        },
        watch:{
            idcardNumber:function (newVal, oldVal) {
                this.idcardNumber= newVal.replace(/[^(\d|x|X)]/g,"");
            }
        },
        computed:{
            "all":function () {
                return (this.addressee.length)&&(this.idcardNumber.length)&&(this.uploadcardHead==1)&&(this.uploadcardTail==1)
            }

        },
        methods:{

           onFileChange(e,name){
               var that=this;
               var files = e.target.files;
               if(files.length){
                   //上传图片进度条
                   that[name]="//pic.davdian.com/free/2017/03/01/304_200_5ed94acf11f8a6fb57e1138bea19dccd.gif";
                   var picStr = 'shop_logo';
                   var file = files[0];
                   var data = new FormData();
                   data.append(picStr, file);
                   $.ajax({
                       type: "POST",
                       url: picUploadUrl,
                       data: data,
                       cache: false,
                       timeout:20000,
                       contentType: false,    //不可缺
                       processData: false,    //不可缺
                       dataType: "json",
                       success: function (data) {
                           if (data.errorCode) {
                               bravetime.info(data['errorMsg']);
                           } else {
                               that[name] = data.data[picStr].src;
                               if (name == "cardHead") {
                                   that.uploadcardHead = 1;
                               }
                               if (name == "cardTail") {
                                   that.uploadcardTail = 1;
                               }
                           }
                       },
                       error: function (e,e1) {
                           if(e1=="timeout"){
                               bravetime.info("图片过大,请选则较小的照片或者切换到较好的网络环境后重试");
                           }else{
                               bravetime.info("上传失败，请检查网络后重试("+e1+")");
                           }

                       }
                   });
               }
             },
            submit(){
                let that = this;
                if(!that.all){
                    bravetime.info("请完善您的证件信息");
                    return false;
                }
                bravetime.addLoader({little: true});
                $.ajax({
                    url:window.idCardUrl,
                    data:{
                        fullName:that.addressee,
                        idcard:that.idcardNumber
                    },
                    dataType:"json",
                    success: function (result) {
                        bravetime.removeLoader();
                        if (result.code==0) {
                            if(result.idcard==0){
                                 bravetime.addLoader({little: true});
                                        common.getDataWithSign({
                                            url: idCardAddUrl,
                                            type: 'POST',
                                            dataType: 'json',
                                            updata: {
                                                cardName:that.addressee,
                                                cardId:that.idcardNumber,
                                                cardHead:that.cardHead,
                                                cardTail:that.cardTail
                                            },
                                            success: function (result) {
                                                bravetime.removeLoader();
                                                if(result.code){
                                                    bravetime.info(result.data.msg);
                                                }
                                                else {
                                                    var idcard_id=result.data.id.id;
                                                    var href=location.search;
                                                    var fromcheckout='?fromPage=checkout';
                                                    var order_detail='?fromPage=order_detail';
                                                    var user_center='?fromPage=user_center';
                                                    if(href==user_center||href=='?fromPage='){
                                                        sessionStorage.setItem('user_cookie', 'user_center_idcard');
                                                        history.go(-1)
                                                    }
                                                    else if(href==fromcheckout||href==order_detail){
                                                        //获取订单确认页传过来的收货人
                                                        var Addressee=sessionStorage.getItem("Addressee");
                                                        bravetime.addLoader({little: true});
                                                        common.getDataWithSign({
                                                            url: idcardCheckoutUrl,
                                                            type: "POST",
                                                            dataType: 'json',
                                                            updata: {
                                                                id: idcard_id,
                                                                cardName:Addressee
                                                            },
                                                            success: function (result) {
                                                                bravetime.removeLoader();
                                                                //设置cookie,返回的页面如果有这个cookie则刷新页面
                                                                sessionStorage.setItem('checkout_cookie', 'checkout_idcard');
                                                                if(result.code){
                                                                    window.bravetime.newAlert(result.data.msg, {
                                                                        okLink: function () {
                                                                            history.go(-2);
                                                                        }
                                                                    })
                                                                }
                                                                 else {
                                                                    history.go(-2)
                                                                }
                                                            },
                                                            error: function () {
                                                                bravetime.removeLoader();
                                                                bravetime.info("网络异常，请稍后重试");
                                                            }
                                                        });

                                                    }
                                                }
                                            },
                                            error: function () {
                                                bravetime.removeLoader();
                                                bravetime.info("网络异常，请稍后重试");
                                            }
                                        });
                            }
                            else if(result.idcard==1){
                                bravetime.info(result.msg);
                            }
                        } else {
                            bravetime.info(result.msg);
                        }
                    }, error: function () {
                        bravetime.removeLoader();
                        bravetime.info("网络异常,数据获取失败");
                    }
                });
            },
        }
    }
</script>
