<style  lang="sass"  rel="stylesheet/scss">
  @import "../../../common/css/common.scss";
  .reserve {
    margin-top: 0.1rem;
    .clearfix:after {
      display: block;
      clear: both;
      content: "";
    }
    .swiper-container {
      background: #FF6582;
      font-size: 14px;
    }
    .swiper-slide {
      text-align: center;
      padding: 15px 0;
      background: #FF6582;
      color: #fff;
      .item {
        line-height: 20px;
      }
    }
    .slide_bar {
      color: #FF6582;
      background: #fff;
    }
    .bookCont {
      padding: 0.05rem;
      box-sizing: border-box;
    }
    .bookList {
      float: left;
      width: 1.72rem;
      background: #fff;
      border-radius: 0.05rem;
      margin: 0.05rem 0.05rem; 
      overflow: hidden;
    }
    .bookImg {
      position: relative;
      width: 100%;
      height: 1.74rem;
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
      font-size: 0.12rem;
      height: 0.28rem;
      margin: 0.1rem 0.1rem 0 0.1rem;
      line-height: 0.15rem;
    }
    .bookPrice {
      font-size: 0.14rem;
      padding: 0.05rem 0 0.08rem 0.1rem;
      .f12 {
        font-size: 0.12rem;
      }
    }
    .advancePrice {
      color: #FF4A7D;
      font-size: 0;
      padding: 0 0 0.1rem 0.1rem;
      .a_tips {
        font-size: 0.12rem;
      }
      .a_price {
        font-size: 0.18rem;
      }
    }
    .bookBtn {
      line-height: 0.18rem;
      color: #fff;
      font-size: 0.12rem;
       padding: 0.03rem 0;
      margin: 0 0.1rem 0.15rem 0.1rem;
      background: linear-gradient(to right, #FF5C5C, #FA1862);
      background: -moz-linear-gradient(right, #FF5C5C, #FA1862);
      background: -o-linear-gradient(right, #FF5C5C, #FA1862);
      background: -webkit-linear-gradient(left, #FF5C5C, #FA1862);
      border-radius: 0.15rem;
      text-align: center;
    }
    .noMore {
      font-size: 0.12rem;
      color: #666;
      text-align: center;
      padding: 0.1rem 0;
    }
    .reserveHead {
      width: 100%;
      vertical-align: top;
    }
    .reserveHead_cont {
      position: relative;
    }
    .reserveRole {
      display: block;
      position: absolute;
      width: 100px;
      height: 20px;
      right: 16%;
      bottom: 27%;
    }
    .good_list_sell_out {
      font-size: 15px;
      color: #fff;
      background-color: rgba(0,0,0,.7);
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      line-height: 0.6rem;
      top: 50%;
      position: absolute;
      z-index: 2;
      left: 50%;
      margin-top: -0.3rem;
      margin-left: -0.3rem;
      text-align: center;
    }
  }
  // 动画
  @keyframes com-alert-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .com-popup-base2 {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    line-height: 1;
  }

  .com-popup-base2 .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .com-popup-base2 .table-cell .box {
    display: inline-block;
    border-radius: 0.04rem;
    animation: com-alert-animation 0.5s;
    width: 73.333%;
    min-height: 200px;
    position: relative;
    text-align: center;
    background-color: #FFFFFF;
    padding: 0 0 15px;
    color: #FF4A7D;
    /*max-height: 4rem;*/
    /*overflow-y: scroll;*/
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1) {
    font-size: 14px;
    text-align: center;
    padding: 12px 0;
    position: relative;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) {
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px 0;
    max-height: 4rem;
    overflow-y: scroll;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(3) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    width: 36px;
    height: 36px;
    background-image: url("../img/clearInput.png");
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(2) p {
    display: inline-block;
    margin-top: 10px;
  }

  .com-popup-base2 .table-cell .box div:nth-of-type(1):after {
    content: "";
    display: block;
    position: absolute;
    left: -50%;
    width: 200%;
    height: 1px;
    background: rgba(216, 216, 216, 0.51);
    -webkit-transform: scale(0.5);
    bottom: 0;
    z-index: 1;
  }
</style>
<template>
	<div class = "reserve">
    <div class = "reserveHead_cont">
    <span @click = "handleReserveRole" class = "reserveRole"></span>
    <img class = "reserveHead" src="http://mamaj-oss.oss-cn-beijing.aliyuncs.com/free/goodsDetail/reserve_icon.jpg">
    </div>
		<!-- 头部 -->
		<div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :class = "{ slide_bar: currentIdx === index }" @click = "handleNav(item,index)" v-for = "(item,index) in bookNavList">
          <div class="item">{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class = "bookCont clearfix">
  		<div class = "bookList" v-for = "(item,index) in singleList" @click = "handleList($event, item, index)">
  			<div class = "bookImg">
  				<img v-lazy="item.imageUrl">
          <div v-if = "item.shopStocks == '0'" class = "good_list_sell_out ng-scope">
            <div class = "ng-scope">售罄</div>
          </div>
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
    <!--查看规则-->
    <div v-if="rule_form" class="com-popup-base2" @click="rule_form = false">
      <div class="table-cell">
        <div v-show="rule_form" class="box" @click.stop="events">
          <div>预定规则</div>
          <div>
            <p>1.预定时间：2017.10.14 00:00:00-2017.10.17 23:59:59；</p>
            <p>2.尾款结算时间：2017.10.18 00:00:00-2017.10.18 23:59:59；</p>
            <p>3.预定期间，用户支付预定金并成功预定指定商品，在10月18日当天可享定金膨胀的优惠，定金膨胀后实际抵扣的金额以预定时实际约定的抵扣金额为准；例如：某品牌洁面仪大V售价100元，预定金20可抵40元使用，小明妈在2017.10.15日支付定金20元，成功预定了该洁面仪，在10月18日当天仅需支付60元即可获得该商品；</p>
            <p>4.定金是否退回？如果在10月18日当天未及时结算预定商品的尾款，定金将不予退回；</p>
            <p>5.购买或销售预定商品且成功结算尾款，会员将额外获得每件10元的奖励，奖励金额（退货订单除外）将于11月1日以返现方式发放；</p>
            <p>6.详情可咨询大V店客服。</p>
          </div>
          <div @click="close_what_invite"></div>
        </div>
      </div>
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
        rule_form: false,
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
            let screenWidth = document.body.clientWidth;
            if (screenWidth == 0) {
              screenWidth = document.documentElement.clientWidth;
            }
            let swiper_num = screenWidth / 67;
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
      rule_form: function () {
        var that = this;
        if (that.rule_form) {
          if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
          } else if (document.body) {
            this.scrollTop = document.body.scrollTop;
          }
          document.body.style.top = -this.scrollTop + 'px';
          document.body.classList.add("bodyFix");

        } else {
          document.body.classList.remove("bodyFix");
          $(document).scrollTop(this.scrollTop);

        }
      }
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
      handleReserveRole() {
        this.rule_form = true;
      },
      close_what_invite() {
        this.rule_form = false;
      },
      events() {},
      // 是否为mobile
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      // 跳转方式
      handleJump(url) {
        this.isapp = this.isApp();
        if (this.isapp) {
          event.preventDefault();
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
      // 排序
      getSort(item1,item2) {
        return item2.sort - item1.sort;
      },
  		handleList(e,item,index) {
        if (item.childGoodsId > 0) {
          item.goodsId = item.childGoodsId;
        }
        let shopUrl = `/${item.goodsId}.html`;
        this.isapp = this.isApp();
        if (this.isapp) {
          e.preventDefault();
          native.Browser.open({
            url: shopUrl
          });
        } else if (this.isMobile()) {
          window.open(shopUrl, '_blank');
        } else {
          window.open(shopUrl, '_self');
        }
        // this.handleJump(shopUrl);
  		},
      // 排序
      getSort(item1,item2) {
        return item2.sort - item1.sort;
      },
  		getData() {
  			let that = this;
        let datas = this.response.data.book;
        let resArr = Object.keys(datas);

        resArr.map((item) => {
          that.bookNavList.push(datas[item].typeName);
          that.bookDataList.push(datas[item].dataList);
        });
        that.bookDataList[0].sort(that.getSort);
        that.singleList = that.bookDataList[0];
  		},
  		// 头部导航
  		handleNav(item,index) {
        this.currentIdx = index;
        
        this.bookSwiper.slideTo(Math.max(0, index - 2));
  			this.bookDataList.map((item,idx) => {
  				if (index == idx) {
            item.sort(this.getSort);
  					this.singleList = item;
  				}
  			});
  		},
  	},
  }
</script>
