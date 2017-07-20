/**
 * Created by nemo on 16/7/2.
 */
$(function () {
    var previewContainer = $(".publish_pic_view");
    var bottomContainer = $(".publish_pic_preview_bottom");
    var currentLength;
    var mySwiper = new Swiper('.publish_pic_preview', {
        observer:true,
        onTransitionEnd: function(swiper){
            bottomContainer.find(".num").html(swiper.activeIndex+1+"/"+currentLength);
        }
    });
    $(".orderList_comment_list_con").on("click",".add_comment_con li",function () {
        var index  = 0,that = this;
        previewContainer.find(".swiper-wrapper").empty();
        var lis = $(this).parent().find("li");
        currentLength = lis.length;
        lis.each(function (i, el) {
            if(el == that){
                index = i;
            }
            var src = $(el).find("img").attr("data-show-src");
            var item = $('<div class="swiper-slide"><img src="' + src + '"></div>');
            previewContainer.find(".swiper-wrapper").append(item);
        });
        mySwiper.slideTo(index);

        bottomContainer.find(".num").html(mySwiper.activeIndex+1+"/"+currentLength);
        previewContainer.removeClass("hide");
    });


    bottomContainer.find(".back").click(function () {
       previewContainer.addClass("hide");
    });

    var container = $(".orderList_comment_list_con");


    var loadingContainer = $(".loading_container");
    // 下拉刷新
    var ajaxing = 0;

    var page = window.pageStartIndex||2;

    $(window).scroll(function () {
        if (ajaxing == 0) {
            var bodyHeight = $("body").height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            if (bodyHeight - scrollTop - windowHeight < 100) {
                ajaxing = 1;

                var data = { page: page };
                $.ajax({
                    url: refreshUrl,
                    data: data,
                    cache: false,
                    dataType: "json",
                    success: success,
                    error: error
                });
                
                function success(result) {
                    if(result.code){
                        bravetime.info(result.msg);
                    }else{
                        ajaxing = 0;
                        render(result.data);
                        page++;
                    }
                }
                
                function render(data) {
                    if(data.length){
                        for (var i = 0, d ; d = data[i++];) {
                            var gradeStr = '';
                            if(+d.grade){
                                for(var j=0;j<5;j++){
                                    if(j<d.grade){
                                        gradeStr+='<li class="hover">';
                                    }else{
                                        gradeStr += '<li></li>';
                                    }
                                }
                            }


                            var imgStr  = '';
                            if(d.comment_img&&d.comment_img.length){
                                for(var j=0;j<d.comment_img.length;j++){
                                    imgStr+='<li><img data-show-src="'+d.comment_img[j]["big_img"]+'" src="'+d.comment_img[j]["img"]+'"></li>';
                                }
                            }


                            var str = '<div class="list clearfix">'+
                               ' <div class="top">'+
                               ' <div class="head"><img src="'+ d.img +'"> </div>'+
                               ' <div class="pull-left"><span class="shopname">'+ d.name +'</span><span class="comment_date">'+ d.date +'</span></div>'+
                               ' <div class="pull-right">'+
                                '<ul>'+
                                gradeStr+
                                '</ul>'+
                                '</div>'+
                                '</div>'+
                                '<div class="comment_con">'+ d.comment +'</div>'+
                            '<div class="goods_property">'+ (d.categoryInfo||"") +'</div>'+
                            '<div class="add_comment_con clearfix">'+
                                '<ul>'+
                                imgStr+
                                '</ul>'+
                                '</div>'+
                                '</div>';
                            container.append($(str));
                        }
                    }else{
                        ajaxing = 1;
                        loadingContainer.html("没有更多评价了")

                    }
                }
                
                function error() {
                    ajaxing = 0;
                    bravetime.ajaxError(89);
                }
            }
        }
    });

});