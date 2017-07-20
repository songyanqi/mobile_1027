/**
 * Created by nemolee on 16/2/18.
 */
$(function () {
    var ajaxing = 0, pageIndex = window.pageIndexStart || 2,
        allAjaxData = [],  // 所有异步数据
        p = 'classroom';
    var refreshContainer = $(".refresh");

    var searchCon = $(".classification_search");
    var searchWord = $(".search_word");
    var allClassCon = $(".classification");
    var $body = $("body");

    var menuSwiper;

    var h = document.documentElement.clientHeight;
    if (searchCon.hasClass("hide")) {
        searchCon.css("height", h + "px");
    }

    // 顶部轮播图滚动
    if($(".index_ads").length){
        new Swiper('.index_ads', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false,
            loop: true,
            preloadImages: false,
            lazyLoading: true
        });
    }

    /*点赞操作*/
    $body.on("click",".pull-right",function() {
        var $this = $(this).find(".point_praise");
        var num = $this.parent().find(".praise_num").html();
        if(num == ''){
            num = 0;
        }else{
            num = +num;
        }
        var pageId = $this.attr("page-id");
        if ($this.hasClass("not_point_praise")) {
            //添加点赞
            bravetime.addLoader({little: true});
            $.ajax({
                url: window.praiseUrl,
                dataType: "json",
                data: {
                    id: pageId,
                    collect: 1
                }, success: function (result) {
                    bravetime.removeLoader();
                    if (result["error"] == -1) {
                        window.nativeLoginFunction(result["url"]);
                        // bravetime.goto(result["url"]);
                    } else if (result["error"]) {
                        bravetime.info(result["msg"]);
                    } else {
                        num++;
                        $this.addClass("has_been_like").removeClass("not_point_praise").addClass("active_praise");
                        $this.parent().find(".praise_num").html(" "+num);
                    }

                }, error: function () {
                    bravetime.removeLoader();
                    bravetime.ajaxError(36);
                }
            });
        } else {
            //取消点赞
            bravetime.addLoader({little: true});
            $.ajax({
                url: window.praiseUrl,
                dataType: "json",
                data: {
                    id: pageId,
                    collect: 0
                }, success: function (result) {
                    bravetime.removeLoader();
                    if (result["error"] == -1) {
                        bravetime.goto(result["url"]);
                    } else if (result["error"]) {
                        bravetime.info(result["msg"]);
                    } else {
                        num--;
                        $this.addClass("not_point_praise").removeClass("has_been_like").removeClass("active_praise");
                        if(num == 0){
                            $this.parent().find(".praise_num").html('');
                        }else{
                            $this.parent().find(".praise_num").html(" "+num);
                        }

                    }

                }, error: function () {
                    bravetime.removeLoader();
                    bravetime.ajaxError(36);
                }
            });
        }
        return false;
    });


    $(".search_to_click").click(function () {
        if (Units.isApp()) {
            if (Units.getAppVersion() >= 150) {
                // 原生搜索
                window.bravetime.callNative(function () {

                }, h5ClassroomSearch, "base", "searchClassroom");
                return false;
            }
        }
        h5ClassroomSearch();

        function h5ClassroomSearch() {
            searchCon.removeClass("hide");
            searchWord.focus();
            allClassCon.addClass("hide");

            if (Units.isWechat() && !searchCon.hasClass("animating")) {
                if (!$(".top_fix").length) {
                    searchCon.find(".top0").prepend($('<div class="top_fix"></div>'))
                }
                searchCon.addClass("animating").delay(4500).removeClass('animating');
                $(".top_fix").css('height', "45px").delay(4500).animate({"height": "0px"}, 250);
            }
        }

    });

    $(".back_in_page").click(function () {
        searchCon.addClass("hide");
        allClassCon.removeClass("hide");
    });

    $(".top_share").click(function () {
        $(".search_form").submit();
    });

    if (window.module) {
        module.slider.init("index_ads", 3 / 8, {autoSlide: true, infiniteSlider: true});
    }

    var listAndPage = getArticleListFromCache(p);
    if (listAndPage) {
        pageIndex = listAndPage.page;
        allAjaxData = listAndPage.list;
        category = listAndPage.category;
        cat_id = category;
        var has_more = listAndPage.has_more;
        if(has_more){
            refreshContainer.html("加载中...");
        }else{
            refreshContainer.html("没有更多");
        }
        changeTo(category);
        addDataToPage2({has_more: true, data: allAjaxData});
        if(listAndPage.top){
            getYCache();
        }
    }else{
        down2refresh();
    }

    //获取v刊导航条数
    var swiper = $(".v_menu").find(".swiper-slide");
    var swiperNum = swiper.size();
    //默认选中的在最中间
    var select = 0;
    swiper.each(function () {
        if ($(this).hasClass("hover")) {
            return false;
        } else {
            select++;
        }
    });
    if($(".v_menu").length){
        //v刊导航
        if(swiperNum > 4){
            menuSwiper = new Swiper('.v_menu', {
                slidesPerView: 4.5,
                grabCursor: true,
                initialSlide: select - 2
            });
        }else{
            menuSwiper = new Swiper('.v_menu', {
                slidesPerView: swiperNum,
                grabCursor: true
            });
        }
    }

    setTimeout(function () {
        $(window).on("scroll", function () {
            var bodyHeight = $(document.body).height();
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var bottom = bodyHeight - scrollTop - windowHeight;
            if (bottom < 100 && $(".refresh").length) {
                down2refresh();
            }
        });
    }, 500);

    $(".classification_list").on("click", "a", function (event) {
        var $this = $(event.target);
        if($this.hasClass("pull-right")||$this.parents(".pull-right").length){

        }else{

            setYCache();
        }
    });

    /**
     * 下拉刷新
     */
    function down2refresh() {

        if (ajaxing) {
            return false;
        } else {
            ajaxing = 1;
            refreshContainer.html("加载中...");
            $.ajax({
                url: down2refreshUrl,
                dataType: "json",
                data: {
                    page: pageIndex,
                    pagesize: pagesize,
                    sort: sort,
                    category: category,
                    q: q,
                    t: Date.now()
                },
                success: function (result) {
                    if (result["error"]) {
                        bravetime.info(result["msg"]);
                        ajaxing = 0;
                        refreshContainer.html("没有更多");
                    } else {
                        //TODO 根据has_more判断下一页
                        if (result["data"].length) {
                            ajaxing = 0;
                            if($(".classification_wrap").length){
                                addDataToPage2(result);
                            }else{
                                addDataToPage(result);
                            }
                            // 每次加载数据成功后 把数据放到本地缓存中
                            allAjaxData = allAjaxData.concat(result.data);
                            var saveData = {};
                            saveData.list = allAjaxData;
                            saveData.page = pageIndex + 1;
                            saveData.category = category;
                            saveData.has_more = result.has_more;
                            setArticleListToCache(p, saveData);
                            if(result["data"].length<pagesize){
                                refreshContainer.html("没有更多");
                            }
                        } else {

                            refreshContainer.html("没有更多");
                            var saveData = getArticleListFromCache(p);
                            saveData.has_more = false;
                            setArticleListToCache(p,saveData);
                        }
                        pageIndex = pageIndex + 1;
                        window.bravetime.tj.pvSend('classroom_d2refresh', 'classroom_d2refresh_id' + pageIndex);
                    }
                }, error: function () {
                    bravetime.ajaxError(37);
                    ajaxing = 0;
                    refreshContainer.html("没有更多");
                }
            });
        }
    }

    function addDataToPage2(data) {
        var container = $(".classification_wrap");
        var articleData = data.data;
        console.log(articleData.length);
        for (var i = 0; i < articleData.length; i++) {
            var ad = articleData[i];
            if(ad.page_type_id == 3){
                var $div = $('<div class="classification clearfix mb_10"><ul class="classification_list"><li>'+
                    '<a href=/class_detail-'+ad.page_id+'.html>'+
                    '<div class="img_container"><div class="img_container_inner">'+'<img src="'+ad.image+'" /><span class="playWhite2"></span></div>'+
                    '<div class="classification_container dav-small">'+
                    '<div class="classification_name">'+ad.title+'</div>'+
                    '<div class="classification_info">'+
                    (cat_id == 0 ? '<span>'+ad.cat_name+'</span><span class="strings">|</span>' : '') +
                    '<span>'+(+ad.read_times||"")+" 阅读数"+'</span>'+
                    (cat_id == 0 ? '' : '<span class="strings">|</span><span class="classification_date">'+ad.ctime+'</span>')+
                    '<span class="pull-right">'+
                    //has_been_like not_point_praise
                    '<i page-id="'+ad.page_id+'" class="'+(ad.has_been_like ? "point_praise has_been_like" : "point_praise not_point_praise")+'"></i>'+
                    '<i class="praise_num">'+" "+(ad.thumb_up_num == 0 ? '' : ad.thumb_up_num)+'</i>'+
                    '</span></div></div></div></a></li></ul>' +
                    '</div>');
            }else{
                var $div= $('<div class="classification clearfix mb_10"><ul class="classification_list"><li>' +
                    '<a href=/class_detail-'+ad.page_id+'.html>'+
                    '<div class="classroom_imgss">' +
                    (ad.page_type_id == 2 ? '<span class="playWhite"></span>' : '')+
                    '<img src="'+ad.image+'" /></div><div class="img_container"><div class="classification_container dav-small" style="padding:0">' +
                    '<div class="classification_name">'+ad.title+'</div>' +
                    '<div class="classification_info">' +
                    (cat_id == 0 ? '<span>'+ad.cat_name+'</span><span class="strings">|</span>' : '') +
                    '<span>'+(+ad.read_times||"")+" 阅读数"+'</span>' +
                    (cat_id == 0 ? '' : '<span class="strings">|</span><span class="classification_date">'+ad.ctime+'</span>')+
                    '<span class="pull-right"><i  page-id="'+ad.page_id+'" class="'+(ad.has_been_like ? "point_praise has_been_like" : "point_praise not_point_praise")+'"></i>' +
                    '<i class="praise_num">'+" "+(ad.thumb_up_num == 0 ? '' : ad.thumb_up_num)+'</i></span></div></div></div></a></li></ul>' +
                    '</div>');
            }
            container.append($div);
        }
    }
    function addDataToPage(data){
        var container = $(".classification_list");
        var articleData = data.data;
        if($(".classification_wrap").length){

        }else{
            for(var i =0;i<articleData.length;i++){
                var ad = articleData[i];
                var li  =$('<li>'+
                    '<a href=/class_detail-'+ad.id+'.html>'+
                    '<div class="img_container">'+
                    '<div class="img_container_inner"><img src="'+ad.image+'"><span class="img_container_inner_font">'+(ad.page_type_name||"")+'</span></div>'+
                    '<div class="classification_container dav-small">'+
                    '<div class="classification_name">'+ad.title+'</div>'+
                    '<div class="classification_date">'+ad.ctime+' 阅读数 '+ ad.read_times + '</div>'+
                    '</div></div></a></li>');
                container.append(li);
            }
        }
    }


    var list = window.needTransDomainList || [];
    var allImg = $("img");
    allImg.each(function (i) {
        var $el = $(this);
        var imgSrc = $el.attr("src") || $el.attr("data-src");
        if (imgSrc && imgSrc.length) {
            var domain = imgSrc.replace('//', '').split("/")[0];
            if ($.inArray(domain, list) > -1) {
                var frameid = 'frameimg' + i;
                window['img' + i] = '<html><head><style>body{margin:0;vertical-align: middle;}img{width: 100%;margin: auto 0;top: 0;bottom: 0;position: absolute;}</style></head><body><img style="width: 100%" id="img" src=\'' + imgSrc + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script></body>';
                $el.after('<iframe style="width: 100%;" id="' + frameid + '" src="javascript:parent.img' + i + ';" frameBorder="0" scrolling="no"></iframe>');
                $el.remove();
            }
        }
    });

    $(".v_menu a").each(function (i,d) {
        $(d).data("index",i);
    });

    // 导航切换
    $(".v_menu a").click(function (event) {

        var index =$(this).data("index");

        category = $(this).attr("data-cat");
        changeTo(category);

        pageIndex = 1;
        allAjaxData = [];  // 所有异步数据


        $(this).parents("li").addClass("hover");




        cat_id = category;

        ajaxing=0;

        down2refresh();

        event.preventDefault();
        return false;
    });

    function changeTo(category) {
        $(".v_menu li").removeClass("hover").each(function (i,d) {
            if($(d).find("a").attr("data-cat")==category){
                $(d).addClass("hover");
                menuSwiper&&menuSwiper.slideTo(Math.max(0,i-2));
                $(".index_ads").toggleClass("height0",!!i).toggleClass("mb_10",!i);
                $(".classification_wrap").empty();
            }
        });
    }
});



function getArticleListFromCache(p) {
    var result = null;
    if (!window.isPrivateMode && window.sessionStorage) {
        var data = sessionStorage.getItem("article_list_" + p);
        var his = sessionStorage.getItem("history"), historyList;
        if (his) {
            historyList = JSON.parse(his);
        }
        if (data && historyList && historyList.length && historyList[historyList.length - 2] && (historyList[historyList.length - 2].path == "classroom_detail"||historyList[historyList.length - 2].path == "classroom")) {
            result = JSON.parse(data);
            if(historyList[historyList.length - 2].path == "classroom"){
                result.top = true;
            }
        }
    }
    return result;
}

function setArticleListToCache(p, data) {
    if (!window.isPrivateMode && window.sessionStorage) {
        if (data && p) {
            sessionStorage.setItem("article_list_" + p, JSON.stringify(data));
        }
    }
}