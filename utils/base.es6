import wxShare from './WXShare.es6';
import pathHistory from './pathHistory.es6';
import appInterface from './appInterface.es6';

/**
 * 初始化
 */
let init = () => {
    pathHistory.init();
};

/**
 * 信息准备完成
 */
let ready = () => {
    wxShare.init();
    appInterface.init();
};

export default {
    ready,
    init,
    pathHistory
}

/*
 // 页面打开时
 import base from '../utils/base.es6';
 base.init();

 // 异步获取数据后
 window.title = "detail";
 window.link = location.href;
 window.imgUrl = "http://pic.davdian.com/supplier/2017/03/15/1000_1000_5b66b3165dd581008e333e9edd8acf2c.jpg";
 window.desc = "描述";

 base.ready();

 */
