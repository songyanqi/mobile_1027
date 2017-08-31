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
	b2t.className="to-top-icon"
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

function setAppAndWx(){
	// 设置app头部标题栏
      native.custom.initHead({
        shareOnHead: 1
      });

      // 设置分享信息
      share.setShareInfo({
      	title:window.shareTitle,
      	desc:window.descContent,
      	link:window.lineLink,
      	imgUrl:window.imgUrl
      });
}

function init(){
	backToTop();
	judgeApp();
	setAppAndWx();
}

init();