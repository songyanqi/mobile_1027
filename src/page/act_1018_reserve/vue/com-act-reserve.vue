<template>
	<div class = "reserve">
		<!-- 头部 -->
		<div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click = "handleNav(item,index)" v-for = "(item,index) in bookNavList">
          <div class="item">{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class = "bookCont">
    	<!-- <div class = "bookNav"> -->
    		<div class = "bookList" v-for = "(item,index) in singleList">
    			<div class = "bookImg" data-id = "item.linkUrl" @click = "handleListImg($event)">
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
    	<!-- </div> -->
    </div>
	</div>
</template>
<script type="text/javascript">
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';

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
  		}
  	},
  	created() {
  		this.getData();
  	},
  	mounted() {
  		// 初始化轮播tab
      this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: this.tabIndex,
      });
  	},
  	watch: {

  	},
  	methods: {
  		handleList(e) {
  			console.log(e.target);
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
  		// 每个商品跳转链接
  		handleListImg(e) {
  			console.log(3,e);
  		},
  		// 头部导航
  		handleNav(item,index) {
  			this.bookDataList.map((item,idx) => {
  				if (index == idx) {
  					this.singleList = item;
  				}
  			});
  		},
  	},
  }
</script>