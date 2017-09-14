var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz))}function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz))}function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz))}function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data))}function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data))}function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data))}function md5_vm_test(){return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72"}function core_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t)}function core_hmac_md5(key,data){var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C}var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128)}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function str2binl(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin}function binl2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str}function binl2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF)}return str}function binl2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F)}}return str}

var strSign = function(obj) {
  var strObj = sortObj({obj:obj})
  var str = ''
  for (var i in strObj){
    str +=  i + '=' + strObj[i] + '&'
  }
  return str;
}

var sortObj = function(obj) {
  var Units = window.Units = window.Units||{};
  var u = navigator.userAgent;
  Units.isIOS = function(){
    if(u.match(/ios/i)) {
      return true;
    }
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  };
  Units.isMobileIOS = function () {
    return /iPhone|iPad|iPod/i.test(u);
  };
  Units.getAppVersion = function () {
    // 空格分所有
    var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) ||  u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i)||  u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
    if(versionStr == null){
      return 0;
    }else{
      var v = versionStr[2].split(".").reduce(function(a,b){return +a*10+ +b});
    }
    return +v;
  };
  Units.isAndroid = function () {
    if(u.match(/(android|linux)/i)) {
      return true;
    }
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  };
    
  var string = ''
  var strObj = {}
  var t = null
  var tValue = null
  var arrKey = ['shop_url','sess_key','device_token','format','ts','osv','wh','data_version']
  var osv = "web_h5_*_*";
  if(window.Units&&Units.isApp()&&Units.isIOS()){
    osv = "web_ios_*_*";
  }
  if(window.Units&&Units.isApp()&&Units.isAndroid()){
    osv = "web_android_*_*";
  }
  var arrValue = [location.host, document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', 0]

  if (obj.obj){
    for (var p in obj.obj){
      arrKey.push(p)
      arrValue.push(obj.obj[p])
    }
  }
  for (var i = 0; i < arrKey.length; i++) {
    for (var j = 0; j < arrKey.length - i - 1; j++) {
      if (arrKey[j] > arrKey[j+1]) {
        t = arrKey[j+1]
        arrKey[j+1] = arrKey[j]
        arrKey[j] = t

        tValue = arrValue[j+1]
        arrValue[j+1] = arrValue[j]
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
  // var sign = hex_md5(string).toUpperCase()
  var sign = md5(string).toUpperCase()
  strObj.sign = sign
  return strObj
}
jQuery(document).ready(function ($) {
    if(window.haveMask){
        $("body,html").css({"overflow":"hidden"});
    }
    $(".alertStyleMask").on('touchmove',function(e){
        e.preventDefault();
    })
    $(".alertStyle").on('touchmove',function(e){
        e.preventDefault();
    })
    $(".alertStyle1").on('touchmove',function(e){
        e.preventDefault();
    })
    $('.alertStyleMask').on('click', function () {
        $('.alertStyle').css({
            display:'none'
        })
        $('.alertStyleMask').css({
            display:'none'
        })
        $('.alertStyle1').css({
            display:'none'
        })
        $("body,html").css({"overflow":"visible"});
    })



    var scrollTop = 0,isFirstLoad = true,resonCancleId = "";
    // 取消原因
    function getAjax() {
      $.ajax({
        url: "/api/mg/order/cancelOrder/reasonList?_="+Date.now(),
        // url: "/api/mg/order/cancelOrder/createDetail?_="+Date.now(),
        dataType: "JSON",
        type: "POST",
        data: strSign({}),
        success: function (res) {
          if (res.code == 0) {
            isFirstLoad = false;
            // var dataList = res.data.list;
            var dataList = res.data.reasonList;
            dataList.forEach(function (item,index) {
              var str = "<label class = 'navLabel' for="+ item.reasonId +">\
                           <div data-id = "+ item.reasonId +" class = 'navList'>\
                            <span>"+ item.reasonName +"</span>\
                              <input data-name = "+ item.reasonName +" data-id = "+ item.reasonId +" class = 'reasonIpt' id = "+ item.reasonId +" type='radio' name = 'reason'>\
                              <i></i>\
                          </div>\
                        </label>";
              $(".modalCont").append(str);
            })
          }
        },
        error: function () {
          bravetime.ajaxError(32);
        }
      })
    }

    // 点击取消原因选中的id;
    $(".modalWrapper").on("click",".navList",function () {
      // resonCancleId = $(this).attr("data-id");
      if (!$(".disabledModal").hasClass("modalConfirm")) {
        $(".disabledModal").addClass("modalConfirm");
      }
    });
    //点击关闭按钮
    $(".modalWrapper").on("click",".modalCloseWrapper",function () {
      $(".modalMask").removeClass("showMask");
      $(".modalWrapper").removeClass("showModal");
      $("body").removeClass("bodyFix");
      document.body.scrollTop = scrollTop;
    });
    // 点击蒙层
    $(".modalMask").on("click",function () {
      $(".modalMask").removeClass("showMask");
      $(".modalWrapper").removeClass("showModal");
      $("body").removeClass("bodyFix");
      document.body.scrollTop = scrollTop;
    });
      // 点击确定
    $(".modalWrapper").on("click",".disabledModal",function () {
      var resonId = $(".reasonIpt:checked").attr("data-id");
      var reasonName = $(".reasonIpt:checked").attr("data-name");
      var me = this;
      if (resonId == undefined) {
        // window.bravetime.info("请选择退款原因");
        return;
      }

      $(".modalMask").removeClass("showMask");
      $(".modalWrapper").removeClass("showModal");

      $("body").removeClass("bodyFix");
      document.body.scrollTop = scrollTop;

      var dataStatus = $(this).attr('data-status');
      var reason = encodeURI(reasonName);
      /*$.ajax({
          // url: cancelOrderUrl,
          url: "/api/mg/order/order/cancel",
          dataTyle: "JSON",
          type: "POST",
          data: strSign({
            orderId: window.orderId,
            reasonId: resonId,
            // reason: reason,
            reason: 1234565,
          }),
          success: function (res) {
            if (res.code == 0) {
              var info = {success: "取消成功", error: "取消失败", wait: "取消审核中"}[result["flag"]] || "取消审核中";
              // $(me).parents(".order_goods_state").html('<a class="dav-btn btn-white btn-disable">' + info + '</a>');
              $(".order_goods_state").html('<a class="dav-btn btn-white btn-disable">' + info + '</a>');
              var myDate = new Date();
              var time_mon = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1);
              var time_d = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
              var time_h = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours();
              var time_min = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
              var time_sec = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds();
              var time = myDate.getFullYear() + '-' + time_mon + '-' + time_d + ' ' + time_h + ':' + time_min + ':' + time_sec;
              if (result["flag"] == "wait") {
                  $(".order_id").find(".pull-right").html("已冻结");
                  var wait_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                      + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">申请取消订单，待客服审核</p></div></li>';
                  $(".order_handle ul").append($(wait_html));
                  $('.order-tx').remove();
              } else if (result["flag"] == "success") {
                  var success_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                      + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">' + result["success_text"] + '</p></div></li>';
                  $(".order_handle ul").append($(success_html));
                  $('.order-tx').remove();
              } else if (result["flag"] == "error") {
                  bravetime.info(result["msg"]);
              }
            } else {
              bravetime.info(res.data.msg);
            }
          },
          error: function (err) {
            bravetime.info(err.data.msg);
          }
        });*/
      var sessionData = JSON.parse(sessionStorage.getItem('data'));
      if (dataStatus == 'cancle') {
        $.ajax({
          url: "/api/mg/order/order/cancel",
          dataTyle: "JSON",
          type: "POST",
          data: strSign({
            orderId: window.orderId,
            reasonId: resonId,
            reason: reasonName,
            // reason: 123456,
          }),
          success: function (result) {
            if (result.code != 0 && result.code != 60499) {
              bravetime.info(result.data.msg);
              return;
            }
            var info = "取消审核中";
            if (result.code == 0) {
                info = "取消成功";
            } else if(result.code == 60499) {
                info = "取消审核中";
            }
            $(".order_goods_state").html('<a class="dav-btn btn-white btn-disable">' + info + '</a>');
            var myDate = new Date();
            var time_mon = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1);
            var time_d = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
            var time_h = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours();
            var time_min = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
            var time_sec = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds();
            var time = myDate.getFullYear() + '-' + time_mon + '-' + time_d + ' ' + time_h + ':' + time_min + ':' + time_sec;

            if (result.code == 0) {
                var success_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                    + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">' + result.data.successText + '</p></div></li>';
                $(".order_handle ul").append($(success_html));
                $('.order-tx').remove();
                if (sessionData) {
                  sessionData[0].map(function (item,index) {
                    if (item.id == window.orderId) {
                      item.type = 4;
                    }
                  });
                  sessionData[1].map(function (item,index) {
                    if (item.id == window.orderId) {
                      sessionData.splice(index,1);
                    }
                  });
                }
            } else if (result.code == 60499) {
                $(".order_id").find(".pull-right").html("已冻结");
                var wait_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                    + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">申请取消订单，待客服审核</p></div></li>';
                $(".order_handle ul").append($(wait_html));
                $('.order-tx').remove();
            }
          }
        })
      } else if (dataStatus == "close") {
        $.ajax({
            url: closeOrderUrl,
            dataType: "json",
            data:{
              id: window.orderId,
              reasonId: resonId, 
              reason: reasonName,
              // reason: 12345,
            },
            success: function (result) {
                if (result["error"] == 0) {

                  if (sessionData) {
                    sessionData[0].map(function (item,index) {
                      if (item.id == window.orderId) {
                        item.type = 4;
                      }
                    });
                    sessionData[3].map(function (item,index) {
                      if (item.id == window.orderId) {
                        sessionData[3].splice(index,1);
                      }
                    });

                    sessionStorage.setItem('data',JSON.stringify(sessionData));
                  }
                  // sessionStorage.setItem('typePage',JSON.stringify(scope.typePage));
                  // 有refer才返回
                  if (document.referrer && document.referrer != "") {
                      window.history.go(-1);
                  } else {
                      location.reload();
                  }
                } else {
                    window.bravetime.removeLoader();
                    window.bravetime.newAlert(result["msg"]);
                }
            }, error: function () {
                window.bravetime.removeLoader();
                bravetime.ajaxError(25);
            }
        });
      }
    });

    if ($(".order_detail_container").length) {
        //订单详情页面点击确认收货、评价、追加评价之后返回来刷新页面
        if(sessionStorage.getItem('orderDetail')){
            sessionStorage.removeItem('orderDetail');
            location.reload();
        }

        if (location.href.indexOf("change_address=1") > -1) {
            bravetime.info("地址修改成功");
        }
        $.cookie('PassOrderDetail', 1);

        var isOldOrder = window.isOldOrder;
        //提醒发货
        var time = Date.now();
        $(".order-tx").click(function (el) {
            var id = $(this).attr("data-for-order-id");
            id = window.deliveryId ? window.deliveryId : id;
            window.bravetime.addLoader();
            $.ajax({
                url: txUrl,
                type: 'POST',
                dataType: 'json',
                data: {id: id, time: time},
                success: function (result) {
                    if (result["error"] == 0) {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert("提醒成功");
                    } else {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert(result["msg"]);
                    }
                },
                error: function () {
                    window.bravetime.removeLoader();
                    bravetime.ajaxError(24);
                }
            });

        });

        // 关闭订单
        $(".order_detail_container").on("click",".order-close-order",function () {
          var id = $(this).find(".order_list_item").attr("data-for-id");

          if (isFirstLoad) {
            getAjax();
          }
          $(".disabledModal").attr('data-status',"close");

          $(".modalMask").addClass("showMask");
          $(".modalWrapper").addClass("showModal");

          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -scrollTop + 'px';
          document.body.classList.add("bodyFix");
        });

        // 老的
        /*$(".order-close-order").click(function () {
            window.bravetime.newConfirm("您确定要关闭订单么？", {
                okLink: function () {
                    window.bravetime.addLoader();
                    $.ajax({
                        url: closeOrderUrl,
                        dataType: "json",
                        data: {
                            id: window.orderId
                        },
                        success: function (result) {
                            if (result["error"] == 0) {
                                // 有refer才返回
                                if (document.referrer && document.referrer != "") {
                                    window.history.go(-1);
                                } else {
                                    location.reload();
                                }
                            } else {
                                window.bravetime.removeLoader();
                                window.bravetime.newAlert(result["msg"]);
                            }
                        }, error: function () {
                            window.bravetime.removeLoader();
                            bravetime.ajaxError(25);
                        }
                    });
                }
            })
        });*/

        // 确认收货
        $(".order-arrive").click(function () {
            var id = $(this).attr("data-for-order-id");
            id = window.deliveryId ? window.deliveryId : id;
            window.bravetime.newConfirm("您确定收到商品了么？", {
                okLink: function () {
                    bravetime.addLoader({little:true});
                    $.ajax({
                        url: arriveUrl,
                        dataType: "json",
                        data: {
                            id: id
                        },
                        success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"] == 0) {
                                //成功之后跳转到确认收货页面
                                bravetime.goto(result.data.redirect_link);
                                //一进页面在最上面代码获取下面的orderList，如果有就刷新页面
                                sessionStorage.setItem('orderDetail',"Refresh");
                            } else {
                                bravetime.info(result["msg"]);
                            }
                        }, error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(26);
                        }
                    });
                }
            });
        });

        // 删除订单
        $(".order_detail_container").on("click",".order-delete-order",function () {
        // $(".order-delete-order").click(function () {
            window.bravetime.newConfirm("您确定要删除订单么？", {
                okLink: function () {
                    window.bravetime.addLoader();
                    $.ajax({
                        url: deleteOrderUrl,
                        dataType: "json",
                        data: {
                            id: window.orderId
                        },
                        success: function (result) {
                            if (result["error"] == 0) {
                                var cookieIndex = $.cookie("order_list_index");
                                window.bravetime.goto(orderListUrl + "#tag" + cookieIndex);
                            } else {
                                window.bravetime.removeLoader();
                                window.bravetime.newAlert(result["msg"]);
                            }
                        }, error: function () {
                            window.bravetime.removeLoader();
                            bravetime.ajaxError(26);
                        }
                    });
                }
            });
        });

        //取消订单
        $(".order_detail_container").on("click",".modalMask",function () {
          if ($(this).hasClass("showMask")) {
            $(".modalMask").removeClass("showMask");
            $(".modalWrapper").removeClass("showModal");

            $("body").removeClass("bodyFix");
            document.body.scrollTop = scrollTop;
          }
        });
        $(".order_detail_container").on("click",".cancel_order",function () {
          if (isFirstLoad) {
            getAjax();
          }
          $(".disabledModal").attr('data-status',"cancle");

          $(".modalMask").addClass("showMask");
          $(".modalWrapper").addClass("showModal");

          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -scrollTop + 'px';
          document.body.classList.add("bodyFix");

        });
        $(".order_detail_container").on("click",".modalCloseWrapper",function () {
          $(".modalMask").removeClass("showMask");
          $(".modalWrapper").removeClass("showModal");

          $("body").removeClass("bodyFix");
          document.body.scrollTop = scrollTop;
        });
        
        // 取消订单
        /*$(".cancel_order").click(function () {
            var me = this;
            bravetime.newConfirm("您确定要取消订单么？", {
                okLink: function () {
                    bravetime.addLoader({little: true});
                    $.ajax({
                        url: cancelOrderUrl,
                        dataType: "json",
                        data: {
                            id: window.orderId
                        },
                        success: function (result) {
                            bravetime.removeLoader();
                            if (result["error"]) {
                                bravetime.info(result["msg"]);
                            } else {
                                var info = {success: "取消成功", error: "取消失败", wait: "取消审核中"}[result["flag"]] || "取消审核中";
                                $(me).parents(".order_goods_state").html('<a class="dav-btn btn-white btn-disable">' + info + '</a>');
                                var myDate = new Date();
                                var time_mon = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1);
                                var time_d = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
                                var time_h = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours();
                                var time_min = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
                                var time_sec = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds();
                                var time = myDate.getFullYear() + '-' + time_mon + '-' + time_d + ' ' + time_h + ':' + time_min + ':' + time_sec;
                                if (result["flag"] == "wait") {
                                    $(".order_id").find(".pull-right").html("已冻结");
                                    var wait_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                                        + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">申请取消订单，待客服审核</p></div></li>';
                                    $(".order_handle ul").append($(wait_html));
                                    $('.order-tx').remove();
                                } else if (result["flag"] == "success") {
                                    // $(".order_id").find(".pull-right").html("已关闭");
                                    var success_html = '<li><span class="line"></span><div class="left"><img src="//img.davdian.com/free/order_head_pic_xss.png" style=" border-radius:32px;"></div>'
                                        + '<div class="right"><p class="dav-color9">' + time + '</p><p class="dav-color6 fz_14">' + result["success_text"] + '</p></div></li>';
                                    $(".order_handle ul").append($(success_html));
                                    $('.order-tx').remove();
                                } else if (result["flag"] == "error") {
                                    bravetime.info(result["msg"]);
                                }
                            }

                        },
                        error: function () {
                            bravetime.removeLoader();
                            bravetime.ajaxError(32);

                        }
                    });
                }
            });
        });*/

        // 跳评价编辑页面
        $(".commentBtn").click(function () {
            var href = $(".commentBtn").attr("data-href");
            if(window.Units && Units.isApp()){
                window.evaCallback = function () {
                    setTimeout(function () {
                        location.reload();
                    },300);
                };
            }
            else {
                sessionStorage.setItem('orderDetailRefresh',"Refresh");
            }
            bravetime.openNewPage({type:1,url:href,jsMethod:'evaCallback()'});
            return false;
        });

        // 跳评价列表页面
        $(".commentListBtn").click(function () {
            var href = $(".commentListBtn").attr("data-href");
            bravetime.goto(href);
            sessionStorage.setItem('orderDetailRefresh', "Refresh");
            return false;
        });

    }
    //退货换货
    $(".order_goods_item").on("click", "returnGoodsMoneyButton", function (event) {
        event.stopPropagation();
    });

    if ($(".order_list_container").length) {

        function refresh(i, notag) {

            $(".order_list_group").removeClass("hide");
            var index = (typeof i == "undefined") ? 0 : i;
            var el = $(".switcher_item")[index];
            $(".switcher_item").removeClass('selected');
            $(el).addClass('selected');
            if (index) {
                $(".order_list_item").addClass('hide');
                $(".type_" + index).removeClass('hide');

                if ($(".type_" + index).length == 0) {
                    $(".no-order").html("没有" + ["", "待收货", "待发货", "未付款", "已关闭"][index] + "订单").removeClass("hide");

                } else {
                    $(".no-order").addClass("hide");
                }
            } else {
                $(".order_list_item").removeClass('hide');

                if ($(".order_list_item").length == 0) {
                    $(".no-order").html("没有订单").removeClass("hide");
                } else {
                    $(".no-order").addClass("hide");
                }
            }


            $.cookie("order_list_index", index);
            if (!notag) {
                window.location.hash = "#tag" + index;
            }

            $("img").each(function (index, element) {
                var $el = $(this);
                if ($el.attr("data-original") && ($el.attr("data-original") != $el.attr("src"))) {
                    $el.attr("src", $el.attr("data-original"));
                }
            });
        }

        // 只有从订单详情回来才需要刷新页面
        var passOrderDetail = !!$.cookie('PassOrderDetail');
        var url = location.href;
        var urlIndex = url.indexOf("#tag");
        if (passOrderDetail) {
            $.removeCookie('PassOrderDetail');
            location.reload();
        } else if (urlIndex < 0) {
            refresh(0, true);
        } else {
            var tag = +url.substr(urlIndex + 4);
            refresh(tag);
        }

        window.onpopstate = function () {
            console.log(arguments);
            refresh(+window.location.hash.replace("#tag", ""), true);
        };


        $(".switcher_item").each(function (index, el) {
            $(el).click(function (event) {
                // $(document).scrollTo(0,0);
                refresh(index);
            });
        });
        $(".order_list_group").each(function (index, el) {
            var height = $(el).find(".img_container_inner").height();
            var length = $(el).find(".img_container_inner").find("img").length;
            if (height > 60) {
                $(el).find(".order_good_list").append($('<div class="pull-right text-container">共' + length + '件<br/>商品</div>'));
                $(el).find(".img_container_inner").css("height", "60px");
            }
            var href = $(el).find(".order_good_list").attr("href");
            $(el).click(function (event) {
                /* Act on the event */
                var tag = event.target.tagName;
                if (tag == "A") {

                } else {
                    window.bravetime.goto(href);
                }
            });
        });

        // 已发货的情况
        // 查看物流

        // 待发货

        // 未付款
        // 关闭订单
        /*$(".order_detail_container").on("click",".order-close-order",function () {
          var id = $(this).find(".order_list_item").attr("data-for-id");

          if (isFirstLoad) {
            getAjax();
          }
          $(".disabledModal").arrt('data-status',"close");

          $(".modalMask").addClass("showMask");
          $(".modalWrapper").addClass("showModal");

          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -scrollTop + 'px';
          document.body.classList.add("bodyFix");
        });*/
        //老的
        /*$(".order-close-order").each(function (index, el) {
            var id = $(el).find(".order_list_item").attr("data-for-id");
            $(el).click(function (event) {
                window.bravetime.newConfirm("您确定要关闭订单么？", {
                    okLink: function () {
                        bravetime.addLoader();
                        $.ajax({
                            url: closeOrderUrl,
                            // type: 'POST',
                            dataType: 'json',
                            data: {id: id},
                            success: function (result) {
                                if (result["error"]) {
                                    bravetime.removeLoader();
                                    bravetime.newAlert(result["msg"]);
                                } else {
                                    if (window.debug) {
                                        setTimeout(function () {
                                            location.reload();
                                        }, 1500);
                                    } else {
                                        location.reload();
                                    }

                                }
                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(25);
                            }
                        });
                    }
                });
            });
        });*/

        // 已关闭
        // 删除订单
        $(".order-delete-order").each(function (index, el) {
            var id = $(el).parents(".order_list_item").attr("data-for-id");
            $(el).click(function (event) {
                window.bravetime.newConfirm("您确定要删除订单么？", {
                    okLink: function () {
                        bravetime.addLoader();
                        $.ajax({
                            url: deleteOrderUrl,
                            // type: 'POST',
                            dataType: 'json',
                            data: {id: id},
                            success: function (result) {
                                if (result["error"]) {
                                    bravetime.removeLoader();
                                    bravetime.newAlert(result["msg"]);
                                } else {
                                    if (window.debug) {
                                        setTimeout(function () {
                                            $(el).parents(".order_list_group").remove();
                                            bravetime.removeLoader();
                                        }, 1500);
                                    } else {
                                        $(el).parents(".order_list_group").remove();
                                        bravetime.removeLoader();
                                    }
                                }
                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(26);
                            }
                        });
                    }
                });
            });
        });

        // // 点击抖动
        // $(".order_good_list").each(function(index,el){
        //     $(el).addClass('shake').addClass('shake-slow');
        // });


    }

    //物流详情
    if ($(".order_delivery_container").length) {
        var orderListIndex = +$.cookie("order_list_index");
        $.cookie("order_list_index", 0);
        window.backButtonClickCallback = function (backUrl, backFunction) {
            if (backUrl == -1) {
                $.cookie("order_list_index", orderListIndex);
                $.cookie('PassOrderDetail', 1);
            }
            if (typeof backFunction == "function") {
                backFunction();
            }
        };

        //提醒发货
        var orderDeliveryOrderId = $(".order_list_child").attr("data-for-order-id");
        var orderDeliverytime = Date.now();
        $(".order-tx").click(function (e) {
            window.bravetime.addLoader();
            $.ajax({
                url: txUrl,
                type: 'POST',
                dataType: 'json',
                data: {id: orderDeliveryOrderId, time: orderDeliverytime},
                success: function (result) {
                    if (result["error"] == 0) {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert("提醒成功");
                    } else {
                        window.bravetime.removeLoader();
                        window.bravetime.newAlert(result["msg"]);
                    }
                },
                error: function () {
                    window.bravetime.removeLoader();
                    bravetime.ajaxError(24);
                }
            });
            e.preventDefault();
            window.event.returnValue = false;
            return false;
        });


        $(".order_good_list").each(function (index, el) {
            var height = $(el).find(".img_container_inner").height();
            var length = $(el).find(".img_container_inner").find("img").length;
            if (height > 60) {
                $(el).append($('<div class="pull-right text-container">共' + length + '件<br/>商品</div>'));
                $(el).find(".img_container_inner").css("height", "60px");
            }
            if (length == 1) {
                $(el).css("padding-right", "12px");
            }
        });

        // 展开收起物流
        $(".order_list_child").each(function (index, el) {
            var y;
            $(el).find(".order_goods_group_button").click(function (event) {
                /* Act on the event */

                if ($(el).find(".order_goods_group_wl_con").hasClass('hide')) {
                    $(el).find(".order_goods_group_wl_con").removeClass('hide');
                    $(el).find(".order_goods_group_button").find("span").html("收起物流信息");
                    y = window.scrollY;
                } else {
                    $(el).find(".order_goods_group_wl_con").addClass('hide');
                    $(el).find(".order_goods_group_button").find("span").html("展开物流信息");
                    if (y) {
                        window.scrollTo(0, y);
                    }
                }
            });
        });

        $.ajax({
            url: deliveryAjaxUrl,
            data: deliveryAjaxData,
            dataType: "jsonp",
            success: function (data) {
                if (data.error == 0) {
                    var list = data.data;
                    for (var i = 0; i < list.length; i++) {
                        var item = $(".order_list_child[data-for-order-id=" + list[i].delivery_id + "]");
                        item.find(".loading").remove();
                        if (list[i].info && list[i].info[0] && list[i].info[0].Traces) {
                            if (list[i].info[0].Traces.length == 0) {
                                item.find(".order_goods_inf_none").removeClass("hide");
                            } else {
                                item.find(".order_goods_inf_none").remove();
                                for (var j = 0; j < list[i].info[0].Traces.length; j++) {
                                    var trace = list[i].info[0].Traces[j];
                                    var traceHtml = $('<div class="order_goods_group_wl_item"><div class="order_goods_group_wl_inner"><div class="order_goods_group_wl_text">' +
                                        '<div class="dav-normal">' + trace.AcceptStation + '</div>' +
                                        '<div>' + trace.AcceptTime + '</div></div></div></div>')
                                    item.find(".order_goods_group_wl_con").append(traceHtml);
                                }
                            }

                        }
                    }
                    $(".loading").each(function () {
                        $(this).parents(".order_goods_group_wl_con").find(".order_goods_inf_none").removeClass("hide");
                        $(this).remove();
                    });
                } else {
                    bravetime.info(data.msg);
                }
            }, error: function () {
                bravetime.info("网络异常,获取物流信息失败")
            }
        });
    }
    if ($(".publish_pic_view").length) {
        var mySwiper = new Swiper('.publish_pic_preview', {
            pagination: '.swiper-pagination',
            paginationType: 'fraction'
            // paginationType: 'progress',
            // paginationType: 'custom',
        })

    }
    //提交退货物流信息
    if ($(".subdeliver").length) {
        $(".subdeliver").on("click", function () {
            //return_express_company  return_express_num  退货物流公司 和 退货物流单号
            var company = $(".return_express_company").val(),
                num = $(".return_express_num").val();
            if (company == '' || num == '') {
                window.bravetime.info("请补全物流信息")
            } else {
                var data = {
                    "express_company": company,
                    "express_num": num,
                    "return_id": window.return_id
                };
                $.ajax({
                    url: window.deliverNumUrl,
                    data: data,
                    dataType: "json",
                    type: "post",
                    success: function (result) {
                        if (result.code) {
                            bravetime.info(result.msg);
                        } else {
                            bravetime.goto(result.url);
                        }
                    }, error: function () {
                        bravetime.info("网络异常,请重试");
                    }
                });
            }
        })
    }
    //催一下按钮
    if ($(".urgeButton").length) {
        $(".urgeButton").on("click", function () {
            var data = {};
            $.ajax({
                url: window.urgeUrl,
                data: data,
                dataType: "json",
                type: "post",
                success: function (result) {
                    if (result.code) {
                        bravetime.info(result.msg);
                    } else {
                        bravetime.info(result.msg);
                    }
                }, error: function () {
                    bravetime.info("网络异常,请重试");
                }
            });
        })
    }
    //提交退款信息
    if ($(".returnGoodsInfoButton").length) {
        $(".returnGoodsInfoButton").on("click", function () {
            var number = +$(".js_return_goodsNum").find("input").val(),
                remark = $(".return_remark").val();
            img = [],
                imgs = $(".img").find("img");
            imgs.each(function () {
                var pic = $(this).attr("data-show-src");
                img.push(pic);
            });
            if(imgs.length < 2){
                bravetime.info("请提供至少两张照片以便核实商品信息");
                return false;
            }
            var urldata = getUrlArgObject();
            var data = {
                "delivery_id": window.delivery_id,
                "goods_id": window.goods_id,
                "number": number,
                "remark": remark,
                "img": img.join(","),
                "return_id":urldata.return_id || 0
            };
            $.ajax({
                url: window.returnGoodsUrl,
                data: data,
                dataType: "json",
                type: "post",
                success: function (result) {
                    if (result.code) {
                        bravetime.info(result.msg);
                    } else {
                        bravetime.goto(result.url);
                    }
                }, error: function () {
                    bravetime.info("网络异常,请重试");
                }
            });
        });
        // //删除图片按钮
        // $(".return_refund_container").on("click",".closeBtn",function () {
        //     $(this).parents().find("li").remove();
        //     $(".add_comment_con").find(".add").removeClass("hide");
        // })
    }

    //退货数量按钮

    if ($(".js_return_goodsNum").length) {
        var js_return_goodsNum = $(".js_return_goodsNum"),
            inputcon = $(".input_control"),
            changenum = inputcon.find(".change_num"),
            minus = inputcon.find(".minus"),
            plus = inputcon.find(".plus"),
            input_num = js_return_goodsNum.find("input"),
            input_num_max = +input_num.attr("max"),
            re_money = $(".js_re_money"),
            re_money_val = $(".js_re_money").html();
        endclick();
        js_return_goodsNum.on("click", ".change_num", function () {
            bravetime.addLoader();
            var num = +input_num.val();
            if ($(this).hasClass('plus')) {
                if (num >= input_num_max) {
                    input_num.val(input_num_max);
                    re_money.html(returnFloat(re_money_val * input_num_max));
                } else {
                    input_num.val(num + 1);
                    re_money.html(returnFloat(re_money_val * (num + 1)));
                }

            } else {
                if (num <= 1) {
                    input_num.val(1);
                    re_money.html(returnFloat(re_money_val * 1));
                } else {
                    input_num.val(num - 1);
                    re_money.html(returnFloat(re_money_val * (num - 1)));
                }

            }
            endclick();
            bravetime.removeLoader();
        });
        js_return_goodsNum.on("keyup", "input", function (event) {
            var e = event ? event : window.event;
            if (e.keyCode == 8) {
                this.value += " ";
                changenum.addClass("backcolor_E");
            }else{
                var num = +input_num.val();
                input_num.val(parseInt(num));
                if (num >= input_num_max) {
                    input_num.val(input_num_max);
                    re_money.html(returnFloat(re_money_val * input_num_max));
                }else if(num > 0 && num < input_num_max){
                    re_money.html(returnFloat(re_money_val * num));
                }else if(num <= 0) {
                    input_num.val(1);
                    re_money.html(returnFloat(re_money_val));
                }
            }
            endclick();
        });
        function endclick() {
            if(input_num.val() == input_num_max){
                if(!plus.hasClass("backcolor_E")){
                    plus.addClass("backcolor_E");
                }
            }else{
                if(plus.hasClass("backcolor_E")){
                    plus.removeClass("backcolor_E");
                }
            }
            if(input_num.val() == 1){
                if(!minus.hasClass("backcolor_E")){
                    minus.addClass("backcolor_E");
                }
            }else{
                if(minus.hasClass("backcolor_E")){
                    minus.removeClass("backcolor_E");
                }
            }
        }
    }
    //退货备注字数限制
    $("body").on("input propertychange", ".return_remark", function () {
        var $return_remark = $(".return_remark"),
            $return_remark_num = $(".return_remark_num");
        checkLength($return_remark,200,$return_remark_num)
    });
    /*限制字数长度*/
    function checkLength(gm, num, numtip) {
        var remain = gm.val().length;
        if (remain > num) {
            var gms = gm.val().substr(0, num);
            gm.val(gms);
            numtip.html("0");
        } else if (remain == num) {
            numtip.html("0");
        } else {
            var result = num - remain;
            numtip.html(result);
        }
    }
    function returnFloat(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    }
    var cutTimer;


  //预定商品倒计时
  function cutDown(numTime) {
    clearInterval(cutTimer);
    var oneMinute = 60,
        oneHour = 60 * 60,
        oneDay = 60 * 60 * 24;

    var hours = 00,
        minutes = 00,
        seconds = 00;
    cutTimer = setInterval(function () {
      if (numTime > 0) {
        hours = parseInt(numTime % oneDay / oneHour);
        minutes = parseInt(numTime % oneDay % oneHour / oneMinute);
        seconds = parseInt(numTime % oneDay % oneHour % oneMinute);

        hours = hours >= 10 ? hours : "0"+hours;
        minutes = minutes >= 10 ? minutes : "0"+minutes;
        seconds = seconds>=10 ? seconds : "0" +seconds
        numTime--;
        $(".cutTime").html(hours + " : " + minutes + " : " + seconds)
      } else {
        clearInterval(cutTimer);
        changeTips();
      }
    },1000); 
  };

  function changeTips() {
    if (presale_type == "reserve") {
      $(".order_presale").html("<div class = 'overCutDown'>定金超时支付，交易关闭</div>");
      $(".stage1Title").addClass("colorLight");
      $(".presaleNum").addClass("colorLight");
    }
    if (presale_type == "final") {
      $(".order_presale").html("<div class = 'overCutDown'>尾款超时支付，交易关闭</div>");
      $(".stage2Title").addClass("colorLight");
      $(".finalNum").addClass("colorLight");
    }
    $(".order_id").find(".dav-red").html("已关闭");
    $(".stage1Title").html("(已关闭)");
    $(".stage2Title").html("(已关闭)");
    $(".order_goods_state").html("<a class = 'dav-btn btn-white order-delete-order' data-dav-tj = 'order_detail|delete|delete|1|delete@order_detail'>删除订单</a>");
  }
  // 如果是定金单或者尾款单就倒计时
  if (is_presale_order && Number(presale_surplus_time) > 0) {
    cutDown(presale_surplus_time);
    if (presale_type == "reserve") {
      $(".stage1Title").addClass("colorLight");
      $(".presaleNum").addClass("colorLight");
    }
    if (presale_type == "final") {
      $(".stage2Title").addClass("colorLight");
      $(".finalNum").addClass("colorLight");
    }
    if (presale_type == "final_paid") {
      $(".stage2Title").removeClass("colorLight");
      $(".finalNum").removeClass("colorLight");
    }
  };

  if (is_presale_order && Number(presale_surplus_time) == 0) {
    changeTips();
  };

});