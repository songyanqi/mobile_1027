// 这是专题的js
$(function () {
  if (window.bravetime && bravetime.goto) {
    alert("该专题有问题，请联系研发");
    document.write("该专题有问题，请联系研发");
    return false;
  }


  window.bravetime = window.bravetime || {};
  window.bravetime.goto = function (url) {
    window.location.href = url;
  };
  /**
   * 调用原生方法
   * @param callback
   * @param error
   * @param className
   * @param method
   * @param argumentsList
   */
  window.bravetime.callNative = function (callback, error, className, method, argumentsList) {
    var t = Date.now();
    window["callback_" + t] = callback;
    window["error_" + t] = error;
    var str = "neng:\/\/call.app.com?v=" + [encodeURI("callback_" + t), encodeURI("error_" + t), className, method, JSON.stringify(argumentsList)].join("|||").replace(/\"/g, "'");
    if (Units.isApp()) {
      window.bravetime.goto(str);
    }
  };

  window.bravetime.callNative2 = function (host, action, params, callback, minv, minCallback) {
    var callback = callback || function () {
      };

    if (window.Units && Units.getAppVersion() >= minv.split(".").reduce(function (a, b) {
        return +a * 10 + +b
      })) {
      var t = Date.now() + "_" + Math.round(Math.random() * 10000);
      window["callback_" + t] = callback;

      var str = "davdian:\/\/call." + host + ".com?action=" + encodeURIComponent(action) + "&params=" + encodeURIComponent(JSON.stringify(params)) + "&callback=" + encodeURIComponent("callback_" + t) + "&minv=" + encodeURIComponent(minv);
      window.bravetime.goto(str);
    } else {
      if (minCallback) {
        minCallback();
      } else {
        bravetime.newAlert("请升级您的APP")
      }
    }
  };

  window.bravetime.initHead = function (callback) {
    bravetime.callNative2('Browser', 'initHead', {content: JSON.parse(iosInterface.getHeadAndFootData())}, callback, '3.4.0', function () {

    });
  };

  window.bravetime.callNativeReady = function () {
    // 如果是订单确认页,而且是等待刷新的,就不发这个了
    if (window.tj_id == 21 && $.cookie && $.cookie("no_refresh")) {
      $.removeCookie("no_refresh");
      return false;
    }
    bravetime.callNative(function () {

    }, function () {

    }, "base", "ready", []);
  };

  window.bravetime.callNativeHoldPic = function (src) {
    bravetime.callNative(function () {

    }, function () {

    }, "base", "savePic", [src]);
  };

  window.bravetime.addLoader = function (opt) {
    var h = window.screen.availHeight;
    opt = opt || {};
    if ($(".loader_container").length) {
      $(".loader_container").removeClass('hide');
    } else {
      $("body").append($("<div class='loader_container'><div class='loader'><div class='uil-default-css-normal' style='-webkit-transform:scale(0.25);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;'><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#fff;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div></div>"));
      $(".loader_container").css("height", h + "px").click(window.bravetime.removeLoader);
    }
    var little = opt["little"] || false;
    if (little) {
      $(".loader_container").addClass("little");
    } else {
      $(".loader_container").removeClass("little");
    }

  };
  window.bravetime.removeLoader = function () {
    $(".loader_container").addClass("hide");
  };

  window.bravetime.info = function (msg) {
    var delayTime = 1500;
    var infoContainer = $(".bravetime-info");
    if (infoContainer.length) {
      infoContainer.removeClass("hide").find('.inner').html(msg);
    } else {
      infoContainer = $('<div style="width:100%;z-index: 99;max-width:640px;position: fixed;top: 200px;text-align: center;"><div class="inner" style="display:inline-block;padding:12px 14px;max-width:80%;background: #D73C6B;color:#fff;border-radius: 3px;">' + msg + '</div></div>')
        .addClass("bravetime-info");
      $("body").append(infoContainer);
    }
    clearTimeout(window.st1);
    clearTimeout(window.st2);
    infoContainer.css("opacity", 1).stop();
    window.st1 = setTimeout(function () {
      infoContainer.css("opacity", 1).animate({opacity: 0}, 500);
      window.st2 = setTimeout(function () {
        infoContainer.css("opacity", 1).addClass("hide");
      }, 1000);
    }, delayTime);
  };

  var utils = window.utils = {};
  utils.isWechat = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) == "micromessenger");
  };
  utils.isQQ = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/qq\//i) == "qq/");
  };

  var Units = window.Units = window.Units || {};
  var u = navigator.userAgent;
  Units.isWechat = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) == "micromessenger");
  };
  Units.isQQ = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/qq\//i) == "qq/");
  };
  Units.isApp = function () {
    return !!u.match(/davdian|bravetime/)
  };
  Units.getAppVersion = function () {
    // 空格分所有
    var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) || u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i);
    if (versionStr == null) {
      return 0;
    } else {
      var v = versionStr[2].split(".").reduce(function (a, b) {
        return +a * 10 + +b
      });
    }
    return +v;
  };

  Units.isIOS = function () {
    if (u.match(/ios/i)) {
      return true;
    }
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  };
  Units.isMobileIOS = function () {
    return /iPhone|iPad|iPod/i.test(u);
  };
  Units.isAndroid = function () {
    if (u.match(/(android|linux)/i)) {
      return true;
    }
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  };

  var shareButton = $(".share_to_web");
  if (shareButton && shareButton.length) {
    shareToWeb(shareButton);
  }

  function shareToWeb(shareButton) {


    if (window.Units && Units.isApp()) {
      var useMMB = 0;
      shareButton.click(function () {
        bravetime.callAppShare({
          title: shareTitle, // 分享标题
          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
          imgUrl: imgUrl.replace("https", "http"), // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            if (window.appShareCallback && typeof window.appShareCallback == "function") {
              window.appShareCallback();
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            if (window.appShareCallbackCancel && typeof window.appShareCallbackCancel == "function") {
              window.appShareCallbackCancel();
            }
          }
        });
        bravetime.tj.pvSend(window.tj_path + "_share")
      });

      return false;
    }

    if (window.Units && Units.isWechat()) {
      var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>点击右上角“分享”按钮</p>' + '<p>选择“发送给朋友”或者“分享到朋友圈”' + (!!window.disableCopyToShare ? '' : '或者“复制链接”后发送链接给朋友') + '</p>' + ((window.shareStr && window.shareStr != "") ? ('<p class="big">推荐语：</p><p>' + window.shareStr + '</p><p>（长按选中后复制推荐语）</p>') : ("")) + '</div>');
    } else if (window.Units && Units.isQQ()) {
      var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>点击右上角“分享”按钮</p>' + '<p>选择QQ好友、QQ空间、微信、朋友圈进行分享' + (!!window.disableCopyToShare ? '' : '或者“复制链接”后发送链接给朋友') + '</p>' + ((window.shareStr && window.shareStr != "") ? ('<p class="big">推荐语：</p><p>' + window.shareStr + '</p><p>（长按选中后复制推荐语）</p>') : ("")) + '</div>');
    } else {
      var msk = $('<div class="mask-to-web">' + '<div class="pointer"></div>' + '<p>复制链接分享</p>' + '<p>复制地址栏链接，将链接发送给朋友</p>' + '</div>');
    }
    $("body").append(msk.addClass("hide"));
    shareButton.click(function () {
      msk.removeClass("hide");
      if (window.shareButtonClickCallback && typeof window.shareButtonClickCallback == "function") {
        window.shareButtonClickCallback();
      }
      bravetime.tj.pvSend(window.tj_path + "_share")
    });
    msk.click(function (event) {
      msk.addClass('hide');
    });

  }

  /**
   * 旧版分享
   * @param opt
   */
  window.bravetime.callAppShare = function (opt) {
    bravetime.callNative(function () {
      var result = JSON.parse(r);
      var code = result["code"];
      if (code == 0) {
        // 分享成功
        bravetime.info("分享成功");
      } else if (code == 1) {
        bravetime.info("分享失败");
      } else {
        alert("系统异常，请重试");
      }
    }, function () {
      alert("系统异常，请退出app重试")
    }, "base", "share", []);
  };


  var top0Container = $(".top0");
  $(window).scroll(scrollCallback);
  $("*").on("DOMNodeInserted", function () {
    allHeight = $(document).height() - window.innerHeight;
  });
  var allHeight, lastY = window.scrollY;

  function scrollCallback() {
    allHeight = allHeight || $(document).height() - window.innerHeight;
    var top = window.scrollY;
    var bottom = allHeight - top;
    if (top < 40 || bottom < 40) {
      showHeader();
    } else if (top < lastY) {
      showHeader();
    } else if (top > lastY) {
      hideHeader();
    }
    lastY = top;
    var scrollTop = $("body").scrollTop();
    if (scrollTop > 200) {
      if ($(".to-top").length == 0) {
        $("body").append('<div class="to-top"><a href="javascript:void(0);" id="to-top"><i class="icon dav_icon_up2top_80_80"></i></a></div>');
        $("#to-top")
          .on("click", function () {
            $('html,body').animate({scrollTop: 0}, 500);
          });
      }

    } else {
      $(".to-top").remove();
    }

  }

  function showHeader() {
    if (top0Container.hasClass("top_show")) {
      return false;
    }
    if (top0Container.hasClass("top_hide")) {
      top0Container.removeClass("top_hide").addClass("top_show");
    }
  }

  function hideHeader() {
    if (top0Container.hasClass("top_hide")) {
      return false;
    }
    top0Container.addClass("top_hide").removeClass("top_show");
  }


  init();

  /**
   * 初始化
   */
  function init() {
    // 分享
    if (window.wx) {
      initShareModel(); //初始化分享模块
      addShareListener(); // 增加对分享的监听


    }
    addToCartListener(); // 增加加入购物车等监听
    initBack();

    if (window.Units && Units.isApp()) {

      $("img").each(function (index, element) {
        var flag = false, timer = null;
        $(element).on("touchstart", function () {
          flag = true;
          timer = setTimeout(function () {
            if (flag) {
              window.bravetime.callNativeHoldPic($(element).attr("src"));
            }
          }, 500);
        });
        $(element).on("touchend", function () {
          flag = false;
          clearTimeout(timer);
        });
        $(element).on("touchmove", function () {
          flag = false;
          clearTimeout(timer);
        });
      });
    }
    window.scrollTo(0, scrollY + 1);

    window.bravetime.initHead();

  }

  function initBack() {
    $(".top_back").on("click", function () {
      var ref = document.referrer;
      if (!ref) {
        window.location.href = "/";
      } else {
        window.history.back(-1);
      }
      return false;
    });
  }


  /**
   * 初始化分享模块
   */
  function initShareModel() {
    var c = JSON.parse(wx_js_token);
    wx.config({
      debug: false,
      appId: c.appId,
      timestamp: c.timestamp,
      nonceStr: c.nonceStr,
      signature: c.signature,
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
    })
  }

  /**
   * 增加对分享的监听
   */
  function addShareListener() {
    var shareImgUrl = imgUrl.replace("https", "http");
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: shareTitle,
        link: lineLink,
        imgUrl: shareImgUrl,
        success: function () {
          if (window.tlShareCallback && typeof window.tlShareCallback == "function") {
            window.tlShareCallback()
          }
        },
        cancel: function () {
          if (window.tlShareCallbackCancel && typeof window.tlShareCallbackCancel == "function") {
            window.tlShareCallbackCancel()
          }
        }
      });
      wx.onMenuShareAppMessage({
        title: shareTitle,
        desc: descContent,
        link: lineLink,
        imgUrl: shareImgUrl,
        success: function () {
          if (window.sendShareCallback && typeof window.sendShareCallback == "function") {
            window.sendShareCallback()
          }
        },
        cancel: function () {
          if (window.sendShareCallbackCancel && typeof window.sendShareCallbackCancel == "function") {
            window.sendShareCallbackCancel()
          }
        }
      });
    });
  }

  function add2cart(goods_id, number, callback, error, me) {
    bravetime.addLoader({little: true});


    var goods = {};

    goods.goods_id = goods_id;
    goods.number = number;
    $.ajax({
      url: "/index.php?m=default&c=cart&a=add_to_cart",
      //url:"../data/cart.json",
      data: {goods: JSON.stringify(goods)},
      dataType: "json",
      type: "POST",
      success: function (data) {
        if (data.error > 0) {
          bravetime.info('该商品无法在商品列表页加入购物车,请到商品详情页添加');
          error && error();
          bravetime.removeLoader()
        } else {
          var eleContent = $('<div class="eleContent"></div>');
          $(document.body).append(eleContent);
          var left = $(me).offset().left - eleContent.offset().left;
          var bottom = $(window).height() - ($(me).height() + ($(me).offset().top - $(document).scrollTop()));
          var ele = $('<div class="cart_ele">1</div>');
          eleContent.append(ele);
          ele.css("left", left + "px");
          ele.css("bottom", bottom + "px");
          var cart_left = $("#cart-fixed").offset().left + 34 - eleContent.offset().left;
          var cart_bottom = $(window).height() - ($("#cart-fixed").height() + ($("#cart-fixed").offset().top - $(document).scrollTop())) + 35;
          ele.animate({
            left: cart_left,
            bottom: cart_bottom
          }, 600, function () {
            eleContent.remove();
            $(".cart-good-num").text(data.cart_number).removeClass("hide")
            callback && callback();
            bravetime.removeLoader()
          });
        }


      }, error: function () {
        bravetime.info(good_name + "加入购物车失败,请重试");
        error && error();
        bravetime.removeLoader()

      }
    });

  }

  window.add2cart = add2cart;

  /**
   * 增加加入购物车等监听
   */
  function addToCartListener() {
    //点击加入购物车的图标
    //获取所点击的加入购物车按钮的位置
    //用js在页面body最下面添加加入购物车动效元素
    //把动效元素放到加入购物车按钮的位置(left=加入购物车离屏幕左边的宽度,bottom=加入购物车离屏幕底部的高度)
    //在加入购物车上动效元素添加一个动画效果的class
    //把动态元素删除,然后改购物车的数量
    $(".add_cart").click(function () {
      var me = this;
      if ($(me).hasClass("disable")) {
        return;
      }
      $(me).addClass("disable");

      add2cart($(this).parent().attr("data-for-id"), 1, function () {
        $(me).removeClass("disable");
      }, function () {
        $(me).removeClass("disable");
      }, me)

    });
  }

  var allImg = $("img");
  allImg.each(function () {
    var $el = $(this);
    var imgSrc = $el.attr("src") || $el.attr("data-src");
    if (imgSrc && imgSrc.length) {
      if (imgSrc.indexOf("speard.php") > -1) {
        var obj = {};
        var pa = imgSrc.split("?")[1].split("&");
        pa.forEach(function (p) {
          obj[p.split("=")[0]] = p.split("=")[1];
        })
        $.ajax({
          url: "/images/api/speard/index",
          data: obj,
          type: 'POST',
          dataType: "json",
          success: function (result) {
            if (!+result.code) {
              $el.attr("src", result.data.url);
            }
          }
        })
      }
    }
  });

  // 新逻辑 根据id增加商品
  $(".goods-list-template").each(function () {
    var $el = $(this);
    var goods = $el.attr("data-goods-id");
    $.ajax({
      url: "/index.php?m=default&c=topic&a=ajax_goods_by_ids",
      type: "POST",
      data: {
        list: goods
      },
      dataType: "json",
      success: function (res) {
        var data = res.data;
        var str = '<div class="goods_group">';
        for (var i = 0; i < data.length; i++) {
          var d = data[i];
          d.shop_price = d.shop_price+'';
          d.shop_price1 = d.shop_price.split(".")[0];
          if(d.shop_price.split(".").length==2){
            d.shop_price2 = '.'+d.shop_price.split(".")[1];
          }else{
            d.shop_price2 = '';
          }
          str += '<div class="goods_item">' +
            '<a href="/'+d.goods_id+'.html?rl='+res.referer.rl+'&rp='+res.referer.rp+'">'+
            '<div class="goods_img">' +
            (i<4?('<img src=\"'+d.goods_img+'\">'):('<img src="http://pic.davdian.com/free/loading_320_320_v2.png" data-original=\"' + d.goods_img + '\">'))+
            ((d.goods_label && d.goods_label.length) ? ('<span class="img_label">' + d.goods_label + '</span>') : "") +
            '</div>' +
            '<div class="goods_name">' + d.goods_name + '</div>' +
            '<div class="goods_price">' +
            '<span class="price">¥' +d.shop_price1+
            '<small>' + d.shop_price2 + '</small>' +
            '</span>' +
            (d.seller_income != '0'  ? ( '<span class="vip_return">' +
            '<span class="vip_return_title">会员返</span>' +
            '<span class="vip_return_f">¥</span> ' +
            '<span class="vip_return_price">' + d.seller_income + '</span>' +
            '</span>') : "") +
            '</div>' +
            '</a>' +
            '</div>'
        }
        str += '</div>';
        $el.html(str);
        $el.find("img").lazyload({effect: "fadeIn", threshold: 100})
      }
    });

  });
});

