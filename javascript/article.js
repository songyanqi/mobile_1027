/*监听专题、文章页商品，决定是否出现购物车*/
/*
 *   存在class="goods-start"，则添加购物车浮层
 *   出现class="goods-start always-show"，则一直显示购物车；否则只有goods-start的层进入浏览器窗口50像素后才显示
 */
function statistics(obj, callback) {
  var host = '/appapi'
  var feedList = JSON.parse(localStorage.getItem('feedList'))
  var listData = {
    "ip": "",                             //ip
    "nxtime": "",                               //ng时间
    "timestamp": new Date().getTime(),                      //日志时间
    "production": '8',                         //业务线 数据字典稍后定
    "log_source": '1',                         //日志来源 数据字典稍后定
    "user_agent": navigator.userAgent,                     //浏览器UA
    "market": "",                         //来源市场
    "uid": parseInt(feedList.sess_key.substring(feedList.sess_key.length - 8, feedList.sess_key.length - 1), 10).toString(),      //用户id
    "session": feedList.sess_key.substring(0, feedList.sess_key.length - 8),                        //session id
    "status": feedList.visitor_status,                             //卖家状态 (0：游客 1:买家 3:卖家)
    "device": "",                         //设备类型
    "device_id": "",                      //设备号
    "sys_version": "",                    //设备版本号
    "resolution": window.screen.width + '*' + window.screen.height,      //分辨率
    "location": "",                       //当前位置
    "app_version": feedList.data_version || "",                    //APP版本号
    "action": '2',                             //操作action 数据字典稍后定，click，view，
    "action_type": "2",                    //操作类型（元素）
    "object_id": obj.objectId || "",                      //操作对象id（url）
    "production_data": {                     //详细信息
      "action": '2',                              //1：点击
      "action_type": "2",                       //1：模板
      "object_id": window.tj_id + "" || "",
      "share_type": obj.shareType
    }
  }
  try {
    $.ajax({
      url: host,
      type: "post",
      data: JSON.stringify(listData),
      success: function (result) {
        if (result == "success_1") {
          callback && callback()
        }
      }, error: function (e) {
        console.log(e)
      }
    });
  } catch (e) {
    console.error(e);
  }
}
window.tlShareCallback = function () {
  statistics({shareType: 1})
  $.post('/index.php?c=class&a=ajax_share&id=' + window.page_id, {}, function () {
    var share_num = parseInt($(".share-num").html());
    share_num = share_num + 1;
    $(".share-num").html(share_num);
  });
}
window.sendShareCallback = function () {
  statistics({shareType: 2})
  $.post('/index.php?c=class&a=ajax_share&id=' + window.page_id, {}, function () {
    var share_num = parseInt($(".share-num").html());
    share_num = share_num + 1;
    $(".share-num").html(share_num);
  });
}
window.QQShareCallback = function () {
  statistics({shareType: 4})
  $.post('/index.php?c=class&a=ajax_share&id=' + window.page_id, {}, function () {
    var share_num = parseInt($(".share-num").html());
    share_num = share_num + 1;
    $(".share-num").html(share_num);
  });
}
window.weiboShareCallback = function () {
  statistics({shareType: 7})
}
jQuery(document).ready(function ($) {
  var articleContent = $(".article-content");
  if ($(".article-container").length > 0) {
    if ($(".article-need-hide").length > 0) {
      var height = $(window).height();
      if (articleContent.height() > height) {
        articleContent.css("height", height + "px").css("position", "relative")
          .css("overflow", "hidden").append($("<div class='article-content-bottom'></div>"));
        $(".article-content-bottom").css("top", height - 50 + "px");
        $(".article-footer").before('<div class="article-show-more"><span>查看余下全文</span></div>');
        $(".article-show-more").find("span").click(function () {
          /* Act on the event */
          $(".article-show-more").remove();
          $(".article-content-bottom").remove();
          articleContent.css("height", "initial").css("overflow", "auto");

        });
      }
    }
    $(".follow_anchor").click(function () {
      var id = $(this).attr("data-for-anchor-id");

      if (id) {
        $.ajax({
          url: "/index.php?m=default&c=videoLive&a=follow",
          data: {userId: id},
          dataType: "json",
          type: "post",
          success: function (result) {
            if (result.code) {
              bravetime.info(result.msg);
            } else {
              bravetime.info("关注成功");
            }
          }, error: function () {
            bravetime.info("网络异常,请重试");
          }
        });
      }
    })
  }
  /*点赞操作*/
  // $(".point_praise").on("click",function(){
  //     var $this = $(this);
  //     var num = $this.parent().find(".praise_num").html();
  //     if(num == ''){
  //         num = 0;
  //     }else{
  //         num = +num;
  //     }
  //     if($this.hasClass("not_point_praise")){
  //         //添加点赞
  //         bravetime.addLoader({little: true});
  //         $.ajax({
  //             url: window.praiseUrl,
  //             dataType: "json",
  //             data: {
  //                 id: window.pageId,
  //                 collect: 1
  //             }, success: function (result) {
  //                 bravetime.removeLoader();
  //                 if (result["error"] == -1) {
  //                     window.nativeLoginFunction(result["url"]);
  //                 } else if (result["error"]) {
  //                     bravetime.info(result["msg"]);
  //                 } else {
  //                     num++;
  //                     $this.addClass("has_been_like").removeClass("not_point_praise").addClass("active_praise");
  //                     $this.parent().find(".praise_num").html(num);
  //                 }

  //             }, error: function () {
  //                 bravetime.removeLoader();
  //                 bravetime.ajaxError(36);
  //             }
  //         });
  //     }else{
  //         bravetime.info("您已经点赞了")
  //     }

  // });
  /*音频操作*/
  var $player = $("#player1");
  if ($player.length) {
    var musicUrl = $player.attr("data-music");
    var musicImgUrl = $player.attr("data-img");
    var ap1 = new APlayer({
      element: document.getElementById('player1'),
      narrow: false,
      autoplay: true,
      showlrc: false,
      music: {
        title: '',
        author: '',
        url: musicUrl,
        pic: musicImgUrl
      }
    });
    ap1.init();
  }
});


