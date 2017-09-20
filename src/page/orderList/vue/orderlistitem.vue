<style>
  .toastCont {
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    -webkit-transform:  translateX(-50%) translateY(-50%);
    -moz-transform:  translateX(-50%) translateY(-50%);
    -ms-transform:  translateX(-50%) translateY(-50%);
    -o-transform:  translateX(-50%) translateY(-50%);
    transform:  translateX(-50%) translateY(-50%);
    min-width: 100px;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 5px;
    padding: 10px;
  }
</style>
<template>
    <div v-if = 'allkind' class="order_list_item dav-shadow" v-for="item in list_type" data-for-id="{{ item.id }}" data-for = '11' data-for-delivery-id="{{item.delivery_id}}">
        <div class="order_name"><a href="{{ item.shop_url }}"><span class="shop_icon"></span><span
                class="shop_title">{{ item.shop_name }}</span><span class="shop_arrow"></span></a>
            <!--订单状态-->
            <span class="pull-right dav-red" v-show = "item.type == 2 && item.cancel_type != 1 && !item.is_new_seller_order">待发货</span>
            <span class="pull-right dav-red" v-show = "item.type == 2 && item.cancel_type != 1 && item.is_new_seller_order && item.is_expire != 1">赠品待领取</span>
            <span class="pull-right dav-red" v-show = "item.type == 4">已关闭</span>
            <span class="pull-right dav-red" v-show = "item.type == 1 && item.complete_status == 1 && !item.is_new_seller_order">已完成</span>
            <span class="pull-right dav-red" v-show = "item.type == 1 && item.complete_status == 1  && item.is_new_seller_order && item.is_expire != 1">赠品待领取</span>
            <span class="pull-right dav-red" v-show = "item.type == 2 && item.cancel_type == 1">已冻结</span>

            <span class="pull-right dav-red" v-show = "item.type == 3">待付款</span>
            <span class="pull-right dav-red" v-show = "item.type == 1 && item.shipping_status == 4">部分发货</span>
            <span class="pull-right dav-red" v-show = "item.type == 1 && item.shipping_status == 1 && item.complete_status == 0  && !item.is_new_seller_order">待收货</span>
            <span class="pull-right dav-red" v-show = "item.type == 1 && item.shipping_status == 1 && item.complete_status == 0  && item.is_new_seller_order && item.is_expire != 1">赠品待领取</span>
            <span class="pull-right dav-red" v-show = "item.is_expire && item.is_new_seller_order">已关闭</span>
            <!-- 预定商品 -->
            <span class="pull-right dav-red" v-show = "item.is_presale_order && item.presale_info == 'reserve'">待支付定金</span>
            <span class="pull-right dav-red" v-show = "item.type == 2 && item.is_presale_order && item.presale_info == 'final'">待支付尾款</span>
        </div>
        <a class="order_good_list" href="/o-{{item.order_id}}.html" v-if = '!item.is_delivery' v-bind = 'handleCurrentPage'>
            <div class="img_container">
                <div class="img_container_inner">
                    <img v-for = 'items in item.goods'
                         :src="items.goods_pic"
                         style="display: inline;">
                </div>
                <div class="order_good_info_container dav-small" v-if = "item.goods | last">
                    <div class="order_good_name" style = "word-break: break-all ">{{item.goods[0].goods_name}}</div>
                    <div class="order_good_price">￥{{ item.goods[0].goods_price }} X {{ item.goods[0].amount }}</div>
                </div>
            </div>
        </a>
        <a class="order_good_list" href="/o-{{item.order_id}}.html?did={{item.delivery_id}}" v-if = 'item.is_delivery' v-bind = 'handleCurrentPage'>
            <div class="img_container">
                <div class="img_container_inner">
                    <img v-for = 'items in item.goods'
                         :src="items.goods_pic"
                         style="display: inline;">
                </div>
                <div class="order_good_info_container dav-small" v-if = "item.goods | last">
                    <div class="order_good_name" style = "word-break: break-all ">{{item.goods[0].goods_name}}</div>
                    <div class="order_good_price">￥{{ item.goods[0].goods_price }} X {{ item.goods[0].amount }}</div>
                </div>
            </div>
        </a>
        <!-- <div class="sum">金额：<span class="payment"><span class="fz_12">￥</span>{{item.payment}}</span></div> -->
        <!-- 待预定 -->
        <div class="sum">
          <span v-if = "item.is_presale_order">
            <span>共{{ item.goods_list_num }}件</span>
            <span v-if = "item.presale_info.type == 'reserve'">
              <span>应付定金：</span>
              <span class="payment"><span class="fz_12">￥</span>{{item.presale_info.reserve_info.payment}}</span>
            </span>
            <span v-if = "item.presale_info.type == 'final'">
              <span>应付尾款：</span>
              <span class="payment"><span class="fz_12">￥</span>{{item.presale_info.final_info.payment}}</span>
            </span>
          </span>
          <span v-else>
            <span v-else>金额：</span>
            <span class="payment"><span class="fz_12">￥</span>{{item.payment}}</span>
          </span>
        </div>
        <div v-if = "item | isFinalBtn" class="order_buttons order_list_buttons clearfix">
            <!-- 预定 支付定金 -->
             <a v-show = "item | orderReserve" v-if='item.order_type !=1 && item.order_type !=2' class="dav-btn btn-white order-btn-red pull-right  order-buy-once-more" href="/checkout.html?order_id={{item.id}}">支付定金</a>
             <!-- 支付尾款，显示按钮 -->
             <a v-show = "item | orderFinalBtn" v-if='item.order_type !=1 && item.order_type !=2' class="dav-btn btn-white order-btn-red pull-right  order-buy-once-more" :href="item.pay_url">支付尾款</a>
            <!--该显示哪些信息-->
            <a v-show = "item | close" v-if='item.order_type !=1 && item.order_type !=2' class="dav-btn btn-white order-btn-red pull-right  order-buy-once-more" href="/cart.html?rebuy_order_id={{item.id}}">再次购买</a>
            <a v-show = "item | again" v-if='item.order_type !=1 && item.order_type !=2' class="dav-btn btn-white order-btn-red pull-right  order-buy-once-more" href="/cart.html?rebuy_order_id={{item.id}}">再次购买</a>
            <a v-show = "item.can_comment==1&&item.goods_list_num!=1" class="dav-btn btn-white pull-right" data-href="{{item.comment_link}}" @click="evaluatelist">评价</a>
            <a v-show = "item.can_comment==2&&item.goods_list_num!=1" class="dav-btn btn-white pull-right" data-href="{{item.comment_link}}" @click="evaluatelist">追加评价</a>
            <a v-show = "item.can_comment==1&&item.goods_list_num==1" class="dav-btn btn-white pull-right" data-href="{{item.comment_link}}" @click="evaluate">评价</a>
            <a v-show = "item.can_comment==2&&item.goods_list_num==1" class="dav-btn btn-white pull-right" data-href="{{item.comment_link}}" @click="evaluate">追加评价</a>
            <!--<a v-show = "item | confirm" class="dav-btn btn-white order-btn-red pull-right order-buy-once-more" href="/o-{{item.id}}.html?did={{item.delivery_id}}">确认收货</a>-->
            <a v-show = "item | confirm" class="dav-btn btn-white order-btn-red pull-right order-buy-once-more" @click="orderArrive">确认收货</a>
            <a v-show = "item | pay" class="dav-btn btn-white order-btn-red pull-right order-btn-pay" href="/checkout.html?order_id={{item.id}}">立即支付</a>
            <a v-show = "item | receive" class="dav-btn btn-white order-btn-red pull-right" href="/change_address.html?order_id={{item.id}}&goal=get" v-if='item.is_expire==0'>领取会员赠品</a>
            <a v-show = "item | checkship" class="dav-btn btn-white pull-right order-check-wl" href="/o-shipping-{{item.id}}.html?did={{item.delivery_id }}">查看物流</a>
            <a v-show = "item | shipping" class="dav-btn btn-white pull-right order-check-wl" href="/o-shipping-{{item.id}}.html?did={{item.delivery_id }}">查看物流</a>
            <a class="dav-btn btn-white pull-right order-delete-order" v-if='(item.is_expire==1 && item.is_new_seller_order==1 && item.no_address==1)|| item.type == 4' @click = "deleteOrder">删除订单</a>
            <!-- <a v-show = "item | deleted" class="dav-btn btn-white pull-right order-delete-order" @click = "deleteOrder">删除订单</a> -->
            <!-- <a v-show = "item | close" class="dav-btn btn-white pull-right order-delete-order" @click = "deleteOrder">删除订单</a> -->
            <a v-show = "item | pay1" class="dav-btn btn-white pull-right" href="/index.php?c=AgentPay&a=index&order_id={{item.id}}">找人代付</a>

            <a v-show = "item | cancel" data-deliveryid="{{item.delivery_id}}" data-id="{{ item.id }}" class="dav-btn btn-white pull-right  order-cancel cancle_{{ item.id }}" @click = "cancelOrder">取消订单</a>

            <a v-show = "item | cancel1" class="dav-btn btn-white pull-right  btn-disable">取消审核中</a>
            <a v-show = "item | cancel2" class="dav-btn btn-white pull-right  btn-disable">取消成功</a>
            <a v-show = "item | cancel3" class="dav-btn btn-white pull-right  btn-disable">取消失败</a>
            <!-- 申请售后 -->
            <a v-show = "item | applySale" data-deliveryid="{{item.delivery_id}}" data-id="{{ item.id }}" class="dav-btn btn-white pull-right" @click="orderApplay">申请售后</a>
            <!-- 售后进度 -->
            <a v-show = "item | applyProgress" data-deliveryid="{{item.delivery_id}}"  data-id="{{ item.id }}" data-cancel-id = "{{ item.cancel_id }}" class="dav-btn btn-white pull-right cancle_{{ item.id }}" @click="afterSale">查看售后进度</a>
        </div>
        <!-- 支付尾款，显示日期 -->
        <div v-show = "item | orderFinal" class="order_presale"><span v-if = "item.presale_info && item.presale_info.final_info">{{ item.presale_info.final_info.paytime_start | changeDate }}</span> 开始支付尾款</div>

    </div>
    <div class="order_list_item type_4 dav-shadow" v-if = 'other'>
        <ul class="be_evaluated_list">
            <li v-for = 'item in list_type' data-goods_id="{{item.goods_id}}">
                <a href="/{{item.goods_id}}.html" class="goods_pic">
                    <img :src = 'item.goods_img'>
                </a>
                <div class="goods_con">
                    <a  href="/{{item.goods_id}}.html"  class="goods_title">{{ item.goods_name }}</a>
                    <a data-href="/grade-{{item.delivery_id}}-{{item.goods_id}}.html" @click="evaluate" class="evaluate_btn pull-right" data-dav-tj="order_list|grade|grade|1|grade@order_list">评价</a>
                </div>
            </li>
        </ul>
    </div>
    <div v-show = 'loading' class="refresh">
        <div class="uil-default-css-normal" style="-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;"><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;"></div><div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;"></div></div>
        <div>数据加载中...</div>
    </div>
    <div v-show = 'no_more' class="refresh">没有更多{{word}}</div>
      <!-- 取消订单弹框 -->
    <div class="modalMask" @click = "handleCloseModal" :class = "{ showMask: isModal }"></div>
      <div class="modaOrderlWrapper" v-show = "isModal">
        <div class="modalCloseWrapper" @click = "handleCloseModal">
            <span class="modal-close"></span>
        </div>
        <div class = "modalTitle">请选择取消订单的理由</div>
        <div class = "modalCont" v-if = "reasonData">
          <label
            :data-id = "item.reasonId" 
            v-for = "item of reasonData.data.reasonList" 
            class = 'navLabel'
            :for="item.reasonId">
          <div 
              @click = "handleReason"
              :data-name = "item.reasonName" 
              :data-id = "item.reasonId" 
              class = 'navList'>
            <div :data-name = "item.reasonName" 
              :data-id = "item.reasonId"
              class = "flex1">{{ item.reasonName }}</div>
            <div>
              <input class = 'reasonIpt'
               :data-name = "item.reasonName" 
               :data-id = "item.reasonId"
               :id = "item.reasonId" 
               type='radio' name = 'reason'>
              <i></i>
            </div>
          </div>
        </label>
        </div>
        <div @click = "handleConfirm" class = "disabledModal" :class = "{ modalConfirm: !isConfirm }">确定</div>
    </div>
    <div class = "order_toast"></div>
