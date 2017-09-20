var js = document.scripts;
for (var i = 0; i < js.length; i++) {
  var src = js[i].src;
  if (src.indexOf("topic.js") > -1) {
    var baseFeUrl = src.substring(0, src.indexOf('/javascript/topic.js'));
    window.baseFeUrl = baseFeUrl;
  }
}


var getGoodsInfoUrl = window.getGoodsInfoUrl;

//新增逻辑angular实现
var app = angular.module("topicApp", []);

app.controller('MainController', ['$scope', '$timeout', function ($scope, $timeout) {
  window.dataStr = window.dataStr.replace(/\\"/g, "\\'");
  $scope.theme = JSON.parse(window.dataStr);
  $scope.theme.mode = 'show';
  $timeout(function () {
    // 滑动
    if ($(".anchor-menu").length) {
      var lis = $(".anchor-menu").find("li");

      var length = lis.length;

      var w = 0;
      for (var i = 0; i < length; i++) {
        w += $(lis[i]).outerWidth();
      }
      var conf = {slidesPerView: 'auto'};
      if (w < $(".anchor-menu").width()) {
        $(".anchor-menu").addClass("table-like")
      } else {
        $(".anchor-menu ul").append("<li class='swiper-slide'></li>")
        window.anchorMenu = $scope.menu = new Swiper('.anchor-menu', conf);
        $(".navigation_container").append("<div class='unfold unfold_show'></div>");
        $(".unfold_show").on("click", function () {
          console.log("show");
        })
      }


      $(document).on("click", ".anchor-menu li", function () {
        $(".anchor-menu li").removeClass("hover");
        $(this).addClass("hover");
        var index = $(this).attr("data-index");
        $scope.menu && $scope.menu.slideTo(Math.max(0, index - 2), 1000);
        var tag = $(this).find("a").attr("data-href").replace("#", "");
        var toTarget = $('[name=' + tag + ']').get(0);
        var toTop = $(toTarget).offset().top;
        if (Units.isApp()) {
          window.scrollTo(0, toTop - 42);
        } else {
          window.scrollTo(0, toTop - 88);
        }

      })


    }

    function getDataForGoods(index) {

      var cur = $(".g_").get(index);
      var top = document.body.scrollTop;
      var gTop = $(cur).offset().top;
      if (gTop - top - window.innerHeight < 300 && !$(cur).hasClass("finish")) {
        $(cur).addClass("finish");
        var $this = $(cur);
        var g = $(cur).attr("data-g");
        $scope.theme.list.forEach(function (obj) {
          if (obj.goods&& obj.goods.length && +obj.goods.split(",")[0] === +g) {
            $.ajax({
              url: getGoodsInfoUrl,
              dataType: "json",
              type: "POST",
              data: {
                list: obj.goods,
                table: "goods_id,goods_name,shop_price,goods_img",
                topic_id: window.topic_id
              }, success: function (result) {

                if (!result.code) {
                  obj.goodsDetail = result.data;
                  obj.topic_id = window.topic_id;
                  obj.referer = result.referer;
                  var list = [], str = "";
                  if (obj.referer) {
                    for (var i in obj.referer) {
                      list.push(i + "=" + obj.referer[i]);
                    }
                  }
                  if (list.length) {
                    str = "?" + list.join("&");
                  }
                  obj.referer_str = str;

                  sessionStorage.setItem(obj.goods, JSON.stringify(obj.goodsDetail));
                  sessionStorage.setItem("new_topic_refer_str",obj.referer_str);


                  $scope.$apply();
                  $timeout(function () {
                    console.log("ok");
                    $this.find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100})
                    getDataForGoods(index+1);
                  }, 100)


                }
              }, error: function () {
                console.log("err", arguments);
              }
            });
          }
        });
      }
    }
    getDataForGoods(0);

  }, 500);
  $scope.anchorClick = function () {
    console.log(arguments)
  }
}]);

