<template>
    <div>
        <div v-if="uploadPic">
            <div class="add_pic_con clearfix">
                <ul>
                    <li v-if="index<9" v-for="(img,index) in piclist" class="addpic">
                        <img @click="imgClick( $event,index)" :src="img+(img!=loadimgurl?'@226h_226w_1e_1c_2o':'')"
                             :data-show-src="(img!=loadimgurl?img:'')">
                    </li>
                    <li v-if="piclist.length<9" class="add">
                        <img src="//pic.davdian.com/free/2017/03/04/226_226_39a845ac50733d086a5d56b4629d8315.png">
                        <input type="file" @change="uploadpic($event)" class="add_pic_input" accept="image/*"
                               multiple="multiple">
                    </li>
                </ul>
            </div>
            <div class="sample">
                <h2 class="title">示例 <span class="dav-color9">(请按以下图片形式上传，至少5张，做多9张,如无法正常添加照片，请更新最新版APP或使用微信打开。)</span></h2>
                <img src="//pic.davdian.com/free/2017/03/06/710_476_5ab16a0ff48e0aaca184414f2e9d1587.png">
            </div>
            <div class="activity_bottom">
                <div class="Submit_btn" @click="Submit_pic">确定</div>
            </div>
        </div>
        <div v-if="pic_view" class="publish_pic_view">
            <div class="publish_pic_preview">
                <div class="swiper-wrapper">
                </div>
            </div>
            <div class="publish_pic_preview_bottom">
                <span class="back"><i class="back_arrow"></i>返回</span>
                <span class="num"></span>
                <span class="delete_btn"></span>
            </div>
        </div>
        <div v-if="uploadPicSuccess" class="uploadPicSuccess">
             <div class="con">
                 <p><img src="//pic.davdian.com/free/2017/03/06/100_100_131a31ec73db757676a04c2020a740a6.png"></p>
                 <p class="successText">上传成功~</p>
                 <p>春风十里不如你，又一位活动达人诞生了！</p>
             </div>
            <div class="reminder">
                <div class="title">温馨提示：</div>
                <p>1.恭喜，您已完美完成本次“我的节日我做主，大V店3.8全国踏春行”活动。</p>
                <p>2.我们的工作人员将在五个工作日内审核并主动与您联系，向您发放大V活动基金。</p>
                <p>3.如有疑问，请添加微信号（mamajiayouzhan2）在线咨询。</p>
                <p>4.更多大V活动即将袭来，敬请关注大V店订阅号及微刊公告。</p>
            </div>
        </div>
    </div>
