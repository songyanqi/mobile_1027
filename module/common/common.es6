var crypto = require('crypto')

let strSign = (str,flag,obj = {}) => {
    let strObj = sortObj(str,flag,obj)//字符串 传入当前的信息名称
    var str = ''//重新获取编译后的字符串
    for (let i in strObj){//变成键值对的形式
        str +=  i + '=' + strObj[i] + '&'
    }
    return strObj
}

let sortObj = (dataVersion, flag, obj = {}) => {//传入当前的信息名称 如feed
    let string = ''
    var strObj = {}
    let t = null
    let tValue = null
    let arrKey = ['shop_url','sess_key','device_token','format','ts','osv','wh','data_version']//需要上传的参数

    /**
     * 获取当前的版本号信息,如果没有取0
     */
    var osv = "web_h5_*_*";
    if(window.Units&&Units.isApp()&&Units.isIOS()){
        osv = "web_ios_*_*";
    }
    if(window.Units&&Units.isApp()&&Units.isAndroid()){
        osv = "web_android_*_*";
    }
    let arrValue = [];
    if(flag && !window.isPrivateMode){
        arrValue = [
            location.host,
            document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0,
            "",
            'json',
            new Date().getTime(),
            osv,
            '750_1334',
            0
        ]
    }else{
        // log('this is isPrivateMode or flag is false')
        arrValue = [
            location.host,
            document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0,
            "",
            'json',
            new Date().getTime(),
            osv,
            '750_1334',
            0
        ]
    }

    for(var item in obj){
        arrKey.push(item.toString());
        arrValue.push(obj[item]);
    }

    for (let i = 0; i < arrKey.length; i++) {
        for (let j = 0; j < arrKey.length - i - 1; j++) {
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
    for (let i = 0; i < arrKey.length; i++) {
        strObj[arrKey[i]] = arrValue[i]
    }
    for (let p in strObj) {
        string += p + '=' + strObj[p]
    }
    var sign = md5(string).toUpperCase();
    console.log(string)
    strObj.sign = sign
    return strObj
}

let md5 = (str="") => crypto.createHash('md5').update(str, 'utf8').digest('hex')

let dataVersion =(str, obj={}) => {// 信息名称 以及该信息下的所有需要上传的信息
    if (obj.data_version && !window.isPrivateMode) {//如果数据版本号不为0
        if (sessionStorage.getItem('dataVersion')){//如果缓存中有版本号
            var o = JSON.parse(sessionStorage.getItem('dataVersion'))
            o[str] = obj.data_version
            sessionStorage.setItem('dataVersion', JSON.stringify(o))//改变当前的所需要信息的版本号 其余的版本号不变
        }else {
            var o = {}
            o[str] = obj.data_version
            sessionStorage.setItem('dataVersion', JSON.stringify(o))
        }
    }
}

let getDataWithSign = (opt)=>{
    log("get Data WithSign, opt is");
    log(opt);

    opt.updata = opt.updata||opt.data||{};
    
        if (window.isPrivateMode) {
            log('您现在在用隐身模式访问接口，请切换到常规模式')
        }
        var flag = opt.flag || 0
        var dataurl = opt.url+"?t="+Date.now();
        if (!opt.url) {
            console.warn('缺少必要url参数')
            return
        }
        let keyName = opt.keyName || md5LocalKey(opt.url,opt.updata);
        var success1 = opt.success
        var data = ""
        var error1 = opt.error
        var obj = opt.updata

        obj = obj||{};
        for(var i=0,d;d = ["rp",'rl','logDp'][i++];){
            var tmp_value = window.Units&&Units.getQuery(d);
            if(tmp_value){
                obj[d]=tmp_value;
            }
        }

        var updatas = strSign(keyName, flag, obj)
    log('ajax－>', dataurl)
    
    $.ajax({
        type : "POST",
        url : dataurl, //数据地址
        data : updatas,//获得了所有信息 店铺地址 版本号 等 flag来确定是否传入版本号
        dataType: 'json',
        success : function(result) {
            // data.data = false;
            if (!window.isPrivateMode) {//如果不是隐身模式，能在本地存储
                //如果版本号相同，取本地的数据，下拉的时候每次的版本号都不一样 不走这一步
                // if (sessionStorage.getItem('dataVersion') && JSON.parse(sessionStorage.getItem('dataVersion'))[keyName] && (result.data_version === JSON.parse(sessionStorage.getItem('dataVersion'))[keyName])) {
                //     if (flag) {//如果万一 下拉数据的版本号一样 不取本地的数据 下拉false 不是下拉 true
                //         data = JSON.parse(localStorage.getItem(keyName))
                //     }else{
                //         data = result
                //     }
                // } else {//如果版本号不一样
                data = result;//取最新的数据
                if(flag){//不是下拉的时候 在本地存储
                    localStorage.setItem(keyName, JSON.stringify(result))
                }
                    // localStorage.setItem(keyName, JSON.stringify(result))
                // }
            } else {
                data = result
            }
            // dataVersion(keyName, result);//在缓存中放入最新的该链接取得数据的版本号
            success1(data);
            log("getDataWithSign "+dataurl+" success :");
            log(data);
        },
        error: function (e) {
            error1(e);
            log("getDataWithSign "+dataurl+" err :");
            log(e);
        }
    });
};




let postStatisticsData = (opt,productionData,callback)=>{
    let baseStatisticsData = {
        "ip": "",                             //ip
        "nxtime": "",                               //ng时间
        "timestamp": Date.now(),                      //日志时间
        "production": '1',                         //业务线 数据字典稍后定
        "log_source": '1',                         //日志来源 数据字典稍后定
        "user_agent": navigator.userAgent,                     //浏览器UA
        "market": "",                         //来源市场
        "uid": getUid(),      //用户id
        "session": getSession(),                        //session id
        "status": getVisitorStatus(),                             //卖家状态 (0：游客 1:买家 3:卖家)
        "device": "",                         //设备类型
        "device_id": "",                      //设备号
        "sys_version": "",                    //设备版本号
        "resolution": window.screen.width + '*' + window.screen.height,      //分辨率
        "location": "",                       //当前位置
        "app_version":  "",                    //APP版本号
        "action": '1',                             //操作action 数据字典稍后定，click，view，
        "action_type": "1",                    //操作类型（元素）
        "object_id":  "",                      //操作对象id（url）
        "production_data": {}
    };
    for(var i in opt){
        baseStatisticsData[i]=opt[i];
    }
    baseStatisticsData['production_data']=productionData;
    $.ajax({
        url: '/appapi',
        type: "post",
        data: JSON.stringify(baseStatisticsData),
        success: function (result) {
            if (result == "success_1") {
                callback && callback()
            }
        }, error: function () {

        }
    });
};

let getDvdsid = ()=>{
    let result="",list = document.cookie.split(";").filter(function(x){return x.indexOf("dvdsid")>-1});
    if(list.length){
        result = list[0].split("=")[1];
    }
    return result;
};

let getSession = (dvdsid=getDvdsid()) =>dvdsid?dvdsid.substr(0,32):dvdsid;

let getUid = (dvdsid = getDvdsid()) => dvdsid?(Number('0x'+dvdsid.substr(32,7))+""):dvdsid;

let getVisitorStatus = (dvdsid = getDvdsid()) => ["0","1","3"][dvdsid?dvdsid.substr(39,1):1];


let baseJumpUrl=function () {
    return {
        courseHomePage:"/course.html",
        courseIntroducePage:function (id) {
            return "/course-"+id+".html"
        },
        coursePage:function (id) {
            return "/course_room-"+id+".html"
        }
    }
};
let md5LocalKey=function (url,obj={}) {
    var str = ''//获取请求接口和业务参数的字符串
    //排除翻页游标导致的key值不一样
    var strObj = JSON.stringify(obj);
    var objStr = JSON.parse(strObj);

    if(objStr["pageIndex"]){
        objStr["pageIndex"] = 0;
    }
    for (let i in objStr){
        str +=  i + '=' + objStr[i] + '&'
    }
    str = str + url;
    str = md5(str);
    log(str);
    return str;
};

let log = function (...obj) {
    let href = location.href,dev = href.indexOf("bravetime.net")>-1,prod = href.indexOf("davdian.com")>-1;
    if(dev){
        console.log(obj);
    }else if(prod){
        if (window.logInfo) {
            window.logInfo.push(obj)
        } else {
            window.logInfo = [obj]
        }
    }
};

let initShare = function (share_source=0) {
    window.tlShareCallback = function () {
        postStatisticsData({action_type:"0",production:"5"},{share_source:share_source+"",source_url:location.href,share_type:"1"})
    }
    window.sendShareCallback = function () {
        postStatisticsData({action_type:"0",production:"5"},{share_source:share_source+"",source_url:location.href,share_type:"2"})
    }
    window.QQShareCallback = function () {
        postStatisticsData({action_type:"0",production:"5"},{share_source:share_source+"",source_url:location.href,share_type:"3"})
    }
    window.qZoneShareCallbackCancel = function () {
        postStatisticsData({action_type:"0",production:"5"},{share_source:share_source+"",source_url:location.href,share_type:"4"})
    }
};

let common = {
    getDataWithSign:getDataWithSign,
    sortObj:sortObj,
    strSign:strSign,
    dataVersion:dataVersion,
    baseJumpUrl:baseJumpUrl,
    postStatisticsData:postStatisticsData,
    md5:md5,
    md5LocalKey:md5LocalKey,
    getUid:getUid,
    getDvdsid:getDvdsid,
    log:log,
    initShare:initShare
};
export default common