$(document).ready(function () {
  if (window.Units && Units.isApp()) {
    return false;
  }
  var top0Container = $(".top0");

  // if (top0Container.length > 0 && window.tj_path != 'index') {
  //   // sticky
  //   // top0Container[0].style.position = '-webkit-sticky !important';
  //   // top0Container[0].style.position = 'sticky !important';
  //   top0Container[0].setAttribute('style', 'position: -webkit-sticky !important');
  //   top0Container[0].setAttribute('style', 'position: sticky !important');
  //   // top0Container[0].setAttribute('style', 'color: red');
  //   alert(top0Container[0].style.position);
  //   if (top0Container[0].style.position == '-webkit-sticky' || top0Container[0].style.position == 'sticky') {
  //     document.body.style.paddingTop = '0';
  //   } /*else {
  //     top0Container[0].style.position = 'fixed';
  //     document.body.style.paddingTop = '44px';
  //   }*/
  // }

  /* var $body = $(document.body);*/
  if (top0Container && top0Container.length) {


    $(".top_menu_button").click(function () {
      $(".top_menu_detail").toggleClass('hide');
    });
    $(window).on("scroll", function () {
      $(".top_menu_detail").addClass("hide");
    });

    //页面滚动时候操作
    $(window).scroll(scrollCallback);

    //初始化页面的时候也要操作下scrollCallback
    scrollCallback();

    $("*").on("DOMNodeInserted", function () {
      allHeight = $(document).height() - $(window).height();
    })
  }
  var allHeight, lastY = window.scrollY;

  function scrollCallback() {
    allHeight = allHeight || $(document).height() - $(window).height();
    var top = window.scrollY;
    // 解决ios中下拉不跟随问题，只有ios中才window.scrollY才会小于0
    if (top < 0) {
      top0Container.css('position', 'absolute');
    } else {
      top0Container.css('position', 'fixed');
    }

    var bottom = allHeight - top;

    //如果有限时购  也即是 首页
    if (document.getElementById("ts_menu")) {
        //限时购时间条 外固定
        var objHeight = document.getElementById("ts_menu_wrap").offsetTop,
        //猜你喜欢title 外固定
        likeHeight = document.getElementById("tt_com_1_wrap").offsetTop,
        obtop = objHeight - top,
        liketop = likeHeight - top,
        showheader = false; //出现顶部搜索条
      if (top < 40 || bottom < 40) {
        showHeader();
        showheader = true;
      } else if (top < lastY) {
        showHeader();
        showheader = true;
      } else if (top > lastY) {
        hideHeader();
        showheader = false;
      }
      lastY = top;
      var top_container = document.getElementById("top_container"),
        ts_menu = document.getElementById("ts_menu"),
        ts_menu_wrap = document.getElementById("ts_menu_wrap"),
        v_menu = document.getElementById("v_menu"),
        tt_com_1 = document.getElementById("tt_com_1"),
        tt_com_1_wrap = document.getElementById("tt_com_1_wrap"),
        comon = document.getElementById("comon");

      if (0 < obtop) {
        if (obtop <= 36) {
          if (showheader) {
            top_container.style.top = "0";
            ts_menu.style.zIndex = "2";
          } else {
            // if(document.getElementById("ts_menu_wrap").innerHTML == ""){
            //
            // }else{
              top_container.style.top = -(36 - obtop) + "px";
            // }
          }
        }
        if (obtop >= 44) {
          if (showheader) {
            if (document.getElementById("ts_menu_wrap").innerHTML == "") {
              ts_menu_wrap.appendChild(ts_menu);
              // v_menu.style.display = "block";
              v_menu.style.visibility = "visible";
              v_menu.style.marginTop= "0";
              ts_menu.style.zIndex = "12";
            }
          }
        }
      } else {
        top_container.appendChild(ts_menu);
        // v_menu.style.display = "none";
        v_menu.style.visibility = "hidden";
        v_menu.style.marginTop = "-40px";
        if (showheader) {

        } else {
          top_container.style.top = "0";
        }
      }
      //猜你喜欢
      if (liketop < 0) {
        top_container.appendChild(tt_com_1);
        ts_menu.style.display = "none";
        tt_com_1.style.zIndex = "2";
        comon.style.zIndex = "2";
        if (showheader) {

        } else {
          top_container.style.top = "0";
        }
      } else {
        //猜你喜欢是否悬浮
        var tt_come_1_fixed = document.getElementById("tt_com_1_wrap").innerHTML == "";
        if (liketop <= 50) {
          if (showheader) {
            top_container.style.top = "0";
            if (tt_come_1_fixed) {
              tt_com_1.style.zIndex = "2";
              comon.style.zIndex = "2";
            }
          } else {
            if (tt_come_1_fixed) {

            } else {
              top_container.style.top = -(50 - liketop) + "px";
            }
          }
        }
        if (liketop >= 44) {
          if (showheader) {
            if (tt_come_1_fixed) {
              tt_com_1_wrap.appendChild(tt_com_1);
              tt_com_1.style.zIndex = "13";
              comon.style.zIndex = "13";
              ts_menu.style.display = "block";
            }
          }
        }
        if (liketop >= 94) {
          tt_com_1.style.zIndex = "2";
          comon.style.zIndex = "2";
        }
      }

    } else {
      //其他二极管页面
      if (top < 40 || bottom < 40) {
        showHeader();
      } else if (top < lastY) {
        showHeader();
      } else if (top > lastY) {
        hideHeader();
      }
      lastY = top;
    }
  }


  function showHeader() {
    if (top0Container.hasClass("top_show") || top0Container.hasClass("animate")) {
      return false;
    }
    if (top0Container.hasClass("top_hide")) {
      top0Container.removeClass("top_hide").addClass("top_show").addClass("animate");
      //商品详情页及文章详情未开店用户提示开店
      if ($(".kd_prompt_con").length) {
        $(".kd_prompt_con").css("top", "40px")
      }
      setTimeout(function () {
        top0Container.removeClass("animate");
      }, 200)
    }

  }

  function hideHeader() {
    if (top0Container.hasClass("top_hide") || top0Container.hasClass("animate")) {
      return false;
    }
    top0Container.addClass("top_hide").removeClass("top_show").addClass("animate");
    //商品详情页及文章详情未开店用户提示开店
    if ($(".kd_prompt_con").length) {
      $(".kd_prompt_con").css("top", "0px")
    }
    setTimeout(function () {
      top0Container.removeClass("animate");
    }, 200)
  }


  function isWechat() {

    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }


  var h = window.screen.availHeight;
  if ($(".search_result").length) {
    $(".search_result").css("height", h + "px");

    // $(".search_input").click(add);


    function add() {
      $(".dav-buyer-bottom").addClass("hide");
      $(".search_result").removeClass('hide');
      $(".top_container").addClass("active");
      $(".top0").addClass("fixed");
      $(".fuck_SB").addClass("hide");
      if (isWechat() && !$(".top0").hasClass("animating")) {
        $(".top0").addClass('animating').addClass('firsting').delay(4500).removeClass('animating');
        $(".top_fix").css('height', "45px").delay(4500).animate({"height": "0px"}, 250);
        $(".search_result").css("top", "45px").delay(4500).animate({"top": "0px"}, 250);
      }
    }

    $(".search_input").focus(add);

    $(".cancel").click(function () {
      $(".fuck_SB").removeClass("hide");
      $(".search_result").addClass('hide');
      $(".top_container").removeClass("active");
      $(".top0").removeClass("fixed").removeClass("firsting");
      setTimeout(function () {
        $(".dav-buyer-bottom").removeClass("hide");
      }, 1000);

    });
    $(".search_form").on("submit", function () {
      if ($(".input_container").find("input").val() == "") {
        bravetime.info("请输入商品名称");
        return false;
      } else {
        return true;
      }
    });
  }


});