// lazyload的js


(function ($, window, document, undefined) {
  var $window = $(window);

  $.fn.lazyload = function (options) {
    var elements = this;
    var $container;
    var settings = {
      threshold: 500,
      failure_limit: 10,
      event: "scroll",
      effect: "show",
      container: window,
      data_attribute: "original",
      skip_invisible: true,
      appear: null,
      load: null,
      placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFrKys9vb2l5eXwcHB6urqpaWl5OTkoqKi/f39qqqqnp6emJiY8fHx1dXVs7Oz7u7u3Nzc8/PzuLi40dHR2dnZkpKSkJCQyMjI+Pj44+Pjurq6kZGRzs7Oy8vL+/v7////kZFhOAAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAACjUlEQVR42uzXbbOqIBAA4BUhjcCsU7B4PIf//y/vgmb2cicbtfvhwjSOUfLAtrwE/gMFEpKQhCQkIQlJSEIS8n8gx28zqXwfZyATDVJmIMZscELZGDMLwSkRx4T8IyRrdrtjti5SipCrolwVqbsZcVoV+ekQuypy6hC97m9SBKP4XTe7DtX5XB1WnyflkFplXvG1J+OB0vn8tS6ylzEH8nJFhO/6XaQqF0Y2w4LC2bBXAS6JKDBMPxjGbHE5xMUAHX/vDVrLsqWQn36vL/Z+v7vb3YOyAFI2l9PCmfd5NS5FtgCCMBxJ6oN8clIpstmIKobWvrLi6XlIqJnI6dr3Y7b9y6mrmIV85HD3kWNq+uuQkITcI8pdi6L32oXaXD/tDNCHDvB6oDTTECvhUmR4GGILYB8b0dbKxlpCqgrfRKg5nQ+3N4hzhsaHNu7snjsnWnpPzzb8bUQzGoYw/AEBMPRyoZ767zqkFSGy6EarmH2N5AK4R6H7kcTwsXDlsacXhFNHROhN6BJwB8NIYALiSMilu4SrGfIAPQ8I7xD6rAlhVZL2975iOoJ1Liopcz0KV18cC+30CMhuDMYjw0dku7253CI5pQwFhrd5h4CNRUUERoiHWofMlso2VCHDt0y4yNdIyC7GoO3DJZpomDhdbDVCNLOhB6qyDJ8gL7KrrSlZ6g5B02Vnh1TtCKFp29APhq1pvfLIh3BxNQGxlL8SuuzS0l8RZVREqOk2PEFIbVVDRyZwb0/G0JvahVtkdoRUFK2axUVBgKeYSooRiKrxDN9DbiZVI/wVcUzl4U/pkMLhDgQik/K9Ga/1+BYv4Y3Z5e4fcy7WoeVTVvO0aSUkIQlJSEISkpCEfAb5I8AAHVZ/+7SjOvEAAAAASUVORK5CYII="
    };

    function update() {
      var counter = 0;

      elements.each(function () {
        var $this = $(this);
        if (settings.skip_invisible && !$this.is(":visible")) {
          return;
        }
        if ($.abovethetop(this, settings) ||
          $.leftofbegin(this, settings)) {
          /* Nothing. */
        } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
          $this.trigger("appear");
          /* if we found an image we'll load, reset the counter */
          counter = 0;
        } else {
          if (++counter > settings.failure_limit) {
            return false;
          }
        }
      });

    }

    if (options) {
      /* Maintain BC for a couple of versions. */
      if (undefined !== options.failurelimit) {
        options.failure_limit = options.failurelimit;
        delete options.failurelimit;
      }
      if (undefined !== options.effectspeed) {
        options.effect_speed = options.effectspeed;
        delete options.effectspeed;
      }

      $.extend(settings, options);
    }

    /* Cache container as jQuery as object. */
    $container = (settings.container === undefined ||
    settings.container === window) ? $window : $(settings.container);

    /* Fire one scroll event per scroll. Not one scroll event per image. */
    if (0 === settings.event.indexOf("scroll")) {
      $container.bind(settings.event, function () {
        return update();
      });
    }

    this.each(function () {
      var self = this;
      var $self = $(self);

      self.loaded = false;

      /* If no src attribute given use data:uri. */
      if ($self.attr("src") === undefined || $self.attr("src") === false) {
        if ($self.is("img")) {
          $self.attr("src", settings.placeholder);
        }
      }

      /* When appear is triggered load original image. */
      $self.one("appear", function () {
        if (!this.loaded) {
          if (settings.appear) {
            var elements_left = elements.length;
            settings.appear.call(self, elements_left, settings);
          }
          $("<img />")
            .bind("load", function () {

              var original = $self.attr("data-" + settings.data_attribute);
              $self.hide();
              if ($self.is("img")) {
                $self.attr("src", original);
              } else {
                $self.css("background-image", "url('" + original + "')");
              }
              $self[settings.effect](settings.effect_speed);

              self.loaded = true;

              /* Remove image from array so it is not looped next time. */
              var temp = $.grep(elements, function (element) {
                return !element.loaded;
              });
              elements = $(temp);

              if (settings.load) {
                var elements_left = elements.length;
                settings.load.call(self, elements_left, settings);
              }
            })
            .attr("src", $self.attr("data-" + settings.data_attribute));
        }
      });

      /* When wanted event is triggered load original image */
      /* by triggering appear.                              */
      if (0 !== settings.event.indexOf("scroll")) {
        $self.bind(settings.event, function () {
          if (!self.loaded) {
            $self.trigger("appear");
          }
        });
      }
    });

    /* Check if something appears when window is resized. */
    $window.bind("resize", function () {
      update();
    });

    /* With IOS5 force loading images when navigating with back button. */
    /* Non optimal workaround. */
    if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
      $window.bind("pageshow", function (event) {
        if (event.originalEvent && event.originalEvent.persisted) {
          elements.each(function () {
            $(this).trigger("appear");
          });
        }
      });
    }

    /* Force initial check if images should appear. */
    $(document).ready(function () {
      update();
    });

    return this;
  };

  /* Convenience methods in jQuery namespace.           */
  /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

  $.belowthefold = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top + $(settings.container).height();
    }

    return fold <= $(element).offset().top - settings.threshold;
  };

  $.rightoffold = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.width() + $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left + $(settings.container).width();
    }

    return fold <= $(element).offset().left - settings.threshold;
  };

  $.abovethetop = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top;
    }

    return fold >= $(element).offset().top + settings.threshold + $(element).height();
  };

  $.leftofbegin = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left;
    }

    return fold >= $(element).offset().left + settings.threshold + $(element).width();
  };

  $.inviewport = function (element, settings) {
    return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };

  /* Custom selectors for your convenience.   */
  /* Use as $("img:below-the-fold").something() or */
  /* $("img").filter(":below-the-fold").something() which is faster */

  $.extend($.expr[":"], {
    "below-the-fold": function (a) {
      return $.belowthefold(a, {threshold: 0});
    },
    "above-the-top": function (a) {
      return !$.belowthefold(a, {threshold: 0});
    },
    "right-of-screen": function (a) {
      return $.rightoffold(a, {threshold: 0});
    },
    "left-of-screen": function (a) {
      return !$.rightoffold(a, {threshold: 0});
    },
    "in-viewport": function (a) {
      return $.inviewport(a, {threshold: 0});
    },
    /* Maintain BC for couple of versions. */
    "above-the-fold": function (a) {
      return !$.belowthefold(a, {threshold: 0});
    },
    "right-of-fold": function (a) {
      return $.rightoffold(a, {threshold: 0});
    },
    "left-of-fold": function (a) {
      return !$.rightoffold(a, {threshold: 0});
    }
  });

})(jQuery, window, document);

