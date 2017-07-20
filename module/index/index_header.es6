export default{
  props: ['data', 'initCategory', 'list', 'menumore', 'initcate', 'usersta'],
  data(){
    return {
      msg: 'hello vue'
    }
  },
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
    var that = this;
    that.$nextTick(function () {
      that.init();
    });
    this.changeinit()
  },
  mounted: function () {
    var that = this;
    that.$nextTick(function () {
      that.init();
    });
    this.changeinit()
  },
  updated(){
    var that = this;
    that.$nextTick(function () {
      that.init();
    })
  },
  methods: {
    turn: function (event) {
      window.location = this.head.search.command.content
    },
    init(){
      var select = 0
      var length = this.list.length;
      var that = this;
      if (length) {
        for (var i = 0; i < length; i++) {
          if (this.list[i].id == this.initcate) {
            select = i;
          }
        }
        this.$nextTick(function () {
          console.log("二极管",length);
          if (that.menumore) {
            if (length > 5) {
              this.menu = new Swiper('.v_menu', {
                slidesPerView: 5.5,
                grabCursor: true,
                initialSlide: select - 2
              });
            } else {
              this.menu = new Swiper('.v_menu', {
                slidesPerView: length - 1,
                grabCursor: true
              });
            }
          } else {
            if (length > 5) {
              this.menu = new Swiper('.v_menu', {
                slidesPerView: 5.5,
                grabCursor: true,
                initialSlide: select - 2
              });
            } else {
              this.menu = new Swiper('.v_menu', {
                slidesPerView: length,
                grabCursor: true
              });
            }
          }

        })
      }
    },
    changeinit(){
      var that = this
      window.addEventListener('orientationchange', function (event) {
        if (window.orientation == 180 || window.orientation == 0) {
          setTimeout(function () {
            that.init();
          }, 300)
        }
      });
    },
    changeCategory(category, index){
      this.initCategory = index
      this.$emit('categorya', category, index)
      this.menu.slideTo(Math.max(0, index - 2));
    },
  }
  // ready:function(){
  //     this.$http.get('url').then(data => {
  //         this.data=data;
  //     });
  // }
}
