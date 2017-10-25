export default {
  data() {
    return {
      msg: 'hello vue',
      swiperIndex: 0,
      cate:this.getQuery("menuId") || 8,
      top0:{}
    }
  },
  props: ['data', 'menudata', 'usersta','styleList'],
  computed: {
    styleArr:function(){
      return this.styleList || {};
    },
    cart: function () {
      return this.data.cart || 0;
    },
    tag: function () {
      return this.data.tag.body && this.data.tag.body.dataList
    },
    background: function () {
      return this.data.tag.bgColor || '#ffffff'
    },
    head: function () {
      return this.data.head || {}
    }
  },
  components: {},
  created: function () {

  },
  mounted: function () {
     console.log(this.data.top);
    // this.mergeStyle(this.styleArr["top0"],{ top: - this.data.top + 'px' });
  },
  updated: function () {
    var that = this;
    that.init();
  },
  watch: {
    menudata: function () {
      var that = this;
      that.init()
    }
  },
  methods: {
    mergeStyle(obj1,obj2){
      var result=obj1 || {};
      for(var key in obj2){
        result[key]=obj2[key];
      }
      return result;
    },
    turn: function (event) {
      window.location = this.head.search.command.content
    },
    init: function () {
      var that = this;

      if (!that.menudata.menuList) {
        return false;
      }
      var length = that.menudata.menuList.length;
      for (var i = 0; i < length; i++) {
        if (that.menudata.menuList[i].id == that.cate) {
          that.swiperIndex = i;
        }
      }
      this.$nextTick(function () {
        var swiper_num = window.screen.width / 59;

        if (length > swiper_num) {
          this.menuswiper = new Swiper('#v_menu', {
            slidesPerView: swiper_num,
            grabCursor: true,
            initialSlide: that.swiperIndex - 2
          });
        } else {
          this.menuswiper = new Swiper('#v_menu', {
            slidesPerView: length,
            grabCursor: true
          });
        }
      })
    },
    changeinit() {

    },
    changeCategory(category, index) {
      var scope = this;
      var str = location.origin;
      if (index) {
        str = location.origin + '?menuId=' + category;
      }
      history.replaceState("", "", str);
      this.cate = category;
      scope.$emit('categorya', category, index);
      scope.menuswiper.slideTo(Math.max(0, index - 2));
    },
    getQuery: function (name) {
      var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.match(reg)
      if (r != null) return decodeURIComponent(r[2]);
      return null
    }
  },
  ready: function () {
    this.$http.get('url').then(data => {
      this.data = data;
    });
  }
}
