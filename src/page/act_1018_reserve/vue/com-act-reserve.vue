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
    	<div class = "bookNav">
    		<div class = "bookList">
    			<div class = "bookImg">
    				<img src="http://pic.davdian.com/supplier/2017/06/20/1000_1000_e1a9869947141510a8743e6c002553c1.jpg?x-oss-process=image/resize,m_fill,w_320,h_320/format,webp">
    			</div>
    			<div class = "bookName">棕色的熊，棕色的熊，棕色的熊，棕色的熊，棕色的熊，棕色的熊棕色的熊棕色的熊</div>
    			<div class = "bookPrice"><span class = "f12">¥ </span>260</div>
    			<div class = "advancePrice">
	    			<span class = "a_tips">定金 ¥ </span>
	    			<span class = "a_price">10 </span>
	    			<span class = "a_tips">(抵扣 ¥ 60)</span>
    			</div>
    			<div class = "bookBtn">立即预定</div>
    		</div>
    		<div class = "bookList"></div>
    	</div>
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
  			bookDataList: [],
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
  		getData() {
  			let that = this;
  			$.ajax({
  				url: 'https://www.easy-mock.com/mock/59b9230be0dc663341a8ce57/upload',
  				type: "POST",
  				dataType: "JSON",
  				success(res) {
  					res.data.map((item) => {
  						that.bookNavList.push(item.typeName);
  					})
  				},
  				error(err) {
  					console.log(err);
  				}
  			})
  		},
  		handleNav(item,index) {
  			console.log(item,index);
  		},
  	},
  }
</script>