import Vue from 'Vue';
let components = {};
import ua from '../../../common/js/module/ua.js';

for(let i=1;i<27;i++){
  components["item_"+i] = require('../feed/item_'+i+'.vue');
}

Vue.component('feed', {
  components:components,
  render: function (createElement) {
    let that = this;
    return createElement("section",
      {
        attrs:{
          id:that.environment+"_section"
        },
        style:{
          background:"#fff",
          fontSize:(ua.isWeiXin()&&ua.isIos())?"100px":"100px"
        }
      },
      this.feedList.map((item) => {
        let fid;
        if (typeof item === "object") {
          fid = item.id;
        } else {
          fid = item;
        }
        if (item.id == 2 || item.id == 10 || item.id == 18) {
           this.getData(item);
        }
        return createElement("div", {
          attrs:{
            name:item.anchor?encodeURI(item.anchor).toString().replace(/%/g, ""):'no_anchor_'+Math.floor(Math.random() * 1000)
          },
          "class":{
            feed_item:true
          }
        }, [
          createElement("item_" + fid, {
            props: {
              environment: that.environment,
              fid,
              itemData: item
            }
          })
        ]);
      }))
  },
  props: ["environment", 'feedList','currentEditFeed'],
  data(){
    return {}
  },
  computed:{
  },
  methods: {
    getData(item) {
      $.ajax({
        url:"/index.php?m=default&c=topic&a=ajax_goods_by_ids",
        type: "POST",
        async:false,
        data:{
          list:item.goods.replace(/，/g, ","),
          table: "goods_id,goods_name,shop_price,goods_img,market_price,goods_brief",
        },
        success:function (result) {
          result = JSON.parse(result);
          item.previewData = result.data;
          item.referer = result.referer;
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
  }
});


