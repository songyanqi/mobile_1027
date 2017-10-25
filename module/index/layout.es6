// var crypto = require('crypto');
import md5 from 'crypto-js/md5.js';
var common = require('../common/common.es6');
import utils from '../../utils/utils.es6';
import $ from '$';

let config = {
  feed:  '/api/m/index/index?t=' + Date.now(),
  // feed:  '../data/index/index.json',
  like: '/api/m/index/guess?t=' + Date.now(),
  sign: '/api/m/index/sign?t=' + Date.now(),
  advert: '/api/m/index/advert?t=' + Date.now(),
  cart: '/api/m/index/cart?t=' + Date.now(),
  statistics: '/appapi',
  arrList: [location.href.split("/").slice(0,3).join("/"), document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, navigator.userAgent, 'json', new Date().getTime(), 'web_h5_*_*', '750_1334', JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
}


let strSign = (str, obj) => {
  let strObj = sortObj(str, obj)
  var str = ''
  for (let i in strObj){
      str +=  i + '=' + encodeURIComponent(strObj[i]) + '&'
  }
  return str
}

let sortObj = (dataVersion, obj) => {
    obj = obj||{};
    for(var i=0,d;d = ["rp",'rl','logDp','dp'][i++];){
        var tmp_value = utils.utils.getQuery(d);
        if(tmp_value){
            obj[d]=tmp_value.replace(/[ +]/g,"");
        }
    }

  let string = ''
  var strObj = {}
  let t = null
  let tValue = null
  let arrKey = ['shop_url','sess_key','device_token','format','ts','osv','wh','data_version']
  // 测试
  // let arrValue = ['http://haba.davdian.com/', 'b63b64c250150b505ab0e8219325ef80adb73835', "", 'json', new Date().getTime(), 'web_h5_*_*', '750_1334', (JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion])?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
  // 线上
  var osv = "web_h5_"+utils.utils.getAppVersion_new()+"_*";
  if(window.Units&&Units.isApp()&&Units.isIOS()){
    osv = "web_ios_"+utils.utils.getAppVersion_new()+"_*";
  }
  if(window.Units&&Units.isApp()&&Units.isAndroid()){
      osv = "web_android_"+utils.utils.getAppVersion_new()+"_*";
  }
  // let arrValue = [location.host, document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', (JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion])?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
  let arrValue = [location.href.split("/").slice(0,3).join("/"), document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', 0]
  if (obj){
    for(let p in obj){
      arrKey.push(p)
      arrValue.push(obj[p])
    }
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
  // var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
  var sign = md5(string).toString().toUpperCase();
  strObj.sign = sign
  return strObj
}

let dataVersion =(str, obj={}) => {
  if (obj.data_version) {
    if (sessionStorage.getItem('dataVersion')){
      var o = JSON.parse(sessionStorage.getItem('dataVersion'))
      o[str] = obj.data_version
      sessionStorage.setItem('dataVersion', JSON.stringify(o))
    }else {
      var o = {}
      o[str] = obj.data_version
      sessionStorage.setItem('dataVersion', JSON.stringify(o))
    }
  }
}

let api = (url, obj = {}) => {
  let path = ''
  if (sessionStorage.history) {
    path = JSON.parse(sessionStorage.history)[JSON.parse(sessionStorage.history).length-2] && JSON.parse(sessionStorage.history)[JSON.parse(sessionStorage.history).length-2].path
  }
	if (!url && typeof url != 'string') {
		console.warn('请求地址为空或格式不正确')
		return
	}
	let method = obj.method || 'GET'
	let urlF = url
	
	let dataObj = {
		credentials:"include",
    mode:'cors',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
		method: method.toUpperCase()
	}
	if (obj.data) {
    dataObj.body = obj.data
  }
	if (sessionStorage.getItem('dvdSessionKeyFlag') && path == window.tj_path) {
		if (localStorage.getItem(url)) {
			return Promise.resolve(JSON.parse(localStorage.getItem(url)))
		} else {
			return fetch(urlF, dataObj)
		        .then(response => response.json())
		        .then(data => {
		            if (data.code === 0) {
			            localStorage.setItem(url, JSON.stringify(data))
			            return Promise.resolve(data)
		        	} else {
		        		return Promise.reject(data)
		        	}
		        })
		}
	} else {
		return fetch(urlF, dataObj)
	        .then(response => response.json())
	        .then(data => {
	        	if (data.code === 0) {
                sessionStorage.setItem('dvdSessionKeyFlag', true)
		            localStorage.setItem(url, JSON.stringify(data))
		            return Promise.resolve(data)
	        	} else {
	        		return Promise.reject(data)
	        	}
	        })
	}
}

let apiNoSave = (url, obj = {}) => {
  if (!url && typeof url != 'string') {
    console.warn('请求地址为空或格式不正确')
    return
  }
  let method = obj.method || 'GET'
  let urlF = url
  
  let dataObj = {
    credentials:"include",
    mode:'cors',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: method.toUpperCase()
  }
  if (obj.data) {
    dataObj.body = obj.data
  }
  return fetch(urlF, dataObj)
          .then(response => response.json())
          .then(data => {
            if (data.code === 0) {
              return Promise.resolve(data)
            } else {
              return Promise.reject(data)
            }
          })
}
let sStorageCover = (str, obj) => {
  if (!obj){
    return '参数错误'
  } else {
    sessionStorage.setItem(str, JSON.stringify(obj))
  }

}

let sStorageSet = (str, obj) => {
  if (!obj){
    return '参数错误'
  } else {
    if (sessionStorage.getItem(str)){
      let o = JSON.parse(sessionStorage.getItem(str));
      for (let p in obj){
        o[p] = obj[p]
      }
      sessionStorage.setItem(str, JSON.stringify(o))
    } else {
      sessionStorage.setItem(str, JSON.stringify(obj))
    }
  }
}

let sStorageGet = (str, key) => {
  if (key){
    if (sessionStorage.getItem(str)){
      if (JSON.parse(sessionStorage.getItem(str))[key] || JSON.parse(sessionStorage.getItem(str))[key]==0){
        return JSON.parse(sessionStorage.getItem(str))[key]
      } else {
        // console.warn('不存在'+key+'在'+ str+'的sessionStorage中')
        return false
      }
    } else {
      // console.warn('不存在'+str+'sessionStorage')
      return false
    }
  } else {
    if (sessionStorage.getItem(str)){
      return JSON.parse(sessionStorage.getItem(str))
    } else {
      // console.warn('不存在'+str+'sessionStorage')
      return false
    }
  }
}

/*
function Storage () {
  var tracking = (function () {
    var listeners = {}
    var listening = false

    function listen () {
      if (window.addEventListener) {
        window.addEventListener('storage', change, false)
      } else if (window.attachEvent) {
        window.attachEvent('onstorage', change)
      } else {
        window.onstorage = change
      }
    }

    function change (e) {
      if (!e) {
        e = window.event
      }
      var all = listeners[e.key]
      if (all) {
        all.forEach(fire)
      }

      function fire (listener) {
        listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri)
      }
    }

    function on (key, fn) {
      if (listeners[key]) {
        listeners[key].push(fn)
      } else {
        listeners[key] = [fn]
      }
      if (listening === false) {
        listen()
      }
    }

    function off (key, fn) {
      var ns = listeners[key]
      if (ns.length > 1) {
        ns.splice(ns.indexOf(fn), 1)
      } else {
        listeners[key] = []
      }
    }

    return {
      on: on,
      off: off
    }
  })()

  var ls = 'localStorage' in window && window.localStorage

  function accessor (key, value) {
    if (arguments.length === 1) {
      return get(key)
    }
    return set(key, value)
  }

  function get (key) {
    return JSON.parse(ls.getItem(key))
  }

  function set (key, value) {
    try {
      ls.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  function remove (key) {
    return ls.removeItem(key)
  }

  function clear () {
    return ls.clear()
  }

  accessor.set = set
  accessor.get = get
  accessor.remove = remove
  accessor.clear = clear
  accessor.on = tracking.on
  accessor.off = tracking.off

  return accessor
}
let isJson = (obj = {}) => {
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
  return isjson;
}



let getFromDate = (obj = {}) => {
  var str = ''
  for (let i in obj){
    if (isJson(obj[i])){
      str += '&' + i + '={' + getFromDate(obj[i]) +'}'
    } else {
      str += '&' + i + '=' + obj[i] || "null"
    }
  }
  return str
}
*/
let statistics = (obj = {},callback = null) => {
  let host = config.statistics
  var feedList = JSON.parse(localStorage.getItem('feedList'));
  !feedList && (feedList = {});
  !feedList.sess_key && (feedList.sess_key = common.default.getDvdsid());
  // getDvdsid
  let listData = {
    "ip": "",                             //ip
    "nxtime": "",                               //ng时间
    "timestamp": new Date().getTime(),                      //日志时间
    "production": obj.production || '0',                         //业务线 数据字典稍后定
    "log_source": '1',                         //日志来源 数据字典稍后定
    "user_agent": navigator.userAgent,                     //浏览器UA
    "market": "",                         //来源市场
    "uid": parseInt(feedList.sess_key.substring(feedList.sess_key.length-8,feedList.sess_key.length-1), 10).toString(),      //用户id
    "session": feedList.sess_key.substring(0,feedList.sess_key.length-8),                        //session id
    "status": feedList.visitor_status,                             //卖家状态 (0：游客 1:买家 3:卖家)
    "device": "",                         //设备类型
    "device_id": "",                      //设备号
    "sys_version": "",                    //设备版本号
    "resolution": window.screen.width + '*' + window.screen.height,      //分辨率
    "location": "",                       //当前位置
    "app_version": feedList.data_version || "",                    //APP版本号
    "action": '1',                             //操作action 数据字典稍后定，click，view，
    "action_type": "1",                    //操作类型（元素）
    "object_id": obj.objectId || "",                      //操作对象id（url）
    "production_data": {                     //详细信息
      "action": obj.action || '1',                              //1：点击
      "action_type":  obj.action_type || "1",                       //1：模板
      "object_id": obj.objectId || "",                          //模板id
      "period":obj.period || "",                            //停留时长 毫秒
      "page":obj.page || "",                       //1：首页 2：详情页 3购物车 4搜索空   猜你喜欢位置
      "menu_id":obj.menu_id || "",                               //输出menu_id
      "goods_id":obj.goods_id || "",                              //详情页输出goods_id
        "feed":{
            "itemPosition": obj.itemPosition || "",                  //整个feed item的位置，透传服务端下发的position
            "tplId": obj.tplId || "",                             //模板Id
            "type": obj.type || "",                 //title or body
            "dataPosition": obj.dataPosition || "",                   //当前点击的内容在body中的位置，透传服务端下发的position，title无此字段
            "cmdContent": obj.cmdContent || "",                      //动作：点击，来自feed中的command->content
            "imgUrl": obj.imgUrl || "",                         //当前点击imgUrl，可以为空
            "cmdLog":obj.cmdLog||""
        },
    }
  }
  try{
    $.ajax({
      url:host,
        type:"post",
        data:JSON.stringify(listData),
        success:function (result) {
        if(result=="success_1"){
            callback&&callback()
        }
        },error:function () {
            
        }
    });

  }catch (e){
      console.error(e);
  }

}

/**
 * 点击统计
 * @param item
 * @param scope
 * @param type
 */
let clickAnalysis = (item,scope,type)=>{
    let href,imgUrl="",$a,position=0,done=false;
    let target = item.target;
    let $target = $(target);

    // 是A标签直接获取链接
    if(target.tagName=="A"){
        $a = $target;
    }else{
        $a = $target.parents("a");
    }
    if($a.length){
        href = $a.get(0).href||$a.get(0).href2;
        position = $a.attr("position")||"";
    }

    // 找img
    let $img = $a.find("img");
    if($img.length){
        imgUrl = $img.attr("src");
    }

    // 找log
    var cmdLog="";
    var curItem = scope.data.body.dataList.filter(function(x){
        return x.position==position;
    });
    if(curItem.length){
        cmdLog = curItem[0].command.log;
    }

    if (href) {
        let tplId = scope.data[type].tplId||"";

        let objStatistics = {
            "objectId": tplId,
            "itemPosition":scope.data.position||"",
            "tplId":tplId,
            "type":type,
            "dataPosition":position.toString(),
            "cmdContent":href,
            "imgUrl":imgUrl,
            "cmdLog":cmdLog
        };
        layout.statistics(objStatistics,function () {
            if(!done){
              done = true;
                bravetime.goto(href);
            }
        });

        setTimeout(function () {
            if(!done){
                done = true;
                bravetime.goto(href);
            }
        }, 200);
    }
    event.preventDefault();
};

let styleObject =(data) =>{
  if(data&&data.body&&data.body.bgColor){
    let bgColor = data.body.bgColor;
    return {
      backgroundColor: "#" +
      bgColor.slice(2, 8)
    }
  }else{
    return{
      backgroundColor:"#f0f0f0"
    }
  }
}
let styleObjectDvk =(data) =>{
  if(data&&data.body&&data.body.bgColor){
    let bgColor = data.body.bgColor;
    return {
      backgroundColor: "#" +
      bgColor.slice(2, 8)
    }
  }else{
    return{
      backgroundColor:"#ffffff"
    }
  }
}

let sort = (data) =>{
  for(let i = 0 ; i < data.body.dataList.length; i++){
    for(let j = 0 ; j < data.body.dataList.length - 1; j++){
      if(parseInt(data.body.dataList[j].position) > parseInt(data.body.dataList[j + 1].position)){
        let temp = data.body.dataList[j];
        data.body.dataList[j] = data.body.dataList[j+1];
        data.body.dataList[j + 1] = temp;
      }
    }
  }
}


let layout = {
	api: api,
  apiNoSave: apiNoSave,
  sortObj: sortObj,
  config: config,
  statistics: statistics,
  dataVersion: dataVersion,
  strSign: strSign,
  styleObject: styleObject,
  styleObjectDvk:styleObjectDvk,
  sort:sort,
  clickAnalysis:clickAnalysis,
  sStorageCover:sStorageCover,
  sStorageSet:sStorageSet,
  sStorageGet:sStorageGet
}

export default layout