</template>
<script>
  import layout from "../../../../module/index/layout.es6";
  import native from '../../../common/js/module/native.js';
  // import popup from '../../../common/js/module/popup.js';

    export default{
        el:"#orderlistswitcher",
        data:function(){
            return {
                selected:0,
                list_type:{},
                word:'',
                no_more:false,
                loading:false,
                ajaxing:true,
                allkind:true,
                other:false,
                allData:[[], [], [], [], []],// 存放数据
                typePage:[1, 1, 1, 1, 1],
                refreshFlag:[0, 0, 0, 0, 0],// 下拉刷新标识
                anymore:[{flag:false},{flag:false},{flag:false},{flag:false},{flag:false}],// 下拉刷新标识

                currentType:+location.href.substr(location.href.indexOf("type=")+5,1)||0,
                preLoadFlag:[],
                refreshEndFlag:[0, 0, 0, 0, 0],
                preLoadEndFunction:null,
                refreshContainer:$(".refresh"),
                pageSize :0,
                allSwitchItem:$(".switcher_item"),
                gradeUrl:gradeUrl,
                message:'',
                // 取消原因的弹框
                isConfirm: true,
                isModal: false,
                reasonData: null,
                //是否请求过
                isReasonUrl: false,
                // 取消原因id.
                reasonId: '',
                // 订单id，当点击取消订单弹出框时用到
                dataId: "",
                //取消原因
                reasonName: "",
                isapp: false,
                // 当前时间，来判断支付尾款显示按钮还是支付时间
                currentTime: Date.now(),
            }
        },
        created:function(){
            console.log(123456);
          let that = this;
          this.isapp = this.isApp();

          if(!isPrivateMode){//浏览器中能存储session storage
              var ua = navigator.userAgent.toLowerCase();
              var patharr = JSON.parse(sessionStorage.history);//获取路径path
              if(patharr.length > 2){//从标签页直接进入也会发出请求
                  var lastPath = patharr[patharr.length-2].path;
                  if(lastPath == 'order_detail' || lastPath == 'order_delivery' || lastPath == "detail" || lastPath=="grade" || lastPath =="add_address" || lastPath=="agent_pay"||(lastPath == "cart_confirm"&&$.cookie&&!$.cookie("dvd_cart_to_confirm"))) {//判断是否是浏览器上的返回键回到这个页面
                      this.allData = eval(sessionStorage.getItem('data'));//获取session的数据
                      this.typePage = JSON.parse(sessionStorage.getItem('typePage'));
                      if (eval(sessionStorage.getItem('no_more')) != undefined) {
                          this.anymore = eval(sessionStorage.getItem('no_more'));
                      };
                      if (/iphone|ipad|ipod/.test(ua)) {
                          setTimeout(function(){
                              document.body.scrollTop = eval(sessionStorage.getItem('top'));
                          },0);
                      }
                  }else{
                      // 清空数据
                      sessionStorage.removeItem("data");
                      sessionStorage.removeItem("typePage");
                      sessionStorage.removeItem("no_more");
                  }
              }
          };
          this.scroll();
        },
        methods:{
          // 时间转换
          // 弹框弹出时给body添加fixed
          addFixed() {
            if (document.documentElement && document.documentElement.scrollTop) {
                this.scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                this.scrollTop = document.body.scrollTop;
            }

            document.body.style.top = -this.scrollTop + "px";
            document.body.classList.add("bodyFix");
          },
          // 移除fixed
          removeFixed() {
            document.body.classList.remove("bodyFix");
            document.body.scrollTop = this.scrollTop;
          },
          isApp() {
            let u = navigator.userAgent;

            return !!u.match(/davdian|bravetime|vyohui/);
          },
          isMobile() {
            let ua = navigator.userAgent;
            return !!ua.match(/Mobile/i);
          },
          // 跳转方式
          handleJump(url) {
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
          handleCloseModal() {
            this.isModal = false;
            this.removeFixed();
          },
          // 取消原因
          handleReason(e) {
            this.isConfirm = false;
            this.reasonId = e.target.getAttribute("data-id");
            this.reasonName = e.target.getAttribute('data-name');
            console.log(this.reasonName);
            $(".cancle_"+this.dataId+"").attr("reason-id",this.reasonId);
          },
          // 售后进度
          afterSale (e) {
            let cancelId = e.target.getAttribute("data-cancel-id");
            let url = `/return_progress.html?cancelId=${cancelId}`;
            this.handleJump(url);
          },
          // 申请售后
          orderApplay (e) {
            let dataId = e.target.getAttribute("data-id");
            let deliveryId = e.target.getAttribute("data-deliveryid");
            let url = `/cancle_order.html?orderId=${dataId}&deliveryId=${deliveryId}`;
            this.handleJump(url);
          },
          getDatas() {
            let that = this;
            let isDev = true;
            if (isDev) {
              if (!this.isReasonUrl) {
                $.ajax({
                  url: "/api/mg/order/cancelOrder/reasonList?_="+Date.now(),
                  type: "post",
                  dataType: "json",
                  data: layout.strSign('reasonList'),
                  success (res) {
                    console.log(res);
                    if (!res.code) {
                      that.reasonData = res;
                      that.isReasonUrl = true;
                    }
                  },
                  error (err) {
                  }
                })
              }
            } else {
              if (!this.isReasonUrl) {
                $.ajax({
                  url: "",
                  // type: "post",
                  // data: layout.strSign("createDetail",{
                  //  deliveryId: 9542093
                  // }),
                  dataType: "json",
                  success (res) {
                  },
                  error (err) {
                  }
                })
              }
            }
          },
          // 新取消订单
          cancelOrder (e) {
            this.getDatas();
            this.isModal = true;
            this.addFixed();
            this.dataId = e.target.getAttribute('data-id');
            let reasonId = e.target.getAttribute('reason-id');

            if (reasonId) {
                $(".modalCont").find("#"+ reasonId +"").prop("checked",true);
                this.isConfirm = false;
            } else {
                $(".reasonIpt").prop("checked",false);
                this.isConfirm = true;
            }
          },
          // 取消原因点击确定 /api/mg/order/cancelOrder/cancelByOrder
          handleConfirm() {
            if (this.isConfirm) {
              
            } else {
                let obj = layout.strSign('cancleOrder',{
                    reasonId: this.reasonId,
                    reasonName: this.reasonName,
                    orderId: this.dataId
                });
                let scope = this;
                let id = $(".cancle_"+scope.dataId+"").parents(".order_list_item").attr("data-for-id");
                bravetime.addLoader({little: true});
              $.ajax({
                // url: cancelOrderUrl,
                url: "/api/mg/order/order/cancel",
                dataType: "json",
                type: "POST",
                data: obj,
                success: function (result) {
                    bravetime.removeLoader();
                    if (result.code != 0 && result.code != 60499) {
                        // bravetime.info(result.data.msg);
                        // popup.toast(result.data.msg,2000);
                        document.querySelector(".order_toast").style.display = 'block';
                        let html = `<div class = 'toastCont'>${result.data.msg}</div>`;
                        $(".order_toast").html(html);
                        setTimeout(() => {
                          document.querySelector(".order_toast").style.display = 'none';
                        },3000)
                        return;
                    }
                    var info = "取消审核中";
                    if (result.code == 0) {
                        info = "取消成功";
                    } else if(result.code == 60499) {
                        info = "取消审核中";
                    }
                    var bg = $(".cancle_"+scope.dataId+"").parents(".order_buttons");
                    var og = $(".cancle_"+scope.dataId+"").parents(".order_list_item");
                    bg.find("a").remove();
                    bg.append($('<a class="dav-btn pull-right btn-white btn-disable">' + info + '</a>'));//删掉取消订单 增加取消的结果
                    if (result.code == 60499) {
                        og.find(".order_name").find(".dav-red").html("已冻结");
                        for(var j = 0 ; j < 5 ; j ++){//改变所有该id的订单
                            for(var k = 0 ; k < scope.allData[j].length ; k ++ ){
                                if(id == scope.allData[j][k].id){
                                    scope.allData[j][k].type = 2;
                                    scope.allData[j][k].cancel_type = 1;
                                }
                            }
                        }
                    }
                    if (result.code == 0) {
                        for(var j = 0 ; j < 5 ; j ++){//改变所有该id的订单变为取消成功
                            for(var k = 0 ; k < scope.allData[j].length ; k ++ ){
                                if(id == scope.allData[j][k].id){
                                    scope.allData[j][k].type = 2;
                                    scope.allData[j][k].cancel_type = 2;
                                }
                            }
                        }
                    }
                    if (result.code != 0 && result.code != 60499) {
                        for(var j = 0 ; j < 5 ; j ++){//改变所有该id的订单变为取消失败
                            for(var k = 0 ; k < scope.allData[j].length ; k ++ ){
                                if(id == scope.allData[j][k].id){
                                    scope.allData[j][k].type = 2;
                                    scope.allData[j][k].cancel_type = 3;
                                }
                            }
                        }
                    }
                    sessionStorage.setItem('data',JSON.stringify(scope.allData));
                    sessionStorage.setItem('typePage',JSON.stringify(scope.typePage));

                },
                error: function () {
                    bravetime.removeLoader();
                    bravetime.ajaxError(32);
                }
            });
              this.isModal = false;
              this.removeFixed();
            }
          },
            //取消订单
            /*cancelOrder:function () {//取消订单
                var me = event.currentTarget;
                var scope = this;
                bravetime.newConfirm("您确定要取消订单么？", {
                    okLink: function () {
                        var id = $(me).parents(".order_list_item").attr("data-for-id");
                        bravetime.addLoader({little: true});
                        $.ajax({
                            url: cancelOrderUrl,
                            dataType: "json",
                            data: {
                                id: id
                            },
                            success: function (result) {
                                bravetime.removeLoader();
                                if (result["error"]) {
                                    bravetime.info(result["msg"]);
                                } else {
                                    var info = {success: "取消成功", error: "取消失败", wait: "取消审核中"}[result["flag"]] || "取消审核中";
                                    var newValue = {success: 2, error: 3, wait: 1}[result["flag"]] || 1;
                                    var bg = $(me).parents(".order_buttons");
                                    var og = $(me).parents(".order_list_item");
                                    //this.updateDataFromMemory(id, "cancel_type", newValue);//更新缓存
                                    bg.find("a").remove();
                                    bg.append($('<a class="dav-btn pull-right btn-white btn-disable">' + info + '</a>'));//删掉取消订单 增加取消的结果
                                    if (result["flag"] == "wait") {
                                        og.find(".order_name").find(".dav-red").html("已冻结");
                                        for(var j = 0 ; j < 5 ; j ++){//改变所有该id的订单
                                            for(var k = 0 ; k < scope.allData[j].length ; k ++ ){
                                                if(id == scope.allData[j][k].id){
                                                    scope.allData[j][k].type = 2;
                                                    scope.allData[j][k].cancel_type = 1;
                                                }
                                            }
                                        }
                                    } else if (result["flag"] == "success") {
                                        // og.find(".order_name").find(".dav-red").html("已关闭");
                                        for(var j = 0 ; j < 5 ; j ++){//改变所有该id的订单变为取消成功
                                            for(var k = 0 ; k < scope.allData[j].length ; k ++ ){
                                                if(id == scope.allData[j][k].id){
                                                    scope.allData[j][k].type = 2;
                                                    scope.allData[j][k].cancel_type = 2;
                                                }
                                            }
                                        }
                                    }else if (result["flag"] == "error") {
                                        // og.find(".order_name").find(".dav-red").html("已关闭");
                                        for(var j = 0 ; j < 5 ; j ++){//改变所有该id的订单变为取消失败
                                            for(var k = 0 ; k < scope.allData[j].length ; k ++ ){
                                                if(id == scope.allData[j][k].id){
                                                    scope.allData[j][k].type = 2;
                                                    scope.allData[j][k].cancel_type = 3;
                                                }
                                            }
                                        }
                                    }
                                }
                                sessionStorage.setItem('data',JSON.stringify(scope.allData));
                                sessionStorage.setItem('typePage',JSON.stringify(scope.typePage));

                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(32);
                            }
                        });
                    }
                });
            },*/
            //删除订单
            deleteOrder:function () {
                var vm = event.currentTarget , id = $(vm).parents(".order_list_item").attr("data-for-id");
                var scope = this;
                window.bravetime.newConfirm("您确定要删除订单么？", {
                    okLink: function () {
                        bravetime.addLoader({little:true});//加载处理动画
                        $.ajax({
                            url: deleteOrderUrl,
                            // type: 'POST',
                            dataType: 'json',
                            data: {id: id},
                            success: function (result) {
                                if (result['error']) {
                                    bravetime.removeLoader();
                                    bravetime.newAlert(result["msg"]);
                                } else {
                                    if (window.debug) {
                                        setTimeout(function () {
                                            bravetime.removeLoader();
                                            $(vm).parents(".order_list_item").remove();
                                            for(var j = 0 ; j < 5 ; j ++){
                                                for(var k = 0 ; k <scope.allData[j].length ; k ++ ){
                                                    if(id == scope.allData[j][k].id){
                                                        scope.allData[j].splice(k,1);
                                                    }
                                                }
                                            }
                                            sessionStorage.setItem('data',JSON.stringify(scope.allData));
                                            sessionStorage.setItem('typePage',JSON.stringify(scope.typePage));
                                        }, 1500);
                                    } else {
                                        bravetime.removeLoader();
                                        $(vm).parents(".order_list_item").remove();
                                        for(var j = 0 ; j < 5 ; j ++){
                                            for(var k = 0 ; k <scope.allData[j].length ; k ++ ){
                                                if(id == scope.allData[j][k].id){
                                                    scope.allData[j].splice(k,1);
                                                }
                                            }
                                        }
                                        sessionStorage.setItem('data',JSON.stringify(scope.allData));
                                        sessionStorage.setItem('typePage',JSON.stringify(scope.typePage));
                                    }
                                }
                            },
                            error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(26);
                            }
                        });
                    }
                });
            },
            // 跳到评论编辑或追加评价页面1
            evaluate:function(event){
                var href = event.target.dataset.href;
                if(window.Units && Units.isApp()){
                    window.evaCallback = function () {
                        setTimeout(function () {
                            location.reload();
                        },300);
                    };
                }
               else {
                    sessionStorage.setItem('orderListRefresh',"Refresh");
                }
                bravetime.openNewPage({type:1,url:href,jsMethod:'evaCallback()'});
                //禁止默认行为
                event.preventDefault();
                return false;
            },
            // 跳到评论编辑或追加评价页面
            evaluatelist:function(){
                var href = event.target.dataset.href;
                bravetime.goto(href);
                sessionStorage.setItem('orderListRefresh', "Refresh");
                return false;
            },
            // 确认收货
            orderArrive:function(){
                var vm = event.currentTarget , id = $(vm).parents(".order_list_item").attr("data-for-delivery-id");
                window.bravetime.newConfirm("您确定收到商品了么？", {
                    okLink: function () {
                        bravetime.addLoader({little:true});
                        $.ajax({
                            url: arriveUrl,
                            dataType: "json",
                            data: {
                                id: id
                            },
                            success: function (result) {
                                bravetime.removeLoader();
                                if (result["error"] == 0) {
                                    //成功之后跳转到确认收货页面
                                    bravetime.goto(result.data.redirect_link);
                                    //一进页面在最上面代码获取下面的orderListRefresh，如果有就刷新页面
                                    sessionStorage.setItem('orderListRefresh',"Refresh");
                                } else {
                                    bravetime.info(result["msg"]);
                                }
                            }, error: function () {
                                bravetime.removeLoader();
                                bravetime.ajaxError(26);
                            }
                        });
                    }
                });
            },
            // 处理当前页面
            handleCurrentPage:function () {
                $(".order_good_list").each(function (index, el) {
                    var height = $(el).find(".img_container_inner").height();
                    var length = $(el).find(".img_container_inner").find("img").length;
                    if (height > 60) {
                        $(el).append($('<div class="pull-right text-container">共' + length + '件<br/>商品</div>'));
                        $(el).find(".img_container_inner").css({
                            "height":"60px",
                            "white-space": "nowrap",
                            "overflow-x": "scroll"
                        });
                    };
                    if(length == 1){
                        $(el).parent().find(".order_good_list").addClass("single_good");
                    }
                });
//                location.hash = 'aaa';
//                $('a').each(function(index,el){
//                    $(this).click(function(){
//                        event.stopPropagation();
//                        $('a').prev('name','');
//                        $(this).prev('name','aaa');
//                    })
//                });
            },
            //获取数据
            getData:function(){
                var scope = this;
                var orderType = scope.selected;//当前标签页下标
                 if(location.href.indexOf("localhost")>-1){
                    orderListUrl = "../data/orderListData"+orderType+".json";
                }
                var url = orderType==4?gradeUrl:orderListUrl;//地址链接
                if(scope.no_more == false){//如果数据没有被加载 加载数据
                    scope.loading = true;//显示加载动画
                    if(scope.ajaxing){
                        scope.ajaxing = false;
                        $.ajax({
                            url: url,//不同的本地json地址
                            dataType: "json",
                            data: {
                                _t:Date.now()+Math.random(),
                                type: orderType,//selected
                                page_size: scope.pageSize,
                                page: scope.typePage[orderType]//selected
                            },
                            success:function(result){
                                scope.loading = false;
                                if (!result["error"]) {//返回数据没有问题
                                    scope.preLoadFlag[orderType] = true;//
                                    scope.ajaxing = true;
                                    scope.typePage[orderType] = scope.typePage[orderType] + 1;//ajax中的参数中页数加1
                                    if (result["data"].length) {//返回函数中有数据
                                        scope.allData[orderType] = scope.allData[orderType].concat(result.data);//缓存中添加数据
                                        scope.list_type = scope.allData[orderType];
                                        sessionStorage.setItem('data',JSON.stringify(scope.allData))
                                        sessionStorage.setItem('typePage',JSON.stringify(scope.typePage))
                                    }else{
                                        scope.no_more = true;//显示 没有更多商品了
                                        scope.anymore[orderType].flag = true;
                                        sessionStorage.setItem('no_more',JSON.stringify(scope.anymore))
                                    }

                                }
                            },
                            error:function () {
                                scope.loading = false;
                                scope.ajaxing=true;
                            }
                        });
                    }
                }
            },
            //下拉刷新
            scroll:function(){
                var scope = this;
                $(window).scroll(function(){//滚动条滚动事件
                    var top = document.body.scrollTop;
                    sessionStorage.setItem('top',top);
                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置
                        if(scope.no_more == false){//如果 没有更多商品 不显示 加载数据
                            scope.getData();
                        }
                    }
                })
            },
        },
        //过滤器 显示不同的点击按钮
        filters:{
            last:function(value){
                if(value == null){
                    return false;
                }else{
                    if(value.length == 1){
                        return true;
                    }
                }
            },//只有一个商品的时候显示详细信息
            again:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 1){
                        if(value.complete_status == 1){
                            return true;
                        }else{
                            if(value.shipping_status == 1 ){
                                return false;
                            }
                        }
                    }
                }
            },//再次购买
            confirm:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 1){
                        if(value.complete_status == 1){
                            return false;
                        }else{
                            if(value.shipping_status == 1 ){
                                return true;
                            }
                        }
                    }
                }
            },//确认收货
            checkship:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 1){
                        if(value.shipping_status == 1){
                            return true;
                        }
                    }
                }
            },//查看物流
            cancel1:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 2){
                        if(value.cancel_type){
                            if(value.cancel_type == 1){
                                return true;
                            }
                        }
                    }
                }
            },//取消审核中1
            cancel2:function(value){
                // if(value.is_new_seller_order  == false){
                //     if(value.type == 2){
                //         if(value.cancel_type){
                //             if(value.cancel_type == 2){
                //                 return true;
                //             }
                //         }
                //     }
                // }
                if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
                  if (value.shipping_status != '1' && value.is_delivery) {
                      if (value.is_all_gift) {
                        if(value.cancel_type == 2){
                            return true;
                        }
                      }
                  } else {
                    if(value.is_new_seller_order  == false){
                        if(value.type == 2){
                            if(value.cancel_type){
                                if(value.cancel_type == 2){
                                    return true;
                                }
                            }
                        }
                    }
                  }
                }
            },//取消成功
            cancel3:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 2){
                        if(value.cancel_type){
                            if(value.cancel_type == 3){
                                return true;
                            }
                        }
                    }
                }
            },//取消失败
            cancel:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 2){
                        if(!value.cancel_type){
                            if(value.is_delivery == false){
                                return true;
                            }
                        }
                    }
                }
            },//取消订单
            pay:function(value){
                // if(value.is_new_seller_order  == false){
                if(value.is_new_seller_order  == false && !value.is_presale_order){
                    if(value.type == 3){
                        return true;
                    }
                }
            },
            //找人代付
            pay1:function(value){
                if(!Units.isApp()){
                    if(value.is_new_seller_order  == false){
                        if(value.type == 3){
                            return true;
                        }
                    }
                }
            },

            //找人代付 立即付款
            close:function(value){
                if(value.is_new_seller_order  == false){
                    if(value.type == 4){
                        return true;
                    }
                }
            },//再次购买 删除订单
            shipping:function(value){
                if(value.is_new_seller_order  == true){
                    if(value.type == 1 && value.new_year_order && value.order_type !=3 ){
                        if(value.shipping_status == 1 && value.is_real){
                            return true;
                        }
                    }
                }
            },//查看物流
            receive:function(value){
                if(value.is_new_seller_order && value.type == 2 && value.no_address && value.new_year_order && value.order_type != 3 && value.kd_send_goods){
                    return true;
                }
            },//领取开店礼包
            deleted:function(value){
                if(value.is_new_seller_order  == true){
                    if(value.type == 4){
                        return true;
                    }
                }
            },//删除订单
            more:function(){
                var vm =this;
                if(vm.list_type.data.length == 0 && vm.selected !=4){
                    return true;
                }
            },
            // 申请售后,先判断是否为代发货，在判断是否拆单，在判断字段
            applySale (value) {
                if (!value.is_all_gift) {
                    if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
                      if (value.is_delivery) {
                          if (!value.cancel_id) {
                              return true;
                          }
                      }
                    }
                }
            },
            // 显示售后进度
            applyProgress (value) {
                if (!value.is_all_gift) {
                    if (value.type == 2 && value.cancel_type != 1 && !value.is_new_seller_order) {
                      if (value.is_delivery) {
                          if (value.cancel_id) {
                              return true;
                          }
                      }
                    }
                }
            },
            // 支付定金,首先要pay的逻辑，要加上
            orderReserve (value) {
              if(value.is_new_seller_order  == false && value.type == 3){
                if (value.is_presale_order && value.presale_info.type == "reserve") {
                  if (Date.now() > value.create_time * 1000 + 1800000) {
                    return true;
                  }
                }
              }
            },
            // 支付尾款显示时间时不显示所有的按钮
            isFinalBtn (value) {
              if (value.is_presale_order && value.presale_info.type == "final") {
                if (Date.now() < Number(value.presale_info.final_info.paytime_start) * 1000) {
                  
                } else {
                  return true;
                }
              } else {
                return true;
              }
            },
            // 支付尾款,显示时间
            orderFinal (value) {
              if (value.is_presale_order && value.presale_info.type == "final") {
                if (Date.now() < Number(value.presale_info.final_info.paytime_start) * 1000) {
                  return true;
                }
              }
            },
            // 支付尾款，显示按钮
            orderFinalBtn (value) {
              if(value.is_new_seller_order  == false && value.type == 3){
                if (value.is_presale_order && value.presale_info.type == "final") {
                  if (Date.now() < Number(value.presale_info.final_info.paytime_end) * 1000 && Date.now() > Number(value.presale_info.final_info.paytime_start) * 1000) {
                    return true;
                  }
                }
              }
            },
            changeDate(time) {
                var dates = new Date(time * 1000);
                var month = dates.getMonth(),
                    days = dates.getDate(),
                    hours = dates.getHours(),
                    minutes = dates.getMinutes(),
                    seconds = dates.getSeconds();

                month = month < 10 ? `0${month}` : month;
                days = days < 10 ? `0${days}` : days;
                hours = hours < 10 ? `0${hours}` : hours;
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;

                return `${month}月${days}日 ${hours}:${minutes}:${seconds}`;
              },
        },
        events:{
            'changeSort':function(msg){
                var vm = this;
                vm.selected = msg;
                vm.list_type = [];
                for(var iii = 0 ; iii < 5 ; iii++){
                    if(msg == iii){
                        vm.no_more = vm.anymore[iii].flag;
                        if(vm.allData[msg].length == 0){
                            vm.getData();
                        }else{
                            vm.list_type = vm.allData[msg];
                        }
                        setTimeout(function(){vm.handleCurrentPage()},0);
                        vm.other = false;
                        vm.allkind = true;
                    }
                }
                if(msg==0){
                    vm.word = '订单';
                }else if(msg == 1){
                    vm.word = '待收货订单';
                }else if(msg == 2){
                    vm.word = '待发货订单';
                }else if(msg == 3){
                    vm.word = '待付款订单';
                }else{
                    vm.allkind = false;
                    vm.word = '待评价商品';
                    if(vm.allData[msg].length == 0){
                        vm.getData();
                    }else{
                        vm.list_type = vm.allData[msg];
                    }
                    setTimeout(function(){vm.handleCurrentPage()},0);
                    vm.other = true;
                }
            }
        },
        watch:{
            'list_type':'handleCurrentPage',
        },
    }
</script>
