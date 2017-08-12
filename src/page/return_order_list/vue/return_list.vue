<template>
	<div class = "order_list_container" v-if = "response">
    <div v-if = "list.length">
  		<div class="order_list_item dav-shadow" v-for = "(item,index) of list">
          <!--店铺信息-->
          <div class="order_name">
              <!--店铺名-->
              <a :href="item.shopUrl">
                  <span class="shop_icon"></span>
                  <span class="shop_title">{{ item.shopName }}</span>
                  <span class="shop_arrow"></span>
              </a>
              <!--退货单状态-->
              <span class="pull-right color3">{{ item.status }}</span>
              <span class="pull-right mg5 color3">{{ item.cusTypeDec }}</span>
          </div>
          <!--订单内容-->
          <a v-if = "item.goodsList && item.goodsList.length == 1" 
              @click = "handleClick(item)"
              href = "javascript:void(0)"
          	  class="order_good_list single_good">
              <div class="img_container" v-for = "nav of item.goodsList">
                  <div class="img_container_inner">
                      <span><img style="display: inline" :src="nav.imageUrl" /></span>
                  </div>
                  <div class="order_good_info_container">
                      <div class="order_good_name" >
                          {{ nav.title }}
                      </div>
                      <div class="order_good_price">
                          ¥ {{ nav.nowPrice }} X {{ nav.goodsNum }}
                      </div>
                  </div>
              </div>
          </a>
          <a class="orderImgList" 
          @click = "handleClick(item)"
          v-else>
          	<span class = "imgList" v-for = "nav of item.goodsList">
          		<img :src="nav.imageUrl" alt="">
          	</span>
          </a>
          <!--退款信息-->
          <div class="order_buttons">
              <div style="float: right;">
                  退款金额：
                  <span class="span-right dav-red">¥ {{ item.refundMoney }}</span>
              </div>
              <div style="float: right;margin-right: 10px">
                  实付金额：
                  <span class="span-right">¥ {{ item.paidMoney }}</span>
              </div>
              <div style="clear: both"></div>
          </div>
      </div>
      <div v-if = "loading" class="no_more">
          商品加载中 <img src="//pic.davdian.com/free/loading_03252.svg">
      </div>
      <div class = "noMore" v-if = "page > 1 && noMore">没有更多啦</div>
    </div>
    <div v-else>
      <div class="center">
        <div class="theEndPageWoman"></div>
        <div class = "center mt_10 c6">暂无记录</div>
      </div>
    </div>
	</div>
</template>
<script>
import layout from "../../../../module/index/layout.es6";
import popup from '../../../common/js/module/popup.js';
import native from '../../../common/js/module/native.js';
import common from '../../../common/js/common.js';

	export default {
		data() {
			return {
				pageSize: 5,
				page: 1,
				response: null,
				list: [],
				noMore: false,
        isAjax: true,
        loading: true,
			}

		},
		mounted() {
			this.getMoreData();
      let scrollTop = sessionStorage.getItem("afterSaleTop");
		},
		created() {
			this.getData();
		},
		methods: {
      // 是否为mobile
      isMobile() {
        let ua = navigator.userAgent;
        return !!ua.match(/Mobile/i);
      },
      isapp() {
        let u = navigator.userAgent
        return !!u.match(/davdian|bravetime|vyohui/);
      },
      // 跳转方式
      handleJump(url) {
        if (this.isapp()) {
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
      //判断是取消订单还是售后订单
      handleClick(item) {
        if (item.customerType == 2) {
          this.handleJump(`/refund-${item.subId}.html`);
        }
        if (item.customerType == 1) {
          this.handleJump(`/return_progress.html?cancelId=${item.subId}`);
        }
      },
			// 触底加载另一页
			getMoreData() {
				let that = this;
				window.addEventListener('scroll',function () {
          if (!that.noMore) {
  					if (document.documentElement.clientHeight + document.body.scrollTop >= document.body.clientHeight * 0.95) {
  						that.getData();
  					}
          }
				},false);
			},
			getData() {
				let that = this;
        let queryObj = layout.strSign('returnOrderList',{
           _t:Date.now()+Math.random(),
            pageSize: that.pageSize,
            pageIndex: that.page
        });
        if (that.isAjax) { 
          that.isAjax = false;
          that.loading = true;
  				$.ajax({
            url: '/api/mg/order/afterCustomer/list',
            dataType: "JSON",
            type: "POST",
            data: queryObj,
            success(res) {
              common.checkRedirect(res);
              that.isAjax = true;
              that.loading = false;
            	if (res.code == 0) {
                that.response = res;
  	          	that.list = that.list.concat(res.data.list);
                that.page++;
                if (res.data.list.length != that.pageSize) {
                  that.noMore = true;
                }
  	          } else {
                popup.toast(res.data.msg);
              }
            },
            error(err) {
              that.isAjax = true;
              that.loading = false;
            	// console.log(err);
            	// let data = require("../json/return_list.json").data.list;
            	// that.list = that.list.concat(data);
            	// console.log(data);
            }
          });
        }
			}
		}
	}
</script>