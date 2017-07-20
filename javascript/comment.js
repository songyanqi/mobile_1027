$(function () {
    // var mySwiper = new Swiper('.publish_pic_preview', {
    //     autoplay: 5000,//可选选项，自动滑动
    // })

    star();
    any();
    commentInput();
    commitHandle();


    var goods_id=$("#goods_id").val();
    //获取本地存储发表评价页面编辑数据
    var goods_draft=JSON.parse(localStorage.getItem('draft_'+goods_id));
    if(goods_draft){
        var starlist=[[".goods_star","goodsStar"],[".supplier_goods_star","supplierStar"],[".customer_star","customerStar"]];

        for(var k=0;k<starlist.length; k++){
            var starlistClass=$(starlist[k][0]);
            var starnumber=goods_draft[starlist[k][1]];
            starlistClass.attr("data-val",starnumber);
            starlistClass.find("li").each(function (i) {
                if(i<starnumber){
                    var flag=true;
                }
                else {
                    var flag=false;
                }
                $(this).toggleClass("hover", flag);
            });
        }

        var comment = goods_draft.comment;
        $(".publish_comment_textarea").val(comment);
        var length = $(".publish_comment_textarea").val().length;
        $(".publish_comment_textarea_num").html(500 - length);


        var anonymous=goods_draft.anonymous;
       $(".anonymous_comment_icon").toggleClass("checked",!!anonymous);

        var pic=goods_draft.pic.split(",");

        if(pic!=""){
            console.log(pic.length);
            var addPicContainer = $(".add_comment_con");
            var addLi = addPicContainer.find(".add");
            var addInfo = $(".add_pic_illustrate");

            addInfo.addClass("hide");
            for(var i=0 ; i<pic.length ; i++){
                addLi.before($('<li class="img"><div class="img_con"><img src = '+ pic[i] +"@160h_160w_1e_1c_2o"+' data-show-src='+pic[i]+'><span class="closeBtn"></span></div></li>'));
            }
            if(pic.length>=9){
                addLi.addClass("hide");
            }
        }
    }
    //获取本地存储追加评价页面编辑数据
    var goods_draft_again=JSON.parse(localStorage.getItem('draft_again_'+goods_id));
    if(goods_draft_again){
        var comment = goods_draft_again.comment;
        $(".publish_comment_textarea").val(comment);
        var length = $(".publish_comment_textarea").val().length;
        $(".publish_comment_textarea_num").html(500 - length);

        var pic=goods_draft_again.pic.split(",");

        if(pic!=""){
            var addPicContainer = $(".add_comment_con");
            var addLi = addPicContainer.find(".add");
            for(var i=0 ; i<pic.length ; i++){
                addLi.before($('<li class="img"><div class="img_con"><img src = '+ pic[i] +"@160h_160w_1e_1c_2o"+' data-show-src='+pic[i]+'><span class="closeBtn"></span></div></li>'));
            }
            if(pic.length>=9){
                addLi.addClass("hide");
            }
        }
    }

    picHandle();

    //实时存储发表评价页面编辑数据
    function historyData() {
        var historyData = {};
        historyData.goodsStar = $(".goods_star").attr("data-val");
        historyData.supplierStar = $(".supplier_goods_star").attr("data-val");
        historyData.customerStar = $(".customer_star").attr("data-val");
        historyData.comment = $(".publish_comment_textarea").val();
        historyData.goods_id = $("#goods_id").val();
        historyData.delivery_id = $("#delivery_id").val();
        historyData.anonymous = +$(".anonymous_comment_icon").hasClass("checked");
        historyData.pic = $.makeArray($(".add_comment_con").find("li.img img")).map(function (x) {
            return $(x).attr("data-show-src");
        }).join(",");
        historyData= JSON.stringify(historyData);
        localStorage.setItem('draft_'+goods_id, historyData);
    }

    //实时存储追加评价页面编辑数据
    function historyDataAgain() {
        var historyData = {};
        historyData.comment = $(".publish_comment_textarea").val();
        historyData.goods_id = $("#goods_id").val();
        historyData.delivery_id = $("#delivery_id").val();
        historyData.comment_id = $("#comment_id").val();
        historyData.pic = $.makeArray($(".add_comment_con").find("li.img img")).map(function (x) {
            return $(x).attr("data-show-src");
        }).join(",");
        historyData= JSON.stringify(historyData);
        localStorage.setItem('draft_again_'+goods_id, historyData);
    }



    /**
     * 提交处理
     */
    function commitHandle() {

        $(".publish_comment_btn").click(function(){
            window.publishComment()
        });

        window.publishComment=function () {
            if($(".publish_comment_again_page").length){
                var data = {};
                data.comment = $(".publish_comment_textarea").val();
                data.goods_id = $("#goods_id").val();
                data.delivery_id = $("#delivery_id").val();
                data.comment_id = $("#comment_id").val();
                if (data.comment.length < 10) {
                    bravetime.info("不可以少于10个字");
                    return false;
                }
                data.pic = $.makeArray($(".add_comment_con").find("li.img img")).map(function (x) {
                    return $(x).attr("data-show-src");
                }).join(",");
            }
            else {
                var data = {};
                data.goodsStar = $(".goods_star").attr("data-val");
                data.supplierStar = $(".supplier_goods_star").attr("data-val");
                data.customerStar = $(".customer_star").attr("data-val");
                data.comment = $(".publish_comment_textarea").val();
                data.goods_id = $("#goods_id").val();
                data.delivery_id = $("#delivery_id").val();
                data.anonymous = +$(".anonymous_comment_icon").hasClass("checked");
                if (data.comment.length < 10) {
                    bravetime.info("不可以少于10个字");
                    return false;
                }
                data.pic = $.makeArray($(".add_comment_con").find("li.img img")).map(function (x) {
                    return $(x).attr("data-show-src");
                }).join(",");
            }
            bravetime.addLoader({little: true});
            $.ajax({
                url: window.commentUrl,
                dataType: "json",
                data: data,
                success: function (result) {
                    if (result["code"]) {
                        bravetime.newAlert(result.msg);
                    } else {
                        if($(".publish_comment_page").length){
                            localStorage.removeItem('draft_'+goods_id);
                        }
                        else if($(".publish_comment_again_page").length){
                            localStorage.removeItem('draft_again_'+goods_id);
                        }
                        location.replace(result.url);
                    }
                    bravetime.removeLoader();
                },
                error: function () {
                    bravetime.newAlert("网络异常,请稍后重试");
                    bravetime.removeLoader();
                }
            });
        }

    }

    /**
     * 评星
     */
    function star() {
        $(".comment_title li").click(function () {
            var $li = $(this);
            var $ul = $li.parents("ul");
            var flag = true;
            $ul.find("li").each(function (i, el) {
                $(this).toggleClass("hover", flag);
                if (el == $li.get(0)) {
                    flag = false;
                    $ul.attr("data-val", i + 1);
                }
            });
            if($(".publish_comment_page").length){
                historyData();
            }
            else if($(".publish_comment_again_page").length){
                historyDataAgain();
            }
        });
    }

    /**
     * 匿名
     */
    function any() {
        $(".anonymous_comment_icon").click(function () {
            $(this).toggleClass("checked");
            if($(".publish_comment_page").length){
                historyData();
            }
        })
    }

    /**
     * 评论输入
     */
    function commentInput() {
        var container = $(".publish_comment_textarea");
        container.on("input", function () {
            var length = container.val().length;
            if (length > 500) {
                container.val(container.val().substring(0, 500))
            }
            length = container.val().length;
            $(".publish_comment_textarea_num").html(500 - length);
            if($(".publish_comment_page").length){
                historyData();
            }
            else if($(".publish_comment_again_page").length){
                historyDataAgain();
            }
        });
    }

    /**
     * 图片处理
     */
    function picHandle() {
        var addPicContainer = $(".add_comment_con");
        var addLi = addPicContainer.find(".add");
        var addInfo = $(".add_pic_illustrate");
        var previewContainer = $(".publish_pic_preview");
        var bottomContainer = $(".publish_pic_preview_bottom");
        var mySwiper;
        addPic();
        initSwiper();




        /**
         * 初始化滑动
         */
        function initSwiper() {
            mySwiper = new Swiper('.publish_pic_preview', {
                observer: true,
                onTransitionEnd: function (swiper) {
                    $(".publish_pic_preview_bottom").find(".num").html(swiper.activeIndex + 1 + "/" + addPicContainer.find("li.img").length);
                }
            });
        }


        /**
         * 添加图片
         */
        function addPic() {
            var addBtn = $("input.add_pic_input");
            addBtn.change(function () {
                var files = addBtn.get(0).files;
                if (files.length) {
                    for (var i = 0; i < files.length; i++) {
                        pullFile(files[i]);
                    }
                }
            });

            /**
             * 插入图片
             */
            function pullFile(file) {
                var picStr = 'shop_logo';
                if (addPicContainer.find("li").length > 8) {
                    addPicContainer.find(".add").addClass("hide");
                }
                if ($(".returnGoodsInfoButton").length) {
                    if (addPicContainer.find("li").length > 2) {
                        addPicContainer.find(".add").addClass("hide");
                    }
                }
                if ($(".returnGoodsInfoButton").length) {
                    if (addPicContainer.find("li").length > 3) {
                        bravetime.info("最多添加3张图片");
                        return false;
                    }
                }
                if (addPicContainer.find("li").length > 9) {
                    bravetime.info("最多添加9张图片");

                    return false;
                }
                var li = $("<li></li>").addClass("loading").html("<div class='img_con'><img src='http://img1.bravetime.net/free/ring.gif'></div>");
                var data = new FormData();
                data.append(picStr, file);
                addLi.before(li);
                if (addInfo.length){
                    addInfo.addClass("hide");
                }
                $.ajax({
                    type: "POST",
                    url: picUploadUrl,
                    data: data,
                    cache: false,
                    contentType: false,    //不可缺
                    processData: false,    //不可缺
                    dataType: "json",
                    success: function (data) {
                        if (data.errorCode) {
                            li.remove();
                            addPicContainer.find(".add").removeClass("hide");
                            bravetime.info(data['errorMsg']);
                        } else {
                            li.addClass("img").removeClass("loading")
                                .find("img")
                                .attr("src", data.data[picStr].src + "@160h_160w_1e_1c_2o")
                                .attr("data-show-src", data.data[picStr].src);
                            li.find("img").click(function () {
                                clickImg(li.get(0));
                            });
                            var $span = $("<span class='closeBtn'>");
                            li.find(".img_con").append($span);
                             //如果在发表评价页面，添加成功后存储图片
                             if($(".publish_comment_page").length){
                                 historyData();
                             }
                            //如果在追加评价页面，添加成功后存储图片
                            else if($(".publish_comment_again_page").length){
                                historyDataAgain();
                            }
                        }
                        addBtn.val("");
                    },
                    error: function () {
                        li.remove();
                        addPicContainer.find(".add").removeClass("hide");
                        bravetime.info("上传失败，请检查网络后重试");
                    }
                });
            }

            if ($(".historyImg").length) {
                $(".img").click(function () {
                    clickImg(this);
                })
            }

            //删除图片按钮
            $(".publish_comment_con").on("click",".closeBtn",function () {
                $(this).parents("li").remove();
                $(".add_comment_con").find(".add").removeClass("hide");
                if (addPicContainer.find("li.img").length == 0) {
                    if(addInfo.length){
                        addInfo.removeClass("hide");
                    }
                }
                if($(".publish_comment_page").length){
                    historyData();
                }
                else if($(".publish_comment_again_page").length){
                    historyDataAgain();
                }
            })

            /**
             * 点击图片
             */
            function clickImg(li) {
                var index = 0;
                previewContainer.find(".swiper-wrapper").empty();
                // 增加图片
                var allPicLi = addPicContainer.find("li.img");
                for (var i = 0; i < allPicLi.length; i++) {
                    if (allPicLi[i] == li) {
                        index = i;
                    }
                    var src = $(allPicLi[i]).find("img").attr("data-show-src");
                    var item = $('<div class="swiper-slide"><img src="' + src + '"></div>');
                    previewContainer.find(".swiper-wrapper").append(item);
                }
                // 显示该显示的
                $(".publish_pic_view").removeClass("hide");

                mySwiper.slideTo(index, 100, true);

                bottomContainer.find(".num").html(mySwiper.activeIndex + 1 + "/" + addPicContainer.find("li.img").length);


                // 返回
                bottomContainer.find(".back").click(function () {
                    $(".publish_pic_view").addClass("hide");
                });
            }

            // 删除
            bottomContainer.find(".delete_btn").click(function () {
                var allPicLi = addPicContainer.find("li.img");
                var acIndex = mySwiper.activeIndex;
                console.log("del", acIndex);
                // 删除预览图片
                $(allPicLi.get(acIndex)).remove();
                // 删除大图
                $(previewContainer.find(".swiper-slide").get(acIndex)).remove();
                bottomContainer.find(".num").html(Math.min(addPicContainer.find("li.img").length, acIndex + 1) + "/" + addPicContainer.find("li.img").length);

                if (addPicContainer.find("li.img").length == 0) {
                    console.log(addInfo.length);
                    if(addInfo.length){
                        addInfo.removeClass("hide");
                    }
                    $(".publish_pic_view").addClass("hide");
                }
                if (addPicContainer.find("li").length <= 9) {
                    addPicContainer.find(".add").removeClass("hide");
                }
                if ($(".returnGoodsInfoButton").length) {
                    if (addPicContainer.find("li").length <= 4) {
                        addPicContainer.find(".add").removeClass("hide");
                    }
                }
                //如果在发表评价页面，删除图片成功后存储图片
                if($(".publish_comment_page").length){
                    historyData();
                }
                //如果在追加评价页面，删除图片成功后存储图片
                else if($(".publish_comment_again_page").length){
                    historyDataAgain();
                }
            });

            $(".add_comment_con .img").click(function () {
                clickImg(this);
            })
        }
    }


});
