var axios = require("axios");
var crypto = require('crypto')
require('es6-promise').polyfill();
import util from "./utils.es6"
let strSign =  (obj) => {
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
  if(window.Units&&Units.isApp()&&Units.isIOS()){
    osv = "web_ios_"+util.utils.getAppVersion_new()+"_*";
  }
  if(window.Units&&Units.isApp()&&Units.isAndroid()){
      osv = "web_android_"+util.utils.getAppVersion_new()+"_*";
  }
  let arrValue = [location.href.split("/").slice(0,3).join("/"), document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0]?document.cookie.split(';').filter(function(x){return x.indexOf("dvdsid")>-1})[0].split("=")[1]:0, "", 'json', new Date().getTime(), osv, '750_1334', 0]
  if (obj){
    for (let p in obj){
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
  var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
  strObj.sign = sign
  return strObj
}
let isPrivateMode = () => {
	try {
	  	localStorage.setItem('isPrivateMode', '1')
	  	localStorage.removeItem('isPrivateMode')
		return true
	} catch (e) {
	  	return false
	}
}

let api = (url,o,key) =>{
	let obj = o || {}
	if (key && isPrivateMode && sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key))){
		return new Promise(function (resolve, reject) {
			resolve(JSON.parse(sessionStorage.getItem(key)));
		});
	}else {
    let urlT = url + '?' +new Date().getTime()
		return axios.post(urlT,strSign(obj))
	    .then(function (respone) {
			if (key && isPrivateMode)
			sessionStorage.setItem(key, JSON.stringify(respone.data))
			return respone.data
	    })
	}
}
export default api
