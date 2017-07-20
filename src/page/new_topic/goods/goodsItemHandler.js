let axios = require("axios");
require('es6-promise').polyfill();
let __DEBUG = window.__DEBUG||location.href.indexOf("localhost")>-1;
import WebStorageCache from 'web-storage-cache';
let topicCache = new WebStorageCache({storage: 'sessionStorage'});
export default {
  init:function(data){
    return data.goods.split(",").map(function(item){
      return {goods_id:item}
    });
  },
  handler: function (data,{limit=4,el}) {
    return new Promise(function (resolve, reject) {
      const goodsIds = data.goods;
      let con = document.getElementById("vux_view_box_body");
      if (goodsIds && goodsIds.length) {
        const requestGoods = goodsIds.replace(/，/g, ",");
        let cacheGoods = topicCache.get("topic_goods_" + requestGoods);
        if (false) {
          resolve(cacheGoods);
        } else {
          if(el){
           if(getPosition(el)<100){
            getData();
          }else{
            con.addEventListener("scroll",function(){
              if(getPosition(el)<100){
                getData();
              }
            });
          }
        }
      }
    }

    function getData(){
      if(data.finish){
        return;
      }
      data.finish = true;
      const requestGoods = goodsIds.replace(/，/g, ",");
      let url = "/index.php?m=default&c=topic&a=ajax_goods_by_ids";
      if(__DEBUG){
        url = "/dvd/index.php?m=default&c=topic&a=ajax_goods_by_ids"
      }
      axios.request({
        url,
        method: 'post',
        params: {
          list: requestGoods,
          table: "goods_id,goods_name,shop_price,goods_img,market_price,goods_brief"
        }
      })
      .then(function (res) {
        let refer = res.data.referer, str = "";
        if (refer) {
          str += "?";
          for (let i in refer) {
            str += i + "=" + refer[i] + "&";
          }
        }
        if (refer && res.data.data) {
          res.data.data.forEach(function (x) {
            x.url = '/' + x.goods_id + ".html" + str;
          });
        }
        if(res.data.data){
          res.data.data.forEach(function (x) {
            let prices = (x.shop_price+"").split(".");
            x.price=[prices[0]];
            if(prices.length===2){
              x.price[1]='.'+prices[1];
            }else{
              x.price[1]=null;
            }
          });
        }
        resolve(res.data);
        topicCache.set("topic_goods_" + requestGoods, res.data);
      })
      .catch(function (err) {
        reject(err);
      });
    }

    function getPosition(el){
      if(con){
        return el.offsetTop-con.offsetHeight-con.scrollTop;
      }else{
        return 0;
      }
    }

  })
  }
}
