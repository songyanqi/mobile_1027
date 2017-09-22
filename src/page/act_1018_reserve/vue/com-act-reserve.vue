<style  lang="sass"  rel="stylesheet/scss">
  @import "../../../common/css/common.scss";
  .reserve {
    margin-top: 10px;
    .clearfix:after {
      display: block;
      clear: both;
      content: "";
    }
    .swiper-container {
      background: #fff;
      font-size: 14px;
    }
    .swiper-slide {
      // width: 67px;
      text-align: center;
      padding: 12px 0;
    }
    .slide_bar {
      position: relative;
      display: inline-block;
      color: #ff4a7d;
    }
    .slide_bar:after {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      bottom: -12px;
      border-bottom: 2px solid #ff4a7d;
    }
    .bookCont {
      padding: 5px 5px 0 5px;
    }
    .bookNav {
      // display: -webkit-box;
      // display: -webkit-flex;
      // display: flex;
      // margin: 0 5px;
    }
    .bookList {
      float: left;
      width: calc(50% - 10px);
      // -webkit-box-flex: 1;
      // -webkit-flex: 1;
      // flex: 1;
      background: #fff;
      box-radius: 5px;
      margin: 5px 5px; 
      overflow: hidden;
    }
    .bookImg {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .bookName {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #666;
      font-size: 12px;
      height: 28px;
      margin: 10px 10px 0 10px;
      line-height: 14px;
    }
    .bookPrice {
      font-size: 14px;
      padding: 5px 0 10px 10px;
      .f12 {
        font-size: 12px;
      }
    }
    .advancePrice {
      color: #FF4A7D;
      font-size: 0;
      padding: 0 0 13px 10px;
      .a_tips {
        font-size: 12px;
      }
      .a_price {
        font-size: 18px;
      }
    }
    .bookBtn {
      line-height: 18px;
      color: #fff;
      font-size: 12px;
      padding: 3px 0;
      margin: 0 10px 15px 10px;
      background: linear-gradient(to right, #FF5B5B, #FA1862);
      background: -moz-linear-gradient(right, #FF5B5B, #FA1862);
      background: -o-linear-gradient(right, #FF5B5B, #FA1862);
      background: -webkit-linear-gradient(left, #FF5B5B, #FA1862);
      border-radius: 15px;
      text-align: center;
    }
    .noMore {
      font-size: 12px;
      color: #666;
      text-align: center;
      padding: 10px 0;
    }
    .reserveHead {
      width: 100%;
      vertical-align: top;
    }
  }
</style>
<template>
	<div class = "reserve">
    <div><img class = "reserveHead" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/goodsDetail/reserve_header.png"></div>
		<!-- 头部 -->
		<div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click = "handleNav(item,index)" v-for = "(item,index) in bookNavList">
          <div class="item" :class = "{ slide_bar: currentIdx === index }">{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class = "bookCont clearfix">
  		<div class = "bookList" v-for = "(item,index) in singleList" @click = "handleList($event, item, index)">
  			<div class = "bookImg">
  				<img v-lazy="item.imageUrl">
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
      <!-- <div class = "noMore">没有更多啦</div> -->
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
        bookSwiper: null,
  		}
  	},
    props: ['response'],
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
              that.bookSwiper = new Swiper('.swiper-container', {
                slidesPerView: swiper_num,
                grabCursor: true,
                initialSlide: that.currentIdx - 2
              });
            } else {
              that.bookSwiper = new Swiper('.reserve .swiper-container', {
                slidesPerView: length,
                grabCursor: true,
              });
            }
            
          })
        },
        deep: true
      },
      // singleList: {
      //   handler() {
      //     this.singleList.map((item,index) => {
      //       let imageIdx = item.imageUrl.indexOf(".jpg")+4;
      //       if (imageIdx == -1) {
      //         imageIdx = item.imageUrl.indexOf(".png")+4;
      //       }
      //       if (imageIdx == -1) {
      //         imageIdx = item.imageUrl.indexOf(".jpeg")+5;
      //       }
      //       item.imageUrl = item.imageUrl.substr(0,imageIdx);
      //     })
      //   },
      //   deep: true,
      // }
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
        let shopUrl = `/${item.goodsId}.html`;
        this.handleJump(shopUrl);
  		},
  		getData() {
  			let that = this;
        let datas = this.response.data.book;
        let resArr = Object.keys(datas);
        resArr.map((item) => {
          that.bookNavList.push(datas[item].typeName);
          that.bookDataList.push(datas[item].dataList);
        });
        that.singleList = that.bookDataList[0];
  		},
  		// 头部导航
  		handleNav(item,index) {
        this.currentIdx = index;
        console.log(index);
        this.bookSwiper.slideTo(Math.max(0, index - 2));
  			this.bookDataList.map((item,idx) => {
  				if (index == idx) {
  					this.singleList = item;
  				}
  			});
  		},
  	},
  }
</script>
