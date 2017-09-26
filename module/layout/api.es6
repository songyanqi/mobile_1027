// var crypto = require('crypto')
import md5 from 'crypto-js/md5.js';
import util from "../../utils/utils.es6"
let config = {
  feed:  '/api/m/index/index?t=' + Date.now(),
  like: '/api/m/index/guess?t=' + Date.now(),
  sign: '/api/m/index/sign?t=' + Date.now(),
  advert: '/api/m/index/advert?t=' + Date.now(),
  cart: '/api/m/index/cart?t=' + Date.now(),
  statistics: '/appapi',
  arrList: [location.href.split("/").slice(0,3).join("/"), document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, navigator.userAgent, 'json', new Date().getTime(), 'web_h5_*_*', '750_1334', JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
}


let strSign = (obj) => {
  let strObj = sortObj(obj)
  var str = ''
  for (let i in strObj){
      str +=  i + '=' + strObj[i] + '&'
  }
  return str
}

let sortObj = (obj) => {
  let string = ''
  var strObj = {}
  let t = null
  let tValue = null
  let arrKey = ['shop_url','sess_key','device_token','format','ts','osv','wh','data_version']
  var osv = "web_h5_"+util.utils.getAppVersion_new()+"_*";
  let dataVersion = obj.str
  if(window.Units&&Units.isApp()&&Units.isIOS()){
    osv = "web_ios_"+util.utils.getAppVersion_new()+"_*";
  }
  if(window.Units&&Units.isApp()&&Units.isAndroid()){
      osv = "web_android_"+util.utils.getAppVersion_new()+"_*";
  }
  let arrValue = []
  if (dataVersion){
    arrValue = [location.href.split("/").slice(0,3).join("/"), document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', (JSON.parse(sessionStorage.getItem('dataVersion')) && JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion])?JSON.parse(sessionStorage.getItem('dataVersion'))[dataVersion]:0]
  } else {
    arrValue = [location.href.split("/").slice(0,3).join("/"), document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', 0]
  }
  if (obj.obj){
    for (let p in obj.obj){
      arrKey.push(p)
      arrValue.push(obj.obj[p])
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
let api = (url, obj, callback) => {
  if (!url && typeof url != 'string') {
    console.warn('请求地址为空或格式不正确')
    return
  }
  if (!callback){
    callback = obj
  }
    obj.data = obj.data||{};
    for(var i=0,d;d = ["rp",'rl','logDp','dp'][i++];){
        var tmp_value = window.Units&&Units.getQuery(d);
        if(tmp_value){
            obj.data[d]=tmp_value;
        }
    }
  let strSign = {
    str: obj.signStr,
    obj: obj.data
  }

  $.ajax({
    type : obj.method || "POST",
    url : url,
    data : layout.strSign(strSign),
    dataType: 'json',
    success : function(result) {
       callback(result)
    },
    error: function (e) {
        console.log(url+"接口请求失败！！！Oops, error", e)
    }  
  })

}

let apiFetch = (url, obj = {}) => {
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
      let o = JSON.parse(sessionStorage.getItem(str))
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

let statistics = (obj = {},callback = null) => {
  let host = config.statistics
  var feedList = JSON.parse(localStorage.getItem('feedList'))
  let listData = {
    "ip": "",                             //ip
    "nxtime": "",                               //ng时间
    "timestamp": new Date().getTime(),                      //日志时间
    "production": '8',                         //业务线 数据字典稍后定
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
    "action_type": obj.actionType || "0",                    //操作类型（元素）
    "object_id": obj.objectId || "",                      //操作对象id（url）
    "production_data": {                     //详细信息
      "action": '1',                              //1：点击
      "action_type": obj.actionType ||  "0",                       //1：模板
      "object_id": obj.listId+"" || ""
        // "feed":{
        //     "itemPosition": obj.itemPosition || "",                  //整个feed item的位置，透传服务端下发的position
        //     "tplId": obj.tplId || "",                             //模板Id
        //     "type": obj.type || "",                 //title or body
        //     "dataPosition": obj.dataPosition || "",                   //当前点击的内容在body中的位置，透传服务端下发的position，title无此字段
        //     "cmdContent": obj.cmdContent || "",                      //动作：点击，来自feed中的command->content
        //     "imgUrl": obj.imgUrl || ""                         //当前点击imgUrl，可以为空
        // }
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
            "actionType": "2"
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
let statisticsShare = (obj, callback) => {
  var host = '/appapi'
  var feedList = JSON.parse(localStorage.getItem('feedList'))
  var listData = {
    "ip": "",                             //ip
    "nxtime": "",                               //ng时间
    "timestamp": new Date().getTime(),                      //日志时间
    "production": '8',                         //业务线 数据字典稍后定
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
    "action": '2',                             //操作action 数据字典稍后定，click，view，
    "action_type": "2",                    //操作类型（元素）
    "object_id": obj.objectId || "",                      //操作对象id（url）
    "production_data": {                     //详细信息
      "action": '2',                              //1：点击
      "action_type": "2",                       //1：模板
      "object_id": window.tj_id+"" || "",
      "share_type": obj.shareType,
      "share_source": obj.shareSource
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
        },error:function (e) {
            console.log(e)
        }
    });
  }catch (e){
      console.error(e);
  }
}


let layout = {
  sortObj: sortObj,
  dataVersion: dataVersion,
  strSign: strSign,
  sort:sort,
  api:api,
  sStorageCover:sStorageCover,
  sStorageSet:sStorageSet,
  sStorageGet:sStorageGet,
  statistics:statistics,
  clickAnalysis:clickAnalysis,
  statisticsShare:statisticsShare
}

export default layout
