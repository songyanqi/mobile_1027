/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//fe-ws.davdian.com/wap/static/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var designWidth = window.designWidth;
	function setRootSize(width) {
	  designWidth = width;
	  width = designWidth || 375;
	  var clientWidth = document.documentElement.clientWidth;
	  if (clientWidth > 640) {
	    clientWidth = 640;
	  } else {
	    if (clientWidth < 320) {
	      clientWidth = 320;
	    }
	  }
	  document.documentElement.style.fontSize = clientWidth / width * 100 + "px";
	}
	setRootSize();
	window.addEventListener("resize", function () {
	  setRootSize();
	}, false);
	window.designWidth = undefined;

/***/ }
/******/ ]);