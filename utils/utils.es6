// var crypto = require('crypto')
import md5 from 'crypto-js/md5.js';

let utils = {};
let u = navigator.userAgent
utils.getQuery = function (name) {
    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
}
export const getQuery = function (name) {
    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
}
utils.isInisWechatOrApp = function (name) {
    if (utils.isApp() || utils.isWechat()){
      return true
    } else {
      return false
    }
}
export const isInisWechatOrApp = utils.isInisWechatOrApp

utils.isIOS = function(){
    if(u.match(/ios/i)) {
        return true;
    }
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};
utils.isMobileIOS = function () {
    return /iPhone|iPad|iPod/i.test(u);
};
utils.getAppVersion = function () {
    // 空格分所有
    var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) ||
        u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) ||
        u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
    if(versionStr == null){
        return 0;
    }else{
        var v = versionStr[2].split(".").reduce(function(a,b){return +a*10+ +b});
    }
    return +v;
};
utils.getAppVersion_new = function () {
  // 空格分所有
  var versionStr = u.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) ||
    u.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) ||
    u.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
  if(versionStr == null){
    return 0;
  }else{
    var v = versionStr[2];
  }
  return v;
};
utils.isAndroid = function () {
    if(u.match(/(android|linux)/i)) {
        return true;
    }
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
};
utils.isApp = function () {
    return !!u.match(/davdian|bravetime|vyohui/)
};
utils.isTel = function ( t ){
    var tel = $.trim(t);
    var reg = /^1\d{10}$/;
    return reg.test( tel );
};
utils.isQQ = function(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/qq\//i)=="qq/") {
        return true;
    } else {
        return false;
    }
};
utils.isWechat = function(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
};
utils.isZipcode = function ( zipcode )
{
    var reg = /^[0-9]{6}$/; //只允许为6位数字

    return reg.test( zipcode );
};
utils.trim = function( text )
{
    if (typeof(text) == "string")
    {
        return text.replace(/^\s*|\s*$/g, "");
    }
    else
    {
        return text;
    }
};
utils.isIdcard = function ( idCard )
{
    idCard = utils.trim(idCard);               //去掉字符串头尾空格
    if (idCard.length == 15) {   
        return utils.isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
    } else if (idCard.length == 18) {   
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if (utils.isValidityBrithBy18IdCard(idCard) && utils.isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
            return true;   
        } else {   
            return false;   
        }   
    } else {   
        return false;   
    }
};

let Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子   
let ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X   
/**  
 * 判断身份证号码为18位时最后的验证位是否正确  
 * @param a_idCard 身份证号码数组  
 * @return  
 */  
utils.isTrueValidateCodeBy18IdCard = function(a_idCard) {
    var sum = 0;                          
    if (a_idCard[17].toLowerCase() == 'x') {   
        a_idCard[17] = 10; 
    }   
    for ( var i = 0; i < 17; i++) {   
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }   
    valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {   
        return true;   
    } else {   
        return false;   
    }   
};
  
/**  
  * 验证18位数身份证号码中的生日是否是有效生日  
  * @param idCard 18位书身份证字符串  
  * @return  
  */  
utils.isValidityBrithBy18IdCard = function(idCard18) {
    var year =  idCard18.substring(6,10);   
    var month = idCard18.substring(10,12);   
    var day = idCard18.substring(12,14);   
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day), 13, 0, 0);   
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if(temp_date.getFullYear()!=parseFloat(year)   
          ||temp_date.getMonth()!=parseFloat(month)-1   
          ||temp_date.getDate()!=parseFloat(day)){   
        return false;   
    }else{   
        return true;   
    }   
};
   
/**  
 * 验证15位数身份证号码中的生日是否是有效生日  
 * @param idCard15 15位书身份证字符串  
 * @return  
 */  