app.directive('themePreview', ["$sce", "$timeout", function ($sce, $timeout) {
  var url = $sce.trustAsResourceUrl(window.baseFeUrl + "/module/item_preview.html");
  return {
    restrict: "EA",
    // templateUrl: url,
    template:"<div><div ng-repeat=\"(key,item) in ngModel.list track by $index\" name=\"{{item.anchor|base}}\" ng-class=\"{'theme-item':true,'anchor-item':item.id==19 ,'g_':item.goods&&item.goods.length>0}\" data-g=\"{{item.goods.split(',')[0]}}\"><div ng-if=\"item.id==1\" class=\"img_container\" style=\"position:relative\"><img ng-src=\"{{item.imgUrl}}\" style=\"width:100%\"><div link-modify-watch ng-model=\"item\" style=\"position:absolute;bottom:6px;right:8px;font-size:12px;line-height:30px;cursor:pointer;color:#0076FF;background:#fff;padding:0 8px\" ng-if=\"!ngModel.mode\">修改跳转链接</div><input style=\"position:absolute;bottom:5px;left:0;width:200px\" type=\"file\" nv-file-select uploader=\"uploader({{key}})\" ng-if=\"!ngModel.mode\"> <a ng-if=\"ngModel.mode=='show'&&item.link&&item.link.length>0\" href=\"{{item.link}}\" style=\"width:100%;height:100%;position:absolute;top:0;left:0\"></a></div><div ng-if=\"item.id==2\" class=\"goods_container\" style=\"overflow:hidden;padding:5px\" goods-click-watch><a style=\"padding:5px;float:left;width:50%;box-sizing:border-box\" ng-repeat=\"i in [1,2,3,4]\" ng-if=\"!item.goodsDetail.length&&!ngModel.mode\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" src=\"//pic.davdian.com/free/goods_exa.png\"><div class=\"goods_title\" style=\"overflow:hidden;color:#666;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;text-align:center\">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:1.5;text-align:center\"><span class=\"price\" style=\"color:#FF4A7D\">¥128.00</span> <span class=\"label\">六折</span></div></div></a> <a style=\"padding:5px;float:left;width:50%;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length&&(!ngModel.mode||ngModel.mode=='preview')\"><div class=\"goods_item\" style=\"font-size:12px;line-height:16px\"><img style=\"width:100%\" ng-src=\"{{goodsInfo.goods_img}}\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:4px 6px 0;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;color:#666;text-align:center\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"margin:4px 0;line-height:20px;font-size:14px;text-align:center\"><span class=\"price\" style=\"color:#FF4A7D\">¥{{goodsInfo.shop_price}}</span>  <span class=\"label\" ng-if=\"goodsInfo.goods_label&&goodsInfo.goods_label.length\">{{goodsInfo.goods_label}}</span></div></div></a> <a style=\"padding:5px;float:left;width:50%;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length&&ngModel.mode=='show'\" href=\"/{{goodsInfo.goods_id}}.html{{item.referer_str}}\"><div class=\"goods_item\" style=\"font-size:12px;line-height:16px\"><img style=\"width:100%\" data-original=\"{{goodsInfo.goods_img}}\" src=\"http://pic.davdian.com/free/loading_320_320_v2.png\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:4px 6px 0;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;color:#666;text-align:center\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"margin:4px 0;line-height:20px;font-size:14px;text-align:center\"><span class=\"price\" style=\"color:#FF4A7D\">¥{{goodsInfo.shop_price}}</span>  <span class=\"label\" ng-if=\"goodsInfo.goods_label&&goodsInfo.goods_label.length\">{{goodsInfo.goods_label}}</span></div></div></a></div><div ng-if=\"item.id==3\" class=\"goods_container\" style=\"overflow:hidden;padding:5px\" goods-click-watch><a style=\"padding:5px;float:left;width:50%;box-sizing:border-box\" ng-repeat=\"i in [1,2,3,4]\" ng-if=\"!item.goodsDetail.length&&!ngModel.mode\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" src=\"//pic.davdian.com/free/goods_exa.png\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:20px\"><span class=\"price\" style=\"color:#d83c6b\">¥128.00</span> <span style=\"float:right;background-color:#d83c6b;color:#fff;padding:0 5px;border-radius:2px\">立即购买</span></div></div></a> <a style=\"padding:5px;float:left;width:50%;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length&&(!ngModel.mode||ngModel.mode=='preview')\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" src=\"{{goodsInfo.goods_img}}\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:20px\"><span class=\"price\" style=\"color:#d83c6b\">¥{{goodsInfo.shop_price}}</span> <span style=\"float:right;background-color:#d83c6b;color:#fff;padding:0 5px;border-radius:2px\">立即购买</span></div></div></a> <a style=\"padding:5px;float:left;width:50%;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length&&ngModel.mode=='show'\" href=\"/{{goodsInfo.goods_id}}.html{{item.referer_str}}\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" data-original=\"{{goodsInfo.goods_img}}\" src=\"http://pic.davdian.com/free/loading_320_320_v2.png\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:20px\"><span class=\"price\" style=\"color:#d83c6b\">¥{{goodsInfo.shop_price}}</span> <span style=\"float:right;background-color:#d83c6b;color:#fff;padding:0 5px;border-radius:2px\">立即购买</span></div></div></a></div><div ng-if=\"item.id==4||item.id==25\" ng-class=\"{'goods_container':true,'goods_cross':true,'goods_cross2':item.id==4}\" class=\"goods_container goods_cross\" style=\"overflow:hidden\" goods-click-watch><a ng-repeat=\"i in [1,2]\" ng-if=\"!item.goodsDetail.length&&!ngModel.mode\"><img ng-src=\"//pic.davdian.com/free/goods_exa.png\" alt=\"\"><div class=\"goods_info\"><div class=\"goods_title\">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div><div class=\"goods_price_outer\"><span class=\"price\">¥199.00</span> <span class=\"label\">六折</span></div></div></a> <a ng-repeat=\"(goodsIndex,goodsInfo) in item.goodsDetail\" ng-if=\"item.goodsDetail.length\" ng-href=\"{{(ngModel.mode&&ngModel.mode=='show')?('/'+goodsInfo.goods_id+'.html'+item.referer_str):'javascript::void()'}}\"><img data-original=\"{{goodsInfo.goods_img}}\" src=\"http://pic.davdian.com/free/loading_320_320_v2.png\" alt=\"\"><div class=\"goods_info\"><div class=\"goods_title\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\"><span class=\"price\">¥{{goodsInfo.shop_price}}</span> <span class=\"label\" ng-if=\"goodsInfo.goods_label&&goodsInfo.goods_label.length\">{{goodsInfo.goods_label}}</span></div></div></a></div><div ng-if=\"item.id==5\" class=\"title_container\" style=\"text-align:center;margin:10px 0\"><span class=\"title_left\" style=\"margin-right:5px;display:inline-block;width:50px;height:1px;background-color:#ec6890;vertical-align:middle\"></span> <span class=\"title\" contenteditable=\"plaintext-only\" ng-keyup=\"ngModel.changeSpan($event,key)\" style=\"line-height:20px;font-size:14px;background:#ec6890;border-radius:10px;display:inline-block;padding:0 10px;color:#fff\" ng-if=\"!ngModel.mode\">{{item.con||'请输入文字'}}</span> <span class=\"title\" style=\"line-height:20px;font-size:14px;background:#ec6890;border-radius:10px;display:inline-block;padding:0 10px;color:#fff\" ng-if=\"ngModel.mode=='preview'||ngModel.mode=='show'\">{{item.con}}</span> <span class=\"title_right\" style=\"margin-left:5px;display:inline-block;width:50px;height:1px;background-color:#ec6890;vertical-align:middle\"></span></div><div ng-if=\"item.id==6\" class=\"title_container\" style=\"text-align:center;margin:10px 0\"><span class=\"title_left\" style=\"margin-right:5px;display:inline-block;width:50px;height:1px;background-color:#333;vertical-align:middle\"></span> <span class=\"title\" contenteditable=\"plaintext-only\" ng-keyup=\"ngModel.changeSpan($event,key)\" style=\"line-height:20px;font-size:14px;border-radius:10px;display:inline-block;padding:0 10px\" ng-if=\"!ngModel.mode\">{{item.con||'请输入文字'}}</span> <span class=\"title\" style=\"line-height:20px;font-size:14px;border-radius:10px;display:inline-block;padding:0 10px\" ng-if=\"ngModel.mode=='preview'||ngModel.mode=='show'\">{{item.con||'请输入文字'}}</span> <span class=\"title_right\" style=\"margin-left:5px;display:inline-block;width:50px;height:1px;background-color:#333;vertical-align:middle\"></span></div><div ng-if=\"item.id==7\" class=\"title_container\" style=\"text-align:center;margin:10px 0\"><span class=\"title\" contenteditable=\"plaintext-only\" ng-keyup=\"ngModel.changeSpan($event,key)\" style=\"line-height:20px;font-size:14px;display:inline-block;border-bottom:#333 2px solid;padding:0 10px\" ng-if=\"!ngModel.mode\">{{item.con||'标题'}}</span> <span class=\"title\" style=\"line-height:20px;font-size:14px;display:inline-block;border-bottom:#333 2px solid;padding:0 10px\" ng-if=\"ngModel.mode=='preview'||ngModel.mode=='show'\">{{item.con||'标题'}}</span></div><div ng-if=\"item.id==8\" class=\"text_container\" style=\"padding:6px 12px\"><textarea class=\"container\" style=\"width:100%;color:#333;display:block;font-size:14px;line-height:20px\" ng-if=\"!ngModel.mode\" ng-model=\"item.con\"></textarea><p class=\"container\" ng-if=\"ngModel.mode\" ng-model=\"item\" style=\"box-sizing:border-box;padding:0 12px;width:100%;color:#333;font-size:14px;line-height:20px\" ng-bind-html=\"item.con|to_trusted\"></p></div><div ng-if=\"item.id==9\" class=\"btn_container\"><div style=\"text-align:center;margin:20px\"><span contenteditable=\"plaintext-only\" style=\"color:#d73c6b;border:1px solid #d73c6b;padding:5px 20px;border-radius:3px\" ng-model=\"item\" ng-if=\"!ngModel.mode\" ng-keyup=\"ngModel.changeSpan($event,key)\">{{item.con||'回到首页'}}</span><div link-modify-watch ng-model=\"item\" style=\"position:absolute;bottom:-8px;left:8px;font-size:12px;line-height:30px;cursor:pointer;color:#0076FF;background:#eee;padding:0 8px\" ng-if=\"!ngModel.mode\">修改链接</div><a style=\"text-decoration:inherit;color:#d73c6b;border:1px solid #d73c6b;padding:5px 20px;border-radius:3px\" ng-model=\"item\" ng-if=\"ngModel.mode=='preview'\">{{item.con}}</a> <a style=\"text-decoration:inherit;color:#d73c6b;border:1px solid #d73c6b;padding:5px 20px;border-radius:3px\" ng-model=\"item\" href=\"{{item.link}}\" ng-if=\"ngModel.mode=='show'\">{{item.con}}</a></div></div><div ng-if=\"item.id==10\" class=\"goods_container\" style=\"overflow:hidden;padding:5px\" ng-model=\"item.goods\" goods-click-watch><a style=\"padding:5px;box-sizing:border-box\" ng-repeat=\"i in [1,2]\" ng-if=\"!item.goodsDetail.length&&!ngModel.mode\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" src=\"//pic.davdian.com/free/goods_exa.png\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;color:#666;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:20px\"><span class=\"price\" style=\"color:#FF4A7D\">¥128.00</span> <span style=\"margin-left:5px;text-decoration:line-through;color:#666\">¥338.00</span> <span style=\"float:right;background-color:#FF4A7D;color:#fff;padding:0 5px;border-radius:2px\">立即购买</span></div></div></a> <a style=\"padding:5px;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length&&(!ngModel.mode||ngModel.mode=='preview')\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" src=\"{{goodsInfo.goods_img}}\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:20px\"><span class=\"price\" style=\"color:#FF4A7D\">¥{{goodsInfo.shop_price}}</span> <span style=\"margin-left:5px;text-decoration:line-through;color:#666\">¥{{goodsInfo.market_price}}</span> <span style=\"float:right;background-color:#FF4A7D;color:#fff;padding:0 5px;border-radius:2px\">立即购买</span></div></div></a> <a style=\"padding:5px;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length&&ngModel.mode=='show'\" href=\"/{{goodsInfo.goods_id}}.html{{item.referer_str}}\"><div class=\"goods_item\" style=\"border:#f1f1f1 1px solid;font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" data-original=\"{{goodsInfo.goods_img}}\" src=\"http://pic.davdian.com/free/loading_320_320_v2.png\"><div class=\"goods_title\" style=\"overflow:hidden;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:20px\"><span class=\"price\" style=\"color:#FF4A7D\">¥{{goodsInfo.shop_price}}</span> <span style=\"margin-left:5px;text-decoration:line-through;color:#666\">¥{{goodsInfo.market_price}}</span> <span style=\"float:right;background-color:#FF4A7D;color:#fff;padding:0 5px;border-radius:2px\">立即购买</span></div></div></a></div><div class=\"tab_container\" tab-watch ng-if=\"item.id==11\"><ul class=\"topic_menu\" ng-if=\"!ngModel.mode&&!item.tab.length\"><li class=\"hover\"><a>经典绘本</a></li><li><a>成长必读</a></li><li><a>爱的启蒙</a></li><li><a>亲子阅读</a></li></ul><ul class=\"topic_menu\" ng-if=\"(!ngModel.mode||ngModel.mode=='preview')&&item.tab.length\"><li class=\"{{(i==item.active)&&'hover'}}\" ng-repeat=\"(i,k) in item.tab\" ng-if=\"k.title&&k.link&&k.title.length\"><a>{{k.title}}</a></li></ul><ul class=\"topic_menu\" ng-if=\"(ngModel.mode=='show')&&item.tab.length\"><li class=\"{{(i==item.active)&&'hover'}}\" ng-repeat=\"(i,k) in item.tab\" ng-if=\"k.title&&k.link&&k.title.length\"><a href=\"{{k.link}}\">{{k.title}}</a></li></ul></div><div class=\"video_container\" ng-if=\"item.id==12\"><img src=\"{{item.showImg}}\" style=\"width:100%\" ng-if=\"!item.link||item.link==''\"><div ng-bind-html=\"item.link|to_trusted\" ng-if=\"item.link&&item.link.length\"></div><div video-modify-watch ng-model=\"item\" style=\"position:absolute;bottom:6px;right:8px;font-size:12px;line-height:30px;cursor:pointer;color:#0076FF;background:#fff;padding:0 8px\" ng-if=\"!ngModel.mode\">修改视频地址</div></div><div class=\"people_container\" ng-if=\"item.id==14||item.id==15\" style=\"padding:12px;text-align:center\"><input ng-if=\"!ngModel.mode\" style=\"position:absolute;top:5px;background:red;width:100px;height:100px;cursor:pointer;opacity:0\" type=\"file\" nv-file-select uploader=\"uploader({{key}})\" ng-if=\"!ngModel.mode\"> <img src=\"{{item.imgUrl||'//pic.davdian.com/free/default_head_icon_0419.png'}}\" style=\"width:100px;height:100px;border-radius:10px\"><div class=\"intro_container\" style=\"border-radius:7px;border:#ddd solid 1px;position:relative\"><span class=\"people_tag\" style=\"\">{{item.id==14?'超级大V说':'大V妈妈'}}</span><div ng-keyup=\"ngModel.changeSpan($event,key,'name')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"margin-top:16px;font-size:16px;color:#333\">{{item.name||'人物姓名'}}</div><div ng-keyup=\"ngModel.changeSpan($event,key,'sf')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"line-height:32px;font-size:14px;color:#666\">{{item.sf||'职业:作家、教授、老师等'}}</div><div class=\"info\" style=\"position:relative;text-align:left;padding:0 6px;font-size:12px;line-height:1.5\"><span style=\"position:absolute\">{{item.id==14?'人物简介:':'妈妈感想:'}}</span><p ng-keyup=\"ngModel.changeSpan($event,key,'info')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"text-indent:5em;margin:0 0 6px;color:#666\">{{item.info||(item.id==14?'输入相关人物的简介,100字以内;输入相关人物的简介,100字以内;输入相关人物的简介,100字以内;':'输入相关人物的介绍,感想等,100字以内')}}</p></div><div class=\"works\" style=\"position:relative;text-align:left;padding:0 6px;font-size:12px;line-height:1.5\"><span style=\"position:absolute\">{{item.id==14?'代表作品:':'她的店铺:'}}</span><p ng-if=\"item.id==14\" ng-keyup=\"ngModel.changeSpan($event,key,'works')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"text-indent:5em;margin:0 0 6px;color:#d73c6b\">{{item.works||'《作品名称1》《作品名称2》《作品名称3》《作品名称4》'}}</p><a ng-if=\"item.id==15&&(!ngModel.mode||ngModel.mode=='preview')\" class=\"underline\" ng-keyup=\"ngModel.changeSpan($event,key,'works')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"text-indent:5em;margin:0 0 6px;display:inline-block;color:#d73c6b\">{{item.works||'XXX的店铺'}}</a> <a href=\"{{item.link}}\" ng-if=\"item.id==15&&(ngModel.mode=='show')\" class=\"underline\" style=\"text-indent:5em;margin:0 0 6px;color:#d73c6b;display:inline-block\">{{item.works||'XXX的店铺'}}</a><div link-modify-watch ng-model=\"item\" style=\"display:inline-block;font-size:12px;cursor:pointer;color:#0076FF;background:#fff;padding:0 8px\" ng-if=\"!ngModel.mode&&item.id==15\">修改跳转链接</div></div></div></div><div class=\"people_container\" ng-if=\"item.id==16||item.id==17\" style=\"margin:12px;position:relative;border:#eee solid 1px;font-size:0\"><div class=\"people_left\" style=\"text-align:center;width:35%;padding:10px;box-sizing:border-box;display:inline-block\"><div class=\"img_container\" style=\"position:relative;overflow:hidden\"><input ng-if=\"!ngModel.mode\" style=\"position:absolute;top:0;background:red;bottom:0;left:0;right:0;cursor:pointer;opacity:0\" type=\"file\" nv-file-select uploader=\"uploader({{key}})\" ng-if=\"!ngModel.mode\"> <img src=\"{{item.imgUrl||'//pic.davdian.com/free/default_head_icon_0419.png'}}\" style=\"width:100%;border-radius:10px\"></div><div ng-keyup=\"ngModel.changeSpan($event,key,'name')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"margin-top:14px;font-size:14px;color:#333\">{{item.name||'人物姓名'}}</div><div ng-keyup=\"ngModel.changeSpan($event,key,'sf')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"line-height:16px;font-size:12px;color:#666;margin:6px 0\">{{item.sf||'职业:作家、教授、老师等'}}</div></div><div class=\"people_right\" style=\"display:inline-block;padding-top:12px;vertical-align:top;width:65%\"><div class=\"info\" style=\"position:relative;text-align:left;padding:0 6px;font-size:12px;line-height:1.5\"><span style=\"position:absolute\">{{item.id==16?'人物简介:':'妈妈感想:'}}</span><p ng-keyup=\"ngModel.changeSpan($event,key,'info')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"text-indent:5em;margin:0 0 6px;color:#666\">{{item.info||(item.id==16?'输入相关人物的简介,100字以内;输入相关人物的简介,100字以内;输入相关人物的简介,100字以内;':'输入相关人物的介绍,感想等,100字以内')}}</p></div><div class=\"works\" style=\"position:relative;text-align:left;padding:0 6px;font-size:12px;line-height:1.5\"><span style=\"position:absolute\">{{item.id==16?'代表作品:':'她的店铺:'}}</span><p ng-if=\"item.id==16\" ng-keyup=\"ngModel.changeSpan($event,key,'works')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"text-indent:5em;margin:0 0 6px;color:#d73c6b\">{{item.works||'《作品名称1》《作品名称2》《作品名称3》《作品名称4》'}}</p><a ng-if=\"item.id==17&&(!ngModel.mode||ngModel.mode=='preview')\" class=\"underline\" ng-keyup=\"ngModel.changeSpan($event,key,'works')\" contenteditable=\"{{!ngModel.mode?'plaintext-only':'false'}}\" style=\"text-indent:5em;margin:0 0 6px;display:inline-block;color:#d73c6b\">{{item.works||'XXX的店铺'}}</a> <a href=\"{{item.link}}\" ng-if=\"item.id==17&&(ngModel.mode=='show')\" class=\"underline\" style=\"text-indent:5em;margin:0 0 6px;color:#d73c6b;display:inline-block\">{{item.works||'XXX的店铺'}}</a><div link-modify-watch ng-model=\"item\" style=\"display:inline-block;font-size:12px;cursor:pointer;color:#0076FF;background:#fff;padding:0 8px\" ng-if=\"!ngModel.mode&&item.id==17\">修改跳转链接</div></div></div></div><div ng-if=\"item.id==18\" class=\"goods_container\" style=\"overflow:hidden;padding:5px\" goods-click-watch><a style=\"padding:3px;float:left;width:33.3333%;box-sizing:border-box\" ng-repeat=\"i in [1,2,3,4,5,6]\" ng-if=\"!item.goodsDetail.length&&!ngModel.mode\"><div class=\"goods_item\" style=\"font-size:12px;line-height:16px\"><img style=\"width:100%;border-bottom:#f8f8f8 solid 1px\" src=\"//pic.davdian.com/free/goods_exa.png\"><div class=\"goods_title\" style=\"overflow:hidden;color:#666;height:32px;margin:0 6px;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box\">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div><div class=\"goods_price_outer\" style=\"margin:10px;line-height:1.5;text-align:center\"><span class=\"price\" style=\"color:#FF4A7D\">¥128.00</span> </div></div></a> <a style=\"padding:3px;float:left;width:33.3333%;box-sizing:border-box\" ng-repeat=\"goodsInfo in item.goodsDetail\" ng-if=\"item.goodsDetail.length\" ng-href=\"{{(ngModel.mode&&ngModel.mode=='show')?('/'+goodsInfo.goods_id+'.html'+item.referer_str):'javascript::void()'}}\"><div class=\"goods_item\" style=\"font-size:12px;line-height:16px\"><img style=\"width:100%\" data-original=\"{{goodsInfo.goods_img}}\" src=\"http://pic.davdian.com/free/loading_320_320_v2.png\"><div class=\"goods_title\" style=\"color:#666;overflow:hidden;height:32px;margin:4px 6px 0;-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;text-align:center\">{{goodsInfo.goods_name}}</div><div class=\"goods_price_outer\" style=\"text-align:center;margin:6px;line-height:20px\"><span class=\"price\" style=\"color:#FF4A7D;font-size:14px\">¥{{goodsInfo.shop_price}}</span>  </div></div></a></div><div class=\"navigation_container\" navigation-watch ng-if=\"item.id==19\"><ul class=\"navigation_menu\" ng-if=\"!item.tab.length&&!ngModel.mode\"><li><span>导航1</span></li><li><span>导航2</span></li><li><span>导航3</span></li><li><span>导航4</span></li></ul><ul class=\"navigation_menu\" ng-if=\"item.tab.length&&!ngModel.mode\"><li ng-repeat=\"(i,k) in item.tab\"><span>{{k}}</span></li></ul><div class=\"swiper-container anchor-menu\" ng-if=\"ngModel.mode=='show'\"><ul class=\"swiper-wrapper\"><li class=\"swiper-slide\" ng-repeat=\"(i,k) in item.tab track by $index\" ng-class=\"{'swiper-wrapper':true,'hover':i==item.active}\" data-index=\"{{i}}\"><span><a data-href=\"#{{k|base}}\">{{k}}</a></span></li></ul></div></div><div ng-if=\"item.id==20\" style=\"background:#FFF9E3;height:44px\" navigation-title-watch><div class=\"titText\" style=\"background:#FFF9E3;height:44px;text-align:center;font-size:18px;line-height:44px;color:#F3A100\"><span style=\"margin-right:20px;font-size:14px\">//</span>{{item.navigationTitle||'标题设置'}}<span style=\"margin-left:20px;font-size:14px\">//</span></div></div><div ng-if=\"item.id==21\" style=\"background:#F5FEFF;height:44px\" navigation-title-watch><div class=\"titText\" style=\"background:#F5FEFF;height:44px;text-align:center;font-size:18px;line-height:44px;color:#26B6F9\"><span style=\"margin-right:20px;font-size:14px\">//</span>{{item.navigationTitle||'标题设置'}}<span style=\"margin-left:20px;font-size:14px\">//</span></div></div><div ng-if=\"item.id==22\" style=\"background:#FDF6FF;height:44px\" navigation-title-watch><div class=\"titText\" style=\"background:#FDF6FF;height:44px;text-align:center;font-size:18px;line-height:44px;color:#DA7AF2\"><span style=\"margin-right:20px;font-size:14px\">//</span>{{item.navigationTitle||'标题设置'}}<span style=\"margin-left:20px;font-size:14px\">//</span></div></div><div ng-if=\"item.id==23\" style=\"background:#FFEDF2;height:44px\" navigation-title-watch><div class=\"titText\" style=\"background:#FFEDF2;height:44px;text-align:center;font-size:18px;line-height:44px;color:#FF4A7D\"><span style=\"margin-right:20px;font-size:14px\">//</span>{{item.navigationTitle||'标题设置'}}<span style=\"margin-left:20px;font-size:14px\">//</span></div></div><div ng-if=\"item.id==24\" style=\"background:#fff\" empty-click-watch><div ng-if=\"!ngModel.mode\" style=\"height:30px;border:1px solid #333;line-height:30px;text-align:center\">设置留白高度</div><div ng-if=\"ngModel.mode=='preview'||ngModel.mode=='show'\" ng-style=\"{height:item.value}\"></div></div><div class=\"handle_group\" ng-if=\"!ngModel.mode\"><div class=\"handle_btn anchor\" anchor-watch ng-if=\"item.id!=19\"></div><div class=\"handle_btn up\" up-watch></div><div class=\"handle_btn down\" down-watch></div><div class=\"close\" close-watch></div></div></div></div>",
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '='
    },
    link: function (scope) {
      var flag = true;
      scope.ngModel.list.forEach(function (obj) {
        if (obj.goods && obj.goods.length) {
          obj.goodsDetail=[]
          if (!isPrivateMode) {
            var patharr = JSON.parse(sessionStorage.history);
            var ua = navigator.userAgent.toLowerCase();
            if (patharr.length > 2) {
              var lastPath = patharr[patharr.length - 2].path;
              if (lastPath == 'detail') {

                obj.goodsDetail = eval(sessionStorage.getItem(obj.goods));
                obj.referer_str = sessionStorage.getItem("new_topic_refer_str");


                setTimeout(function () {
                  document.body.scrollTop = eval(sessionStorage.getItem('topic_Top'));
                }, 100);
                flag = false;
              } else {
                // 清空数据
                flag = true;
                sessionStorage.removeItem(obj.goods);
                sessionStorage.removeItem("topicTop");
              }
            }
          }
          ;

          /*if(flag){
           $.ajax({
           url: getGoodsInfoUrl,
           dataType: "json",
           type:"POST",
           data: {
           list: obj.goods,
           table: "goods_id,goods_name,shop_price,goods_img",
           topic_id:window.topic_id
           }, success: function (result) {

           if(!result.code){
           obj.goodsDetail = result.data;
           obj.topic_id = window.topic_id;
           obj.referer = result.referer;
           var list = [],str="";
           if(obj.referer){
           for(var i in obj.referer){
           list.push(i+"="+obj.referer[i]);
           }
           }
           if(list.length){
           str = "?"+list.join("&");
           }
           obj.referer_str = str;

           sessionStorage.setItem(obj.goods,JSON.stringify(obj.goodsDetail));


           scope.$apply();
           $timeout(function(){
           console.log("ok");
           $("img[data-original]").lazyload({effect: "fadeIn", threshold: 100})
           },100)


           }
           }, error: function () {
           console.log("err", arguments);
           }
           });
           }*/

        }
      });





      $(window).scroll(function () {
        $(".g_").each(function () {
          var top = document.body.scrollTop;
          var gTop = $(this).offset().top;
          if (gTop - top -window.innerHeight < 300 && !$(this).hasClass("finish")) {
            console.log("---------")
            $(this).addClass("finish");
            var $this = $(this);
            var g = $(this).attr("data-g");
            scope.ngModel.list.forEach(function (obj) {
              if (flag && obj.goods&& obj.goods.length && +obj.goods.split(",")[0] === +g) {
                $.ajax({
                  url: getGoodsInfoUrl,
                  dataType: "json",
                  type: "POST",
                  data: {
                    list: obj.goods,
                    table: "goods_id,goods_name,shop_price,goods_img",
                    topic_id: window.topic_id
                  }, success: function (result) {

                    if (!result.code) {
                      obj.goodsDetail = result.data;
                      obj.topic_id = window.topic_id;
                      obj.referer = result.referer;
                      var list = [], str = "";
                      if (obj.referer) {
                        for (var i in obj.referer) {
                          list.push(i + "=" + obj.referer[i]);
                        }
                      }
                      if (list.length) {
                        str = "?" + list.join("&");
                      }
                      obj.referer_str = str;

                      sessionStorage.setItem(obj.goods, JSON.stringify(obj.goodsDetail));
                      sessionStorage.setItem("new_topic_refer_str",obj.referer_str);


                      scope.$apply();
                      $timeout(function () {
                        console.log("ok");
                        $this.find("img[data-original]").lazyload({effect: "fadeIn", threshold: 100})
                      }, 100)


                    }
                  }, error: function () {
                    console.log("err", arguments);
                  }
                });
              }
            });
          }
        });
      });

      $timeout(function () {
        $("img[data-original]").lazyload({effect: "fadeIn", threshold: 100})
        scrollTo(0, window.scrollY + 1);

      }, 100)
    }
  }
}]);

