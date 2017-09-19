// 基础模块
// import common from '../../../common/js/common.js';

// // 第三方模块
// import Vue from 'Vue';
// import $ from '$';
// import Cookies from 'js-cookie';

// // 业务模块
// import encrypt from '../../../common/js/module/encrypt.js';
// import util from '../../../common/js/module/util.js';
// import tj from '../../../common/js/module/tj.js';
// import popup from '../../../common/js/module/popup.js';
// import login from '../../../common/js/module/login.js';
import native from '../../../common/js/module/native.js';
import share from '../../../common/js/module/share.js';
// import vueLazyload from '../../../common/js/module/vueLazyload.js';

// // 懒加载初始化
// vueLazyload.init();

import ua from "../../../common/js/module/ua.js"




/**
 *回到顶部按钮
 **/
 function backToTop(){
  var dom = document.querySelector(".app")||document.body;
  var b2t = document.createElement("img");
  b2t.src="//pic.davdian.com/free/back_top_icon_0803.png";
  b2t.style.display="none";
  addClass(b2t,"to-top-icon");
  dom.appendChild(b2t);
  b2t.onclick = function(){
    $('html,body').animate({scrollTop: 0}, 500);
  }
  window.addEventListener('scroll', function () {
   if (document.body.scrollTop >= 200) {
     b2t.style.display = 'block';
   } else {
     b2t.style.display = 'none';
   }
  }, false);
 }

 function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

/**
 * 判断是否在app中
 */
 function judgeApp(){
   var dom = document.querySelector(".app")||document.body;
   if(!ua.isDvdApp()){
    removeClass(dom,"in_app");
  }else{
    dom.className += " in_app";
  }
}

/**
 * 判断头部锚点
 */
 function judgeLinkGroup(){
  var dom = document.querySelector(".app")||document.body;
  if(document.querySelector(".link_group")){
    var n = document.querySelectorAll(".link_row").length;
    addClass(dom, "link_row_"+n);
  }
}

function setAppAndWx(){
	// 设置app头部标题栏
  native.custom.initHead({
    shareOnHead: 1,
    homeOnHead:1
  });

      // 设置分享信息
      share.setShareInfo({
      	title:window.shareTitle,
      	desc:window.descContent,
      	link:window.lineLink,
      	imgUrl:window.imgUrl
      });
    }


/*
* 初始化头部锚点
*/
function initLinkGroup(){
  if(document.querySelector(".link_group")){
    var links = document.querySelector(".link_group").querySelectorAll("a");
    links.forEach(function(e){
      e.onclick=function(){
        links.forEach(function(e1){
          removeClass(e1,"active");
        })
        addClass(e,"active");
      }
    });
    window.addEventListener('scroll', function () {
      var target;
      var targetList = document.querySelectorAll(".target-fix");
      targetList.forEach(function(e){
        var pos = e.offsetTop - window.scrollY - 2;
        var name = e.attributes.name.value;
        if(pos<0){
          target = name;
        }
        if(target){
          links.forEach(function(e1){
            removeClass(e1,"active");
          })
          var activeDom = document.querySelector(".link_group").querySelector("a[href='#"+target+"']");
          addClass(activeDom,"active");
        }
      });
    }, false);
  }
}

// 初始化商品列表
function initGoods(){
  // 新逻辑 根据id增加商品
  $(".goods-list-template").each(function () {
    var $el = $(this);
    var goods = $el.attr("data-goods-id");
    var key = 'goods_list_'+goods;
    if(sessionStorage[key]){
      var res = JSON.parse(sessionStorage[key]);
      render(res,$el);
      return;
    }
    $.ajax({
      url: "/index.php?m=default&c=topic&a=ajax_goods_by_ids",
      type: "POST",
      data: {
        list: goods
      },
      dataType: "json",
      success: function (res) {
        render(res,$el);
        sessionStorage[key]=JSON.stringify(res);
      }
    });
  });

  function render(res,$el ){
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
          if(d.ratio&&d.actInfo==""){
              d.actInfo = "返现"+d.ratio+'倍';
          }
          str += '<div class="goods_item">' +
            '<a href="/'+d.goods_id+'.html?rl='+res.referer.rl+'&rp='+res.referer.rp+'">'+
            '<div class="goods_img">' +
            (i<4?('<img src=\"'+d.goods_img+'\">'):('<img src="http://pic.davdian.com/free/loading_320_320_v2.png" data-original=\"' + d.goods_img + '\">'))+
            ((d.actInfo && d.actInfo.length) ? ('<span class="img_label">' + d.actInfo + '</span>') : "") +
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
}

function initLazyload(){
  jQuery(document).ready(function ($) {
    $("img[data-original]").lazyload({effect: "fadeIn", threshold: 100})
  });
}

function init(){
	backToTop();
	judgeApp();
	setAppAndWx();
  judgeLinkGroup();
  initLinkGroup();
  initGoods();
  initLazyload();
}

init();