// let WebStorageCache = require("Web-storage-cache");
// let pathCache = new WebStorageCache({storage: 'sessionStorage'});

/**
 * 设置路径历史
 */
let setPathHistory = () => {
    /*
     let list = getPathHistoryList()||[];
     let listItem = {href:location.href,path:window.tj_path||"other"};
     list.push(listItem);
     pathCache.set("history_path",list);
     */

    if (!window.isPrivateMode) {
        let his = getPathHistoryList();
        his.push({href: location.href, path: window.tj_path || "other"});
        sessionStorage.history = JSON.stringify(his);
    }
};

/**
 * 获取路径历史列表
 */
let getPathHistoryList = () => {
    let his = [];
    if (!window.isPrivateMode) {
        if (sessionStorage.history) {
            his = JSON.parse(sessionStorage.history);
        }
    }

    return his;

    // return pathCache.get("history_path")
};

/**
 * 初始化
 */
let init = () => {
    isPrivateMode();
    setPathHistory();
};

let isPrivateMode = () => {
    try {
        localStorage.setItem('isPrivateMode', '1');
        localStorage.removeItem('isPrivateMode');
        window.isPrivateMode = false;
    } catch (e) {
        window.isPrivateMode = true;
    }
};

export default {
    setPathHistory,
    getPathHistoryList,
    init
}