</template>
<style>
    body {
        background: #fff;
    }

    .add_pic_con {
        padding: 10px 6px;
    }

    .add_pic_con li {
        width: 33.3%;
        float: left;
        padding-right: 4px;
        padding-left: 4px;
        box-sizing: border-box;
        margin-bottom: 8px;
        position: relative;
    }

    .add_pic_input {
        position: absolute;
        top: 0;
        left: 4px;
        z-index: 2;
        width: 93%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .sample {
        padding: 20px 10px 10px;
    }

    .sample .title {
        font-size: 12px;
    }

    .activity_bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #FAF8F9;
        height: 49px;
        max-width: 640px;
        z-index: 8;
    }

    .activity_bottom:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        background: #e3dfd8;
        width: 100%;
        height: 1px;
    }

    .activity_bottom .Submit_btn {
        width: 150px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: #FF4A7D;
        margin: 9px auto 0;
        border-radius: 2px;
    }

    /*Retina屏为2的时候调用下面的样式*/
    @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 4/2), only screen and (min-resolution: 2dppx) {
        .activity_bottom:after {
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
        }
    }

    .publish_pic_view {
        position: fixed;
        background: #000;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    }

    @media screen and (min-width: 640px) {
        .publish_pic_view {
            left: 50%;
            margin-left: -320px;
            max-width: 640px;
        }
    }

    .publish_pic_preview {
        height: 100%;
        z-index: 1;
        overflow: hidden;
    }

    .publish_pic_preview .swiper-slide {
        height: 100%;
        flex-shrink: 0;
    }

    .publish_pic_preview img {
        width: 100%;
        left: 0;
        bottom: 0;
        position: absolute;
        top: 0;
        margin: auto auto;
    }

    .publish_pic_preview_bottom {
        background-color: rgba(0, 0, 0, .4);
        position: absolute;
        bottom: 0;
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        z-index: 3;

    }

    .publish_pic_preview_bottom .back {
        padding: 0 33px;
        position: absolute;
        left: 0;
    }

    .back_arrow {
        display: inline-block;
        vertical-align: 0;
        width: 14px;
        height: 14px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        position: absolute;
        top: 15px;
        left: 17px;
    }

    .publish_pic_preview_bottom .num {
        text-align: center
    }

    .publish_pic_preview_bottom .delete_btn {
        position: absolute;
        right: 0;
        padding: 11px;
        background: url(//pic.davdian.com/free/comment_delete_icon.png) no-repeat center;
        width: 22px;
        height: 22px;
        background-size: 22px;
        top: 0;
    }
    .uploadPicSuccess{
        padding: 40px 10px 10px;
    }
    .uploadPicSuccess .con{
        text-align: center;
    }
    .uploadPicSuccess .con img{
        width: 53px;
        margin-bottom: 15px;
    }
    .uploadPicSuccess .con .successText{
        font-size: 18px;
        color:#FF4A7D;
        padding-bottom: 10px;
    }
    .reminder{
        background: #F8F8F8;
        padding: 10px;
        line-height: 21px;
        font-size: 12px;
        color: #999;
        margin-top: 60px;
    }
    .reminder .title{
        padding-bottom: 4px;
        font-size: 14px;
        color: #333;
    }
</style>
<script>
    export default{
        data(){
            return {
                uploadPic:true,
                uploadPicSuccess:false,
                piclist: [],
                loadimgurl: "//pic.davdian.com/free/2017/03/06/226_226_d7f04ca4fc15f3f1bdb56a465cbbe906.gif",
                pic_view: false,
            }
        },
        watch:{
            'piclist':function(val){
                if(val.length>9){
                    this.piclist.splice(9);
                }
            }
        },
        methods: {
            uploadpic(e, index){
                index = index || 0;
                var that = this;
                var files = e.target.files;
                if (files.length && files[index]) {
                    that.piclist.push(that.loadimgurl);
                    var picStr = 'shop_logo';
                    var file = files[index];
                    var data = new FormData();
                    data.append(picStr, file);
                    $.ajax({
                        type: "POST",
                        url: picUploadUrl,
                        data: data,
                        cache: false,
                        timeout: 20000,
                        contentType: false,    //不可缺
                        processData: false,    //不可缺
                        dataType: "json",
                        success: function (data) {
                            if (data.errorCode) {
                                bravetime.info(data['errorMsg']);
                            } else {
                                Vue.set(that.piclist, that.piclist.length - 1, data.data[picStr].src);
                                that.uploadpic(e, index + 1);
                            }
                        },
                        error: function (e, e1) {
                            if (e1 == "timeout") {
                                bravetime.info("图片过大,请选则较小的照片或者切换到较好的网络环境后重试");
                            } else {
                                bravetime.info("上传失败，请检查网络后重试");
                            }

                        }
                    });
                }
            },
            imgClick: function (event, imgIndex) {
                var index = imgIndex || 0, that = this;
                /*如果第一张图片还未加载成功,不能预览*/
                var firstPic=$(event.target).attr("data-show-src");
                if(index==0&&firstPic==''){
                    return false
                }
                else {
                    that.pic_view = true;
                }
                this.$nextTick(function () {
                    var bottomContainer = $(".publish_pic_preview_bottom");
                    var previewContainer = $(".publish_pic_view");
                    var lis = $(event.target).parents("ul").find("li.addpic");
                    var mySwiper = new Swiper('.publish_pic_preview', {
                        observer: true,
                        onTransitionEnd: function (swiper) {
                            bottomContainer.find(".num").html(swiper.activeIndex + 1 + "/" + $(".swiper-slide").length);
                        }
                    });

                    previewContainer.find(".swiper-wrapper").empty();

                    lis.each(function (i, el) {
                        if (el == that) {
                            index = i;
                        }
                        var src = $(el).find("img").attr("data-show-src");

                        var item = $('<div class="swiper-slide"><img src="' + src + '"></div>');
                        if(src!=''){
                            previewContainer.find(".swiper-wrapper").append(item);
                        }
                    });
                    mySwiper.slideTo(index);

                    bottomContainer.find(".num").html(mySwiper.activeIndex + 1 + "/" + $(".swiper-slide").length);

                    bottomContainer.find(".back").click(function () {
                        that.pic_view = false;
                    });
                    // 删除
                    bottomContainer.find(".delete_btn").click(function () {
                        var acIndex = mySwiper.activeIndex;
                        // 删除预览图片
                        that.piclist.splice(acIndex, 1);
                        // 删除大图
                        $(previewContainer.find(".swiper-slide").get(acIndex)).remove();
                        bottomContainer.find(".num").html(Math.min($(".swiper-slide").length, acIndex + 1) + "/" + $(".swiper-slide").length);
                        if ($(".swiper-slide").length==0) {
                            that.pic_view = false;
                        }
                    });
                });
            },
            Submit_pic(){
                var that = this;
                if(that.piclist.length<5){
                    bravetime.info("图片至少要上传5张哦~");
                    return false
                }
                $.ajax({
                    type: "POST",
                    url: activityPicUrl,
                    dataType: "json",
                    data:{
                        activityId:window.activityId,
                        piclist:that.piclist
                    },
                    success: function (result) {
                        if (result.code) {
                            bravetime.info(result.msg);
                        }
                        else {
                            that.uploadPic=false;
                            that.uploadPicSuccess=true;
                            sessionStorage.setItem("uploadPicSuccess","Success");
                        }
                    },
                    error: function () {
                        bravetime.info("网络异常,请刷新重试");
                    }
                });
            }
        }
    }

</script>
