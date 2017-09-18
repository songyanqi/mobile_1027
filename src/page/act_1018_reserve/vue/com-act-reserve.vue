<template>
	<div class = "reserve">
		<!-- 头部 -->
		<div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click = "handleNav(item,index)" v-for = "(item,index) in bookNavList">
          <div class="item" :class = "{ slide_bar: currentIdx === index }">{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class = "bookCont">
  		<div class = "bookList" v-for = "(item,index) in singleList" @click = "handleList($event, item, index)">
  			<div class = "bookImg" data-id = "item.linkUrl">
  				<img data-id = "item.linkUrl" src="http://pic.davdian.com/supplier/2017/06/20/1000_1000_e1a9869947141510a8743e6c002553c1.jpg?x-oss-process=image/resize,m_fill,w_320,h_320/format,webp">
  			</div>
  			<div class = "bookName">{{ item.goodsName }}</div>
  			<div class = "bookPrice"><span class = "f12">¥ </span>{{ item.shopPrice }}</div>
  			<div class = "advancePrice">
    			<span class = "a_tips">定金 ¥ </span>
    			<span class = "a_price">{{ item.advancePrice }} </span>
    			<span class = "a_tips">(抵扣 ¥ {{ item.discountPrice }})</span>
  			</div>
  			<div class = "bookBtn">立即预定</div>
  		</div>
      <div class = "noMore">没有更多啦</div>
    </div>
	</div>
</template>
<script type="text/javascript">
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import native from '../../../common/js/module/native.js';

  export default {
  	components: {

  	},
  	data () {
  		return {
  			bookNavList: [],
  			// 全部list
  			bookDataList: [],
  			// 单个list
  			singleList: [],
        currentIdx: 0,
  		}
  	},
  	created() {
  		this.getData();
  	},
  	watch: {
      bookNavList: {
        handler() {
          let that = this;
          let length = this.bookNavList.length;
          this.$nextTick(() => {
            let swiper_num = window.screen.width / 67;
            if (length > swiper_num) {
              this.swiper = new Swiper('.swiper-container', {
                slidesPerView: swiper_num,
                grabCursor: true,
                initialSlide: that.currentIdx - 2
              });
            } else {
              this.swiper = new Swiper('.swiper-container', {
                slidesPerView: length,
                grabCursor: true,
              });
            }
            
          })
        },
        deep: true
      }
  	},
  	methods: {
      isApp() {
        let u = navigator.userAgent;

        return !!u.match(/davdian|bravetime|vyohui/);
      },
      // 是否为mobile
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      // 跳转方式
      handleJump(url) {
        this.isapp = this.isApp();
        if (this.isapp) {
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
  		handleList(e,item,index) {
        this.handleJump(item.linkUrl);
  		},
  		getData() {
  			let that = this;
  			$.ajax({
  				url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/upload',
  				type: "POST",
  				dataType: "JSON",
  				success(res) {
  					res.data.map((item) => {
  						that.bookNavList.push(item.typeName);
  						that.bookDataList.push(item.dataList);
  					});
  					that.singleList = res.data[0].dataList;
  				},
  				error(err) {
  					console.log(err);
  				}
  			})
  		},
  		// 头部导航
  		handleNav(item,index) {
        this.currentIdx = index;
        console.log(index);
        this.swiper.slideTo(Math.max(0, index - 2));
  			this.bookDataList.map((item,idx) => {
  				if (index == idx) {
  					this.singleList = item;
  				}
  			});
  		},
  	},
  }
</script>