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
      var pos = e.offsetTop - window.scrollY;
      var name = e.attributes.name.value;
      if(pos<0){
        target = name;
      }
      if(target){
        links.forEach(function(e1){
          removeClass(e1,"active");
        })
        console.log("a[href='#"+target+"']")
        var activeDom = document.querySelector(".link_group").querySelector("a[href='#"+target+"']");
        addClass(activeDom,"active");
      }
    });
  }, false);
   }
  
}

function init(){
	backToTop();
	judgeApp();
	setAppAndWx();
  judgeLinkGroup();
  initLinkGroup();
}

init();