jQuery(document).ready(function ($) {
  $("img").lazyload({effect: "fadeIn", threshold: 100})
});

var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz))
}
function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz))
}
function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz))
}
function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data))
}
function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data))
}
function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data))
}
function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}
function core_md5(x, len) {
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd)
  }
  return Array(a, b, c, d)
}
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t)
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
}
function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
  var ipad = Array(16), opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C
  }
  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128)
}
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF)
}
function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}
function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz)bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
  return bin
}
function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz)str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
  return str
}
function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
  }
  return str
}
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad; else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F)
    }
  }
  return str
}

var strSign = function (obj) {
  var strObj = sortObj(obj)
  var str = ''
  for (var i in strObj) {
    str += i + '=' + strObj[i] + '&'
  }
  return str;
}

var sortObj = function (obj) {
  var string = ''
  var strObj = {}
  var t = null
  var tValue = null
  var arrKey = ['shop_url', 'sess_key', 'device_token', 'format', 'ts', 'osv', 'wh', 'data_version']
  var osv = "web_h5_*_*";
  if (window.Units && Units.isApp() && Units.isIOS()) {
    osv = "web_ios_*_*";
  }
  if (window.Units && Units.isApp() && Units.isAndroid()) {
    osv = "web_android_*_*";
  }
  var arrValue = [location.host, document.cookie.split(';').filter(function (x) {
    return x.indexOf("dvdsid") > -1
  })[0] ? document.cookie.split(';').filter(function (x) {
    return x.indexOf("dvdsid") > -1
  })[0].split("=")[1] : 0, "", 'json', new Date().getTime(), osv, '750_1334', 0]

  if (obj.obj) {
    for (var p in obj.obj) {
      arrKey.push(p)
      arrValue.push(obj.obj[p])
    }
  }
  for (var i = 0; i < arrKey.length; i++) {
    for (var j = 0; j < arrKey.length - i - 1; j++) {
      if (arrKey[j] > arrKey[j + 1]) {
        t = arrKey[j + 1]
        arrKey[j + 1] = arrKey[j]
        arrKey[j] = t

        tValue = arrValue[j + 1]
        arrValue[j + 1] = arrValue[j]
        arrValue[j] = tValue
      }
    }
  }
  for (var i = 0; i < arrKey.length; i++) {
    strObj[arrKey[i]] = arrValue[i]
  }
  for (var p in strObj) {
    string += p + '=' + strObj[p]
  }
  var sign = hex_md5(string).toUpperCase()
  strObj.sign = sign
  return strObj
}

