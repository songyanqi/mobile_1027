$(function () {
    var upload_container = $(".upload_container");
    // 预览
    var preview = $(".publish_pic_view");

    var commitBtn = $(".teacher_day_btn");
    // 取消
    preview.find(".back").click(function () {
       preview.addClass("hide");
    });

    $(".paper_img_already").find("img").click(function () {
        imgClick({target:this});
    });

    upload_container.on("click",".close",function () {
        var $this = $(this);
        var id = +$this.parents(".pic_upload").attr("data-index-cc");
        var con = $this.parents(".pic_upload").removeClass("paper_img_already");
        con.find("img").attr("src","//pic.davdian.com/free/"+['','teacher_paper','id_card_paper'][id]+".png");
        con.find(".close").remove();
        con.find(".upload_input").removeClass("hide");
        con.find("input").val(null);
    });

    if(!window.isLogin){
        upload_container.find(".upload_input").addClass("hide");
        upload_container.find(".pic_upload").click(function () {
            bravetime.newConfirm("请登录,谢谢",{
                okText:"去登陆",
                cancelText:"确定",
                okLink:window.loginUrl
            });
        });
    }else  if(!window.isSeller){
        upload_container.find(".upload_input").addClass("hide");
        upload_container.find(".pic_upload").click(function () {
            bravetime.newConfirm("您还不是卖家",{
                okText:"去开店",
                cancelText:"确定",
                okLink:'/348.html'
            });
        });
    }

    commitBtn.click(function () {
        if(commitBtn.hasClass("disable")){
            return false;
        }
        // 查看图片
        var  images = $(".paper_img_already img");
        if(images.length<2){
            bravetime.newAlert("先传个图片");
            return false;
        }else{
            $.ajax({
                url:postUrl,
                type:"post",
                data:{
                    t:images[0].dataset.showSrc,
                    s:images[1].dataset.showSrc
                },
                dataType:"json",
                success:function (result) {
                    if(result.code){
                        bravetime.newAlert(result.msg);
                    }else{
                        bravetime.newAlert("提交成功");
                        toggleCommitButton(false);
                        $(".ty").addClass("hide");
                        $(".ty1").removeClass("hide");
                    }
                },
                error:function () {

                }
            })
        }
    });

    /**
     * 切换提交按钮
     */
    function toggleCommitButton(flag) {
        if(flag){

        }else{
            commitBtn.addClass("disable").html("审核中");
        }
    }

   // 点击时候
    upload_container.find(".upload_input").change(function () {
        var $this = $(this);
        if(!isLogin){
            return false;
        }
        if(!isSeller){
            bravetime.newConfirm("您还不是卖家",{
                okText:"去开店",
                cancelText:"确定",
                okLink:'/348.html'
            });
            $this.parent().find("input").val(null);
            return false;
        }

        if(this.files.length){
            var picStr = 'shop_logo';
            var file = this.files[0];
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
                        var del_btn = $("<div class='close'></div>");
                        $this.parent()
                            .addClass("paper_img_already")
                            .find("img")
                            .attr("src", data.data[picStr].src+"@200h_304w_1e_1c_2o")
                            .attr("data-show-src", data.data[picStr].src)
                            .click(imgClick)
                            .parent().find("input")
                            .addClass("hide")
                            .parent().append(del_btn);
                    }
                },
                error: function (e,e1) {
                    if(e1=="timeout"){
                        bravetime.info("图片过大,请选则较小的照片或者切换到较好的网络环境后重试");
                    }else{
                        bravetime.info("上传失败，请检查网络后重试");
                    }

                }
            });
        }
    });


    function imgClick(event){
        preview.removeClass("hide").find("img").attr("src",event.target.dataset.showSrc);
    }
});