import * as tt_com_0 from './tt_com_0.vue'
import layout from "../layout.es6"

export default {
  data(){
    return {
      msg: 'hello vue',
      wrapline: 0
    }
  },
  props: ['data'],
  created: function () {
    /**
     * 数据排序
     */
    layout.sort(this.data);

    // 商品图片左右滚动
    this.$nextTick(function () {
      var pmwidth = document.documentElement.dataset.width;
      if (this.data.body.tplId == 'bd_ts_goods_0') {
        var goodnum = pmwidth / 122;
        new Swiper('.related-item-list2', {
          slidesOffsetBefore: 10,
          slidesPerView: goodnum,
          spaceBetween : 10,
          paginationClickable: true,
          freeMode: true,
          lazyLoading: true
        });
      } else {
        var goodnum = pmwidth / 110;
        new Swiper('.related-item-list', {
          slidesOffsetBefore: 10,
          slidesPerView: goodnum,
          paginationClickable: true,
          freeMode: true,
          lazyLoading: true
        });
      }
      var text = this.data.body.dataList;
      var num = 0;
      for (var i = 0; i < text.length; i++) {
        if (text[i].title.length > 8) {
          num++;
        }
      }
      if (num > 0) {
        this.wrapline = 1;
      } else {
        this.wrapline = 0;
      }
    })
  },
  computed: {
    styleObject: function () {
      let scope = this;
      return layout.styleObject(scope.data);
    },
    styleTop: function () {
      let scope = this;
      if (scope.data.body.tplId == "bd_goods_2") {

      }
      return {
        marginTop: scope.data.marginTop + 'px',
        borderBottom: 'none'
      }
    },
    wrapline: function () {
      let text = this.data.body.dataList;
      let num = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i].title.length > 8) {
          num++;
        }
      }
      if (num > 0) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  components: {
    tt_com_0: tt_com_0
  },
  methods: {
    imgObject: function (imgSrc) {
      return {
        src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
        error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
        loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
      }
    },
    clickAnalysis: function (item) {
      layout.clickAnalysis(item, this, 'body');
    }
  }
}