window.tj_id = 99;
window.tj_path = "topic_base";
window.tj_path_detail = "topic_base_" + window.location.href.split("/").pop().replace("t-", "").replace(".html", "");

// 统一加 数据统计
window.cnzz = false; // 是否使用cnzz
window.baidu = true; // 是否使用百度统计
window.google = false; // 是否使用google统计
window.dvd_tj = true; // 大V店统计

if (window.cnzz || window.baidu || window.google || window.dvd_tj) {
  var js = document.scripts;
  var tjscr = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1) + "tongji.js";
  var oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src = tjscr;
  var s = document.getElementsByTagName('head')[0].getElementsByTagName("link")[0];
  s.parentNode.insertBefore(oScript, s);
  window.bravetime = window.bravetime || {};
}


if (window.cnzz) {
  var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
  document.write(unescape("%3Cspan id='cnzz_stat_icon_1255599577'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1255599577' type='text/javascript'%3E%3C/script%3E"));
}
if (window.baidu) {
  var _hmt = window._hmt || [];
  if (window["tj_path"]) {
    _hmt.push(['_setAutoPageview', false]);
  }
  window._hmt = _hmt;
  (function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?9b39bbe0b5396b90787c80447d337d58";
    var s = document.getElementsByTagName('head')[0].getElementsByTagName("link")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

// fix 放在body的最后
function showIosInterface() {
  window.iosInterface = window.iosInterface || {};

  window.iosInterface.getHeadAndFootData = function () {
    var data = {
      showHead: 1,     // 是否展示头部
      showFoot: 0,     // 是否展示底部
      backOnHead: 1,   // 头部返回按钮
      homeOnHead: 1,   // 头部首页按钮
      shareOnHead: 1,  // 头部分享按钮
      btnOnHead: 0,    // 头部文字按钮
      btnText: "",     // 头部文字按钮文字
      btnLink: ""      // 头部文字按钮链接
    };

    return JSON.stringify(data);

  };

  window.iosInterface.getShareInfo = function () {
    var shareInfo = {
      title: window.shareTitle || "MAMA+|大V店",
      desc: window.descContent || "MAMA+|大V店",
      link: window.lineLink || window.location.href,
      imgUrl: window.imgUrl || "http://img.davdian.com/goods/1/20151017104524.png"
    };
    return JSON.stringify(shareInfo);
  };

  window.iosInterface.nativeWebviewBack = function () {
    window.bravetime.initHead();
  };
}

showIosInterface();

// require("../css/old_topic.css");

if($("a.tag").length){
  $(window).scroll(function(){
    var target;
    $("a.tag").each(function(index){
      var $el = $(this);
      var pos = $el.offset().top-$(window).scrollTop()-1;
      var lastPos = +$el.data("pos")||0;
      var name = $el.attr("name");
      if(pos<0){
        target =name;
      }
      $el.data("pos",pos);
    })
    target&&active(target);
  });

  function active(name){
    $(".top_other a").removeClass("active");
    console.log($(".top_other a[href='#"+name+"']"))
    $(".top_other a[href='#"+name+"']").addClass("active");
  }
}