// html 过滤器
app.filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}]);

app.filter("base", function () {
  return function (str) {
    if (str) {
      return encodeURI(str).toString().replace(/%/g, "");
    } else {
      return 'no_anchor_' + Math.floor(Math.random() * 1000)
    }

  }
});

//lazyload库
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

//原本的逻辑jquery实现
$(function () {

  $(window).scroll(function () {//滚动条滚动事件
    var navCon = $(".navigation_container");
    var top = document.body.scrollTop;
    var navOuter = $(".anchor-item");
    var topCon = $(".anchor-fix-container");
    if (navCon.length && navOuter.length) {
      // 切换导航条位置
      var navTop = navOuter.offset().top - top;
      // 滑到最顶部改为固定
      if (navTop < 0) {
        navCon.remove();
        topCon.append(navCon);
      } else if (navTop > 40) {
        navCon.remove();
        navOuter.append(navCon);
      }
      $(".unfold_show").on("click", function () {
        console.log("show");
      })

      // 切换选中导航标签
      var target, initTarget = $($(".theme-item").get(0)).attr("name");
      $(".theme-item").each(function (i, d) {
        var item = $(d), id = item.attr("name");
        if (id && id.indexOf("no_anchor") == -1) {
          var itemTop = window.scrollY - item.offset().top;
          if (itemTop > -120) {
            target = id;
          }
        }
      });

      if (target) {
        if (target.indexOf("no_anchor") > -1) {
          target = initTarget;
        }
        navCon.find("li").each(function (i, d) {
          var item = $(d);
          if (item.find("a").attr("data-href") == "#" + target) {
            item.addClass("hover");
            window.anchorMenu && anchorMenu.slideTo(Math.max(0, i - 2), 1000);
          } else {
            item.removeClass("hover");
          }
        })
      }
    } else {

    }
    $(".fold").remove();
    if (window.disabledGoodsLoading) {
      return false;
    }

    sessionStorage.setItem('goodTop', top);
  });

  init();

  /**
   * 初始化
   */
  function init() {
    judgeApp();
    // top();
    initData();
    lazyLoad(); //延迟加载图片
    showIosInterface(); //给app提供接口
    addShareButtonListener();
    initAnchor();
    if (window.wx) {
      initShareModel(); //初始化分享模块
      addShareListener(); // 增加对分享的监听
    }


  }

  function initAnchor() {
    $(document).on("click", ".unfold_show", function () {
      var mask = $("<div class='mask'></div>");
      var navCon = $(".navigation_container");
      var lis = navCon.find("li");
      var navOuter = $(".anchor-item");
      if (navCon.parents(".topic_main").length) {
        var navTop = navOuter.offset().top;
        window.scrollTo(0, navTop + 1);
      }
      setTimeout(function () {
        var str = "";
        for (var i = 0; i < lis.length; i++) {
          var a = $(lis.get(i)).find("a");
          str += "<a data-href='" + a.attr("data-href") + "' class='" + ($(lis.get(i)).hasClass("hover") ? "hover" : "") + "'>" + a.text() + "</a>";
        }
        var foldContainer = $("<div class='fold'>" +
          "<div class='title'><span>切换楼层</span><div class='unfold'></div></div> " +
          "<div class='anchor-list'>" +
          str +
          "</div>" +
          "</div>");
        navCon.append(foldContainer);
        $(document.body).append(mask);
        $(document.body).on("click", function () {
          $(".fold").remove();
        })
        foldContainer.find("a").click(function () {
          var tag = $(this).attr("data-href").replace("#", "");
          var toTarget = $('[name=' + tag + ']').get(0);
          var toTop = $(toTarget).offset().top;
          if (Units.isApp()) {
            window.scrollTo(0, toTop - 42);
          } else {
            window.scrollTo(0, toTop - 88);
          }
        })
        foldContainer.find(".unfold").click(function () {
          $(".fold").remove();
        })
      }, 200);


    });
  }

  /**
   * 初始化数据
   */
  function initData() {
    var pageData = JSON.parse(dataStr);
    window.shareTitle = pageData.info.shareTitle;
    window.descContent = pageData.info.shareDesc;
    window.lineLink = location.href;
    window.imgUrl = pageData.info.shareImg+'?x-oss-process=image/resize,m_fill,w_80,h_80/quality,Q_90&';

    var title = pageData.info.title;
    $("title").html(title);
    $(".top0 .title_container").html(title);
  }

  /**
   * 延迟加载图片
   */
  function lazyLoad() {
    $("img").lazyload({effect: "fadeIn", threshold: 100})
  }


  /**
   * 增加对分享按钮的监听
   */
  function addShareButtonListener() {
    var shareButton = $(".share_to_web");
    if (shareButton && shareButton.length) {
      shareToWeb(shareButton);
    }
  }

  function shareToWeb(shareButton) {
    if (window.Units && Units.isApp()) {
      var useMMB = 0;
      shareButton.click(function () {
        bravetime.callAppShare({
          title: shareTitle, // 分享标题
          link: useMMB ? lineLink.replace("davdian\.com", "mamamba\.net") : lineLink, // 分享链接
          imgUrl: imgUrl, // 分享图标
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
    });
    msk.click(function (event) {
      msk.addClass('hide');
    });
  }

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
        imgUrl: window.imgUrl || "//pic.davdian.com/goods/1/20151017104524.png"
      };
      return JSON.stringify(shareInfo);
    };
  }

  /**
   * 初始化分享模块
   */
  function initShareModel() {
    // 获取token
    var url = window.location.href;
    var access_key = 'davdian@)!$!)!*';
    $.ajax({
      url: '//open.davdian.com/WechatAPI/get_js_token?access_key=' + encodeURI(access_key),
      type: 'GET',
      dataType: 'jsonp',
      data: {
        url: encodeURI(url)
      },
      success: function (result) {
        if (result["error"] == 0) {
          wx.config({
            debug: false,
            appId: result["data"]["appId"],
            timestamp: result["data"]["timestamp"],
            nonceStr: result["data"]["nonceStr"],
            signature: result["data"]["signature"],
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
          })
        }
      },
      error: function () {
        console.log("Error")
      }
    });
  }

  /**
   * 增加对分享的监听
   */
  function addShareListener() {
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: shareTitle,
        link: lineLink,
        imgUrl: imgUrl,
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
        imgUrl: imgUrl,
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

  function judgeApp() {
    if (Units.isApp()) {
      $(document.body).addClass("in_app");
    }
  }


  /**
   * 顶部展开收起
   */
  function top() {
    var top0Container = $(".top0"), allHeight, lastY = window.scrollY;
    $("*").on("DOMNodeInserted", function () {
      allHeight = $(document).height() - window.innerHeight;
    });
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

    $(window).scroll(function () {
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
          $("body").append('<div class="to-top"><a href="javascript:void(0);" id="to-top"><i class="icon dav_icon_up2top_80_80" style="width:40px;height:40px;"></i></a></div>');
          $("#to-top")
            .on("click", function () {
              $('html,body').animate({scrollTop: 0}, 500);
            });
        }

      } else {
        $(".to-top").remove();
      }
    });
  }
});