utils.isValidityBrithBy15IdCard = function(idCard15) {
    var year =  idCard15.substring(6,8);   
    var month = idCard15.substring(8,10);   
    var day = idCard15.substring(10,12);   
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if(temp_date.getYear()!=parseFloat(year)   
            ||temp_date.getMonth()!=parseFloat(month)-1   
            ||temp_date.getDate()!=parseFloat(day)){   
        return false;   
    } else {   
        return true;   
    }   
}
/**  
 * 页面返回需要刷新页面方法
 * @return  
 */
utils.backReloadPage = function () {
    try{
        if (sessionStorage.getItem('history') && JSON.parse(sessionStorage.getItem('history')).length >1){
            if (JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length-1].path != JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length-2].path){
                window.location.reload()
            }
        }
    }catch(e){
        console.warn('backReloadPage报错:e->', e)
    }
}
utils.goTo = function (href) {
    location.href = href
}
/**  
 * cookies方法封装
 * 
 */
utils.getCookie = function (name) {
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
    if(arr=document.cookie.match(reg))
        return decodeURIComponent(arr[2])
    else
        return null
}
utils.getUserState = function () {
    if(utils.getCookie('dvdsid'))
        return utils.getCookie('dvdsid').substring(utils.getCookie('dvdsid').length-1, utils.getCookie('dvdsid').length)
    else 
        return null
}
export const getUserState = function () {
    if(utils.getCookie('dvdsid'))
        return utils.getCookie('dvdsid').substring(utils.getCookie('dvdsid').length-1, utils.getCookie('dvdsid').length)
    else 
        return null
}
utils.strSign = function (obj) {
  let strObj = sortObj(obj)
  var str = ''
  for (let i in strObj){
      str +=  i + '=' + strObj[i] + '&'
  }
  return str
}
export const strSign = function (obj) {
  let strObj = sortObj(obj)
  var str = ''
  for (let i in strObj){
      str +=  i + '=' + strObj[i] + '&'
  }
  return str
}

let sortObj = function (obj) {
  let string = ''
  var strObj = {}
  let t = null
  let tValue = null
  let arrKey = ['shop_url','sess_key','device_token','format','ts','osv','wh','data_version']
  var osv = "web_h5_*_*";
  if(window.Units&&Units.isApp()&&Units.isIOS()){
    osv = "web_ios_*_*";
  }
  if(window.Units&&Units.isApp()&&Units.isAndroid()){
      osv = "web_android_*_*";
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
  // var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase()
  var sign = md5(string).toString().toUpperCase();
  strObj.sign = sign
  return strObj
}
// let sort = function(data){
//   for(let i = 0 ; i < data.body.dataList.length; i++){
//     for(let j = 0 ; j < data.body.dataList.length - 1; j++){
//       if(parseInt(data.body.dataList[j].position) > parseInt(data.body.dataList[j + 1].position)){
//         let temp = data.body.dataList[j];
//         data.body.dataList[j] = data.body.dataList[j+1];
//         data.body.dataList[j + 1] = temp;
//       }
//     }
//   }
// }
export const savebackData = function (obj) {
  if (obj['_data']){
    localStorage.setItem('backData', JSON.stringify(obj['_data']))
  }else{
    localStorage.setItem('backData', JSON.stringify(obj))
  }
}

export const getbackData = function (obj, top) {
  try{
    if (sessionStorage.getItem('history') && JSON.parse(sessionStorage.getItem('history')).length>1 && JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length-1] != 'other' && JSON.parse(sessionStorage.getItem('history'))[JSON.parse(sessionStorage.getItem('history')).length-2] == 'other'){
      if (localStorage.getItem('backData') && JSON.parse(localStorage.getItem('backData'))){
        obj['_data'] = JSON.parse(localStorage.getItem('backData'))
        for (p in JSON.parse(localStorage.getItem('backData'))){
          obj[p] = JSON.parse(localStorage.getItem('backData'))[p]
        }
        window.scroll(0, JSON.parse(localStorage.getItem('backData'))[top])
        localStorage.removeItem('backData')
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }catch(e){
    console.warn('getbackData:'+e)
    return false
  }
}

export const isTryShop = function () {
  const shopName = location.href.split("/")[2].split(".")[0];
  return shopName === "bravetime";
};


export default {
    utils
}
