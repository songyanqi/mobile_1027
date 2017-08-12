export default {
  data() {
    return {
      msg: 'hello vue',
      swiperIndex: 0
    }
  },
  props: ['data', 'menudata', 'initCategory', 'initcate', 'usersta'],
  computed: {
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
    },
    category: function () {
      return this.initCategory + 0
    },
    cate: function () {
      return this.initcate
    }
  },
  components: {},
  created: function () {

  },
  mounted: function () {

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
        if (that.menudata.menuList[i].id == that.initcate) {
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
      // var that = this;
      // window.addEventListener('orientationchange', function (event) {
      //   if (window.orientation == 180 || window.orientation == 0) {
      //     setTimeout(function () {
      //       that.init();
      //     }, 300)
      //   }
      // });
    },
    changeCategory(category, index) {
      this.initCategory = index;
      this.$emit('categorya', category, index);
      this.menuswiper.slideTo(Math.max(0, index - 2));
    },
  },
  ready: function () {
    this.$http.get('url').then(data => {
      this.data = data;
    });
  }
}