$(function () {
  if ($(".goods-start").length > 0) {
    $(window).scroll(function () {
      if ($(".always-show").length > 0) {
        $("#cart-fixed").show();
      } else {
        var goods_start_top = $(".goods-start").offset().top;
        var scroll_top = document.body.scrollTop;
        var window_height = $(window).height();

        if ((window_height + scroll_top - goods_start_top) > 60) {
          $("#cart-fixed").show();

        } else {
          $("#cart-fixed").hide();
        }
      }

    });

  }
  var add_to_cart_top, add_to_cart_left;

  $(".add-to-cart").on("click", function () {
    var good_id = parseInt($(this).attr("data-goodid"));
    var good_price = parseFloat($(this).attr("data-price"));
    var good_name = $(this).attr("data-name");
    if (good_id > 0) {
      add_to_cart_top = $(this).offset().top;
      add_to_cart_left = $(this).offset().left;
      var goods = {};
      var spec_arr = [];
      var number = 1;
      goods.quick = 1;
      goods.spec = spec_arr;
      goods.goods_id = good_id;
      goods.number = number;
      goods.sag_id = 0;
      goods.price = good_price;
      goods.name = good_name;
      $.post('index.php?m=default&c=flow&a=add_to_cart', { //url替换为：index.php?m=default&c=flow&a=add_to_cart
        goods: JSON.stringify(goods)
      }, function (data) {
        if (data.error > 0) {
          if (data.error == 2) {
            window.bravetime.newConfirm("商品已经在购物车中", {
              okText: "再逛逛",
              // okLink:"/", //点击再逛逛跳到的链接
              cancelText: "去购物车",
              cancelLink: "/cart.html" //点击去结算跳到的链接
            });
          } else {
            window.bravetime.newAlert(data.message);
          }
        } else {
          // 先ajax发送数据，成功后调用以下语句

          //向页面中追加移动的数字
          $("body").append('<div class="add-cart-num" style="top:' + add_to_cart_top + 'px;left:' + add_to_cart_left + 'px;color: #FFF;background: #FF4A7D;font-size: 12px;line-height: 16px;width: 16px;height: 16px;position:absolute;text-align: center;border-radius: 8px;">1</div>');
          //获取购物车位置
          var cartFix = $("#cart-fixed");
          var cart_top = cartFix.offset().top + 5;
          var cart_left = cartFix.offset().left + 29;

          var distance = Math.sqrt((cart_top - add_to_cart_top) * (cart_top - add_to_cart_top) + (cart_left - add_to_cart_left) * (cart_left - add_to_cart_left));

          var ani_second = parseInt((distance / 500) * 1000);

          $(".add-cart-num").animate({top: cart_top, left: cart_left}, ani_second, "swing", function () {
            //获取购物车目前数量
            $(".add-cart-num").remove();
            var cartGoodsNumberDom = $(".cart-good-num");
            if (parseInt(cartGoodsNumberDom.html()) > 0) {
              cartGoodsNumberDom.html(data["cart_number"]);
            } else {
              cartGoodsNumberDom.removeClass("hide");
              cartGoodsNumberDom.html(data["cart_number"]);
            }


          });

        }
      }, 'json');

    } else {
      alert("获取商品信息失败，请刷新页面重试！");
    }

  });

//文章页加载更多
  $(".article-more").on("click", function () {
    $(".article-more").hide();
    $(".article-loading").show();
    $.post(window.updateUrl, {
      page: page_num,
      sort: sort_type,
      pageSize: page_size,
      articleType: article_type
    }, function (data) {
      if (data.errorCode != 0) {
        alert("好像出了点问题，请重新试试！");
        $(".article-loading").hide();
        $(".article-more").show();
      } else {
        if (data.data.length > 0) {
          $.each(data.data, function (idx, article) {
            var li_text = '<a href="/a-' + article.id + '.html?wx=' + window["_from_wx"] + '">' +
              '<li class="clearfix">' +
              '    <div class="li-left pull-left">' +
              '        <div class="article-list-title">' + article.title + '</div>' +
              '        <div class="article-list-num">' +
              article["category_title"] + '  /  阅读 ' + article["read_times"] +
              '        </div>' +
              '    </div>' +
              '    <div class="li-right pull-right"><img src="' + article.image + '"/></div>' +
              '</li>' +
              '</a>';

            $(".article-list ul").append(li_text);
          });
          page_num = page_num + 1;

          $(".article-loading").hide();
          if (data["hasMore"]) {
            $(".article-more").show();
          } else {
            $(".article-none").show();
          }
        } else {
          $(".article-loading").hide();
          $(".article-none").show();
        }
      }
    }, "json");
  });


    var list = window.needTransDomainList || [];
    var allImg = $("img");
    allImg.each(function (i) {
        var $el = $(this);
        var imgSrc = $el.attr("src") || $el.attr("data-src");
        if (imgSrc && imgSrc.length) {
            var domain = imgSrc.replace('//', '').split("/")[0];
            if ($.inArray(domain, list) > -1) {
                var frame_id = 'frame_img' + i;
                window['image_call' + i] = '<img style="width: 100%" id="img" src=\'' + imgSrc + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frame_id + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script>';
                $el.after('<iframe style="width: 100%;" id="' + frame_id + '" src="javascript:parent.image_call' + i + ';" frameBorder="0" scrolling="no"></iframe>');
                $el.remove();
            }
        if (imgSrc.indexOf("speard.php") > -1) {
        var obj = {};
        var pa = imgSrc.split("?")[1].split("&");
        pa.forEach(function (p) {
          obj[p.split("=")[0]] = p.split("=")[1];
        })
        $.ajax({
          url: "/images/api/speard/index?redirect_flag=0",
          data: obj,
          type : 'POST',
          dataType: "json",
          success: function (result) {
            if(!+result.code){
              $el.attr("src", result.data.url);
            }
          }
        })
      }}
    });

  $(".need_add_host").each(function () {
    var src = $(this).attr("src")
    $(this).attr("src", src + "&host=" + (location.href.split("/").length && location.href.split("/")[2]))
  })

  window.iosInterface.nativeWebviewBack = function () {
    window.bravetime.initHead();
  }
});

