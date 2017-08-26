$(document).ready(function(){
    function getQuery (name) {
        var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.match(reg)
        if (r != null) return decodeURIComponent(r[2])
        return null
    }
    // var hrefValue = window.location.href + '&rps=' + getQuery('rp') + '&rls=' + getQuery('rl')
    // window.history.replaceState(null, null, hrefValue);
    $('.share_to_web').on('click', function(){
        $.ajax({
            url:'/index.php?c=ShopGoods&a=ajax_share'+'&rp=' + getQuery('rp') + '&rl=' + getQuery('rl'),
            dataType:"json",
            type:"Get",
            success:function(result){
                console.log('result-->', result)
            },
            error:function(){
               
            }
        }); 
    })
    var confirmContainer = $(".kd_confirm_container");
    var okBtn = confirmContainer.find(".kd_code_btn");
    var errorText = confirmContainer.find(".error_code_info");
    var noCodeBtn = confirmContainer.find(".no_code_btn");
    noCodeBtn.click(function () {
        kd();
    });
    okBtn.click(function () {
        var inviteCode = $(".invite_code").val();
        if(inviteCode.length == 0){
            errorText.removeClass("hide").html("请输入手机号");
            return false;
        }
        kd(true,inviteCode);
    });
    $('.btn1').click(function () {
      if(!!navigator.userAgent.match(/davdian|bravetime|vyohui/)){
        window.location.href = '/'
      }else{
        window.location.href = '/index.php?rp=goods_shop&rl=guang'
      }
    })
    confirmContainer.find(".mask").click(function () {
        confirmContainer.addClass("hide").removeClass("show_slow");
    });
    var d129 = $(".detail129_bottom");
    if(d129 && d129.length){
        if (window._share && window._share == 1) {
            $(".share_to_web").click();
        }
        var kd_btn = d129.find(".dav-btn");
        kd_btn.click(function(event) {
            var that = this;
            function _callback(r) {
                if(typeof r == "string"){
                    r = JSON.parse(r);
                }
                var code = r.code;
                if(code==0){
                    // 没登录
                }else if(code == 1){
                    location.reload();
                }else if(code == 2){
                    k();
                }
            }

            if(Units.isApp()){
                if(Units.getAppVersion()>=240){
                    bravetime.nativeLogin(_callback);
                }else{
                    k();
                }
            }else{
                k();
            }

            function k() {
                if($(that).hasClass("btn-disable")){
                    return;
                }

                if(window["needCode"]){

                    confirmContainer.removeClass("hide").addClass("show_slow");



                }else{
                    kd();
                }
            }





        });

        function kd(useCode,code){
            bravetime.addLoader({little:true});
            // kd_btn.addClass("btn-disable").find("span").html("&nbsp;&nbsp;&nbsp;&nbsp;请求中...");
            if(useCode){
                data = {'goods_id':window.goodsId,use_code:1,code:code};
            }else{
                data = {'goods_id':window.goodsId,use_code:0,code:0};
            }
            $.ajax({
                url:kdUrl,
                data:data,
                dataType:"json",
                type:"POST",
                success:function(result){
                    bravetime.removeLoader();
                    // kd_btn.removeClass("btn-disable").find("span").html("立即加入");
                    if(result.errcode==0){
                        window.bravetime.goto(result["data"]["url"]);
                    } else if (result.errcode == 100204 || result.errcode == 100205) {
                        window.bravetime.goto(result["data"]["url"]);
                    } else if(result.errcode == 2017){
                        errorText.removeClass("hide").html(result["errmsg"]||"");
                    }else {
                        window.bravetime.newAlert(result["errmsg"]);
                    }
                },
                error:function(){
                    bravetime.removeLoader();
                    // kd_btn.removeClass("btn-disable").find("span").html("立即加入");
                    bravetime.ajaxError(15);
                }
            });
        }

        window.tlShareCallback = function(){
            if(window.share_redirect_url){
                window.bravetime.goto(window.share_redirect_url);
            }
        };
        window.sendShareCallback = function(){
            if(window.share_redirect_url){
                window.bravetime.goto(window.share_redirect_url);
            }
        };
        window.QQShareCallback = function(){
            if(window.share_redirect_url){
                window.bravetime.goto(window.share_redirect_url);
            }
        };

        if(window.is_new_seller){
            if(window.shareStr){
                $(".mask-to-web").find("p").remove();
                $(".mask-to-web").append($(shareStr));
            }
        }
    }

    /**
     * h5
     */
    // var h5 = $(".kd_h5");
    // if(h5 && h5.length){
    //     var winHeight = $(window).height();
    //     h5.css("height",winHeight+"px");
    //     var winWidth = $(document.body).width();
    //     var items = h5.find(".img_item").css("height",winHeight+"px");

    //     if(winHeight/winWidth>1728/1080){
    //         items.addClass("too_height");
    //     }else{
    //         items.addClass("too_width");
    //     }
    //     var swiper = new Swiper('.swiper-container', {
    //         pagination: '.swiper-pagination',
    //         paginationClickable: true,
    //         loop:true,
    //         direction: 'vertical'
    //     });
    // }
    var mySwiper = new Swiper('.swiper-container', {
        initialSlide:0,
        direction:'vertical',
        autoHeight: true,
        height: document.documentElement.clientHeight - 50,
        loop:true,
        onSlideChangeEnd:function(swiper){ 
            // that.index = swiper.activeIndex
        }
    })

    var confirmContainer = $(".kd_confirm_container");
});
