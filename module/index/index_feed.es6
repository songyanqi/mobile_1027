import * as bd_slide_0 from './feed/bd_slide_0.vue'
import * as bd_icon_0 from './feed/bd_icon_0.vue'
import * as bd_broadcast_0 from './feed/bd_broadcast_0.vue'
import * as bd_timer_0 from './feed/bd_timer_0.vue'
import * as bd_timer_1 from './feed/bd_timer_1.vue'
import * as bd_goods_0 from './feed/bd_goods_0.vue'
import * as bd_goods_1 from './feed/bd_goods_1.vue'
import * as bd_image_0 from './feed/bd_image_0.vue'
import * as bd_image_1 from './feed/bd_image_1.vue'
import * as bd_image_2 from './feed/bd_image_2.vue'
import * as bd_image_3 from './feed/bd_image_3.vue'
import * as bd_image_4 from './feed/bd_image_4.vue'
import * as bd_image_5 from './feed/bd_image_5.vue'
import * as bd_image_6 from './feed/bd_image_6.vue'
import * as bd_image_7 from './feed/bd_image_7.vue'
import * as bd_image_8 from './feed/bd_image_8.vue'
import * as bd_image_9 from './feed/bd_image_9.vue'
import * as bd_image_10 from './feed/bd_image_10.vue'
import * as bd_goods_2 from './feed/bd_goods_2.vue'
import * as bd_goods_6 from './feed/bd_goods_6.vue'
import * as bd_goods_5 from './feed/bd_goods_5.vue'
import * as bd_goods_7 from './feed/bd_goods_7.vue'
import * as bd_menu_0 from './feed/bd_menu_0.vue'
import * as tt_com_0 from './feed/tt_com_0.vue'
import * as tt_com_1 from './feed/tt_com_1.vue'
import * as bd_web_0 from './feed/bd_web_0.vue'
import * as cover_0 from './feed/cover_0.vue'
import * as title_0 from './feed/title_0.vue'
import * as popularity_0 from './feed/popularity_0.vue'
import * as course_desc_0 from './feed/course_desc_0.vue'
import * as fire_work from "./feed/fire_work.vue"
import * as bd_course_1 from './feed/dvk1.vue'
import * as bd_course_1_1 from './feed/dvk2.vue'
import * as bd_course_2 from './feed/dvk3.vue'
import * as bd_course_6 from './feed/dvk4.vue'
import * as bd_vlive_2 from './feed/dvk5.vue'
import * as bd_mama_course_2 from './feed/dvk6.vue'
import * as bd_goods_3 from './feed/bd_goods_3.vue'
import * as bd_ts_0 from './feed/bd_ts_0.vue'
import * as bd_ts_prod_0 from './feed/bd_ts_prod_0.vue'
import * as bd_ts_goods_0 from './feed/bd_ts_goods_0.vue'
import * as bd_ts_title_0 from './feed/bd_ts_title_0.vue'

//单图模板
import * as bd_image_1_2 from './feed/bd_image_1_2.vue'
import * as bd_image_1_3 from './feed/bd_image_1_2.vue'
//四图八图模板
import * as bd_image_4_2 from './feed/bd_image_4_2.vue'
import * as bd_goods_4 from './feed/bd_goods_4.vue'
//介绍页系列课模版
import * as bd_course_info_series_0 from './feed/bd_course_info_series_0.vue'
//听课笔记
import * as bd_course_notes_0 from './feed/bd_course_notes_0.vue'

export default{
  data(){
    return {
      m: "m",
      tsfeedsData: []
    }
  },
  props: ['data'],
  /**
   *
   * @自上而下 根据不同的模块提供不同的数组
   */
  computed: {
    dataList: function () {
      return this.data || []
    },
  },
  mounted: function () {

  },
  created: function () {

  },
  render: function (createElement) {
    var that = this;
    return createElement("section", this.data.map(function (item, index) {
      if (item.body != undefined) {
        // if (item.body.isTimeshop) {
        //   that.tsfeedsData[index] = Object.assign({}, item);
        // }
        if (item.body.tplId == "bd_ts_0") {
          for (var i = 0; i < item.body.dataList.length; i++) {
            if (item.body.dataList[i].selected) {
              that.timeshopActId = item.body.dataList[i].timeshopActId;
            }
          }
          return createElement(item.body.tplId, {
            props: {
              data: item
            },
            on: {
              tsfeed: that.tsfeedup
            }
          })
        } else {
          return createElement(item.body.tplId, {
            props: {
              data: item
            }
          })
        }
      } else if (item.body == undefined && item.title != undefined) {
        return createElement(item.title.tplId, {
          props: {
            data: item
          },
          on: {
            refresh: that.refresh
          }
        })
      }
    }))
  },
  updated: function () {
    this.initSwiper();
  },
  methods: {
    refresh(){
      this.$emit('refresh');
    },
    tsfeedup: function (target) {
      var that = this;
      var positions = 0,
        indexs = 0; //有几个限时购模板
      for (let i = 0; i < that.data.length; i++) {
        if (that.data[i].body) {
          if (that.data[i].body.isTimeshop) {
            indexs++;
            if(positions == 0){
              positions = that.data[i].position;
            }
          }
        }
      }
      Array.prototype.splice.apply(that.data, [(+positions + 1), (+indexs -1)].concat(target));
      that.data = JSON.parse(JSON.stringify(that.data));
    },
    initSwiper(){

    },
    /**
     * 点击统计
     */
    clickAnalysis: function () {
      $('a').on("click", function (event) {
        var me = this,
          $el = $(me);
        var href = $el.attr("href");
        if (href) {
          setTimeout(function () {
          }, 150);
        }
        event.preventDefault();
      });
    }
  },
  components: {
    bd_slide_0,
    bd_icon_0,
    bd_broadcast_0,
    bd_timer_0,
    bd_timer_1,
    bd_goods_0,
    bd_image_0,
    bd_image_1,
    bd_image_2,
    bd_image_3,
    bd_image_4,
    bd_image_5,
    bd_image_6,
    bd_image_7,
    bd_image_8,
    bd_image_9,
    bd_image_10,
    bd_goods_2,
    bd_goods_1,
    bd_menu_0,
    tt_com_0,
    tt_com_1,
    bd_web_0,
    cover_0,
    title_0,
    popularity_0,
    course_desc_0,
    fire_work,
    bd_course_1,
    bd_course_1_1,
    bd_course_2,
    bd_course_6,
    bd_vlive_2,
    bd_mama_course_2,
    bd_image_1_2,
    bd_image_1_3,
    bd_image_4_2,
    bd_goods_3,
    bd_course_info_series_0,
    bd_goods_4,
    bd_ts_0,
    bd_ts_prod_0,
    bd_ts_goods_0,
    bd_ts_title_0,
    bd_course_notes_0,
    bd_goods_5,
    bd_goods_6,
    bd_goods_7,
    'ad-banner': require('../../src/page/goodsDetail/vue/ad-banner.vue'),
  }
}

