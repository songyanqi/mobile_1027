<template>
    <div class = "goods_bottom_wrapper">
        <div class="goods_bottom">
            <!--购物车-->
            <a :href="cartURL" class="cart_link">
                <div class = "cartLinkIcon">
                    <i class="icon menu_cart"><span v-if = "cartnum != 0" class = "cart_num" :class = "{ cart_m_num: cartnum < 10 }">{{ cartnum }}</span></i>
                    <div class = "cart_tip">购物车</div>
                </div>
            </a>
            <!--收藏 collecte，绑定到父元素身上-->
          <div class="collect cart_link"
               :class = "{ cart_link_b: visitorstatus != 3 || Number(goodstatus.goodsStocks) <= 0 }"
               :collected = "goodstatus.collected"
               @click = "handleCollect($event)">
            <div v-if = "goodstatus.collected == 0">
              <i class="icon collect_icon"></i >
              <div class="cart_tip" style = "margin-top: 5px;">收藏</div>
            </div>
            <div v-else>
              <i class="icon favorited_icon"></i>
              <div class="cart_tip" style = "margin-top: 5px;">已收藏</div>
            </div>
          </div>
            <!--推广-->
            <div class = "spread cart_link_b">
                <div v-if = "visitorstatus == 3"
                     :dataid = "datarepresentid"
                     @click = "handleSpread($event)">
                    <div v-if = "goodstatusonsale == '1'">
                        <div v-if = "Number(goodstatus.goodsStocks) > 0">
                            <i class="icon spread_icon"></i>
                            <div class="cart_tip">推广</div>
                      </div>
                  </div>
              </div>
          </div>
          <!--判断状态-->
            <!--先判断是否上架-->
            <div v-if = "goodstatusonsale == 1" class = "cart_wrapper">
                <div v-if = "seckill" style = "width: 100%;">
                    <div
                         class = "btn_buy"
                         :class = "{ disableGray: Number(goodstatus.goodsStocks) <= 0}"
                         style = "width: 100%;"
                         :dataid = "datarepresentid"
                         @click = "handleBuy($event)">立即秒杀</div>
                </div>
                <div v-else style = "width: 100%;">
                    <div v-if = "Number(goodstatus.goodsStocks) <= 0" style = "width: 100%;">
                        <div class = "look_again" @click = "handleLook">再逛逛</div>
                        <div class = "haveGoods_tips"
                             @click = "handleTips">到货提醒</div>
                    </div>
                    <div v-else style = "width: 100%;" class = "clearfix">
                        <div>
                            <div class = "add_cart" v-if = "ismultigoods" @click = "handleAddCart">加入购物车</div>
                            <div class = "add_cart" v-else @click = "handleSingleCart">加入购物车</div>
                        </div>
                        <div v-if = "isclose == true"
                             class = "btn_buy"
                             :dataid = "datarepresentid"
                             @click = "handleBuy($event)">立即购买</div>
                        <div v-else
                         class = "btn_buy"
                         @click = "handleAddCartBuy">立即购买</div>
                </div>
                </div>
            </div>
            <div v-else  class = "cart_wrapper" @click = "handleLook">
                <div class = "look_btn">再逛逛</div>
            </div>
            <!--删掉了1-->

        </div>
        <!--售罄和未上架显示看看别的-->
        <div class = "recommend_goods" v-if = 'mayyoulikelist && mayyoulikelist.length'>
            <div v-if = "goodstatusonsale == '1'">
                <div v-if = "Number(goodstatus.goodsStocks) <= 0">
                    <a class="vux-popup-mask self-mask vux-popup-show"
                       @click = "handleMask"
                       href="javascript:void(0)"></a>
                    <!--售罄-->
                    <div class = "recommend_goods_cont">
                        <div @click = "handleRecommendGoods">
                            <div class = "other_title"
                                 :class = "{ other_title_hide: !this.isSlide }"
                            >
                                <span :class = "{goods_tips_onsale: this.isSlide }" class = "goodsTosale">商品售空了，我们正在加速补货中，先瞧瞧别的</span>
                                <span v-if = "isSlide" class = "downArrowIcon"></span>
                                <span v-else class = "upArrowIcon"></span>
                            </div>
                        </div>
                        <div class = "other_goods">
                        <scroller lock-y :scrollbar-x=false :bounce = "false">
                            <div class = "recommendList"  :style = "{width: mayyoulikelist.length * 110 + 'px'}">
                                <a class="other_goods_cont"
                                   href = "javascript:void(0)"
                                   @click = "handleGuess(item)"
                                   v-for="item of mayyoulikelist">
                                    <div class = "other_pic">
                                      <img v-lazy="item.imageUrl">
                                    </div>
                                    <div class = "goods_text">{{ item.title }}</div>
                                    <div style = "position: relative;top: -5px;">
                                        <span class = "goods_price"><span style = "font-size: 12px;margin-right: 2px;">¥</span>{{ item.nowPrice }}</span>
                                    </div>
                                </a>
                            </div>
                        </scroller>
                    </div>
                    </div>
                </div>
                <div v-else>
                    <!--正常-->
                </div>
            </div>
            <div v-else>
                <a class="vux-popup-mask self-mask vux-popup-show"
                   @click = "handleMask"
                   href="javascript:void(0)"></a>
                <div class = "recommend_goods_cont">
                    <div @click = "handleRecommendGoods">
                        <div class = "other_title"
                             :class = "{ other_title_hide: !this.isSlide }"
                            >
                            <span :class = "{goods_tips_onsale: this.isSlide }">商品还未上架，先瞧瞧别的</span>
                            <span v-if = "isSlide" class = "downArrowIcon"></span>
                            <span v-else class = "upArrowIcon"></span>
                        </div>
                    </div>
                    <div class = "other_goods">
                        <scroller lock-y :scrollbar-x=false :bounce = "false">
                            <div class = "recommendList" :style = "{width: mayyoulikelist.length * 110 + 'px'}">
                                <a class="other_goods_cont"
                                   :href = "item.command.content"
                                   @click = "handleGuess(item)"
                                   v-for="item of mayyoulikelist">
                                    <div class = "other_pic">
                                        <img v-lazy="item.imageUrl">
                                        <span class="good_list_sell_out" v-if = "item.statusInfo == 'soldout'">售罄</span>
                                        <span class="good_list_sell_out" v-if = "item.statusInfo == 'presale'">预售</span>
                                        <span class="good_list_sell_out" v-if = "item.statusInfo == 'offline'">未上架</span>
                                    </div>
                                    <div class = "goods_text">{{ item.title }}</div>
                                    <div style = "position: relative;top: -5px;">
                                        <span class = "goods_price"><span style = "font-size: 12px;margin-right: 2px;">¥</span>{{ item.nowPrice }}</span>
                                    </div>
                                </a>
                            </div>
                        </scroller>
                    </div>
                </div>
            </div>
        </div>
        <!--多规格弹框-->
        <popup
          v-model="cartModal"
          @on-show = "handleModalShow"
          @on-hide = "handleModalHide"
          class="miniPopUpModal"
          @click = "handleModal">
            <div class = "modalCloseWrapper" @click = "handleClose"><span class = "modal-close"></span></div>
            <div class = "goodsTypeModal">
                <i class="dav_icon_detail_close_btn"></i>
                <div class="summary modalPicCont">
                    <div class = "titlePic" :class = "{ titlePicSingle: !relativegoodslist.length && !goodstags.length }">
                      <img :src="infoobj.goodsShortPic" alt="">
                    </div>
                    <div class = "titleInfo">
                      <div>
                        <span v-if = "infoobj.memberGoods == '0'">
                            <span v-if = "isshowactive == 1">
                                <span v-if = "actendtime != 0" class = "summary_price">
                                    <span v-if = "isOver"><span class = "summary_p_icon">¥</span>{{ infoobj.shopPrice }}</span>
                                    <span v-else><span class = "summary_p_icon">¥</span>{{ infoobj.finalPrice }}</span>
                                </span>
                                <span v-else  class = "summary_price"><span class = "summary_p_icon">¥</span>{{ infoobj.shopPrice }}</span>
                            </span>
                            <span v-else class = "summary_price"><span class = "summary_p_icon">¥</span>{{ infoobj.finalPrice }}</span>
                        </span>
                        <span v-else>
                            <span v-if = 'visitorstatus != 3'>
                                <span v-if = "isshowactive == 1">
                                    <span v-if = "actendtime != 0" class = "summary_price">
                                        <span v-if = "isOver"><span class = "summary_p_icon">¥</span>{{ infoobj.shopPrice }}</span>
                                        <span v-else><span class = "summary_p_icon">¥</span>{{ infoobj.finalPrice }}</span>
                                    </span>
                                    <span v-else  class = "summary_price"><span class = "summary_p_icon">¥</span>{{ infoobj.shopPrice }}</span>
                                </span>
                                <span v-else class = "summary_price"><span class = "summary_p_icon">¥</span>{{ infoobj.finalPrice }}</span>
                            </span>
                            <span v-else>
                                <span v-if = "isshowactive == 1">
                                    <span v-if = "actendtime != 0" class = "summary_price">
                                        <span v-if = "isOver"><span class = "summary_p_icon">¥</span>{{ infoobj.shopPrice }}</span>
                                        <span v-else><span class = "summary_p_icon">¥</span>{{ infoobj.memberPrice }}</span>
                                    </span>
                                    <span v-else  class = "summary_price"><span class = "summary_p_icon">¥</span>{{ infoobj.shopPrice }}</span>
                                </span>
                                <span v-else class = "summary_price"><span class = "summary_p_icon">¥</span>{{ infoobj.memberPrice }}</span>
                            </span>
                        </span>

                        <span class = "summary_activity">
                            <span v-for = "(item,index) of goodsmodalobj.activityName">
                                <span v-if = "index == goodsmodalobj.activityName.length - 1">
                                    <span v-if = "item.actTypeName === ''">{{ item.typeName }}</span>
                                    <span v-else>{{ item.actTypeName }}</span>
                                </span>
                                <span v-else>
                                    <span v-if = "item.actTypeName === ''">{{ item.typeName }}、</span>
                                    <span v-else>{{ item.actTypeName }}、</span>
                                </span>
                            </span>
                        </span>
                      </div>
                      <div class = "summary_select" v-if = "relativegoodslist.length || goodstags.length"><span>选择</span>
                        <span v-if = "relativegoodslist.length" style = "margin-right: 10px;">
                            <span v-for = "item of relativegoodslist">
                                <span v-if = "item.isActive">{{ item.title }}</span>
                            </span>
                        </span>
                        <span v-if = "goodstags.length" style = "margin-right: 5px">
                            <span v-for = "item of goodsmodalobj.goodsType">
                                {{ item.title }}
                            </span>
                        </span>
                      </div>
                    </div>
                </div>
                <div class="sku-control" :class = "{ singleSkuControl: !relativegoodslist.length && !goodstags.length }">
                    <div class = "clearfix" style = "margin-top: 15px;" v-if = "relativegoodslist.length">
                      <div class="s-decision_title">相关商品</div>
                      <div class="relative_items b_relative_items"
                           @click = "handleRelativeGoods(item, relativegoodslist, $event)"
                           :class = "{activieType:item.isActive,isDisabled:item.onSale == '0'}"
                           v-for = "item of relativegoodslist">
                          <!--item是全部的规格，list是点击是的规格，$event为事件，必须是$event-->
                          <span v-if = "item.onSale != '0'">{{ item.title }}</span>
                      </div>
                    </div>
                    <ul>
                        <li v-for = "item of goodstags">
                            <div class="s-decision_title">{{ item.title }}</div>
                            <div class="items">
                                <!--item是全部的规格，list是点击是的规格，$event为事件，必须是$event-->
                                <span   @click = "handleTypes(item, list, $event)"
                                        v-for = "list of item.detail"
                                        :class = "{activieType:list.isActive,isDisabled:list.isDisabled}">{{ list.title }}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="summary_number">
                        <div class="summary_d_title">数量</div>
                        <div class = "summary_number_cont">
                            <div v-if = "islimitnum" class = "isLimit">库存不足</div>
                            <x-number
                                    class = "x_number"
                                    style = "padding-right: 0;"
                                    :value="handlechangenum"
                                    :min="1"
                                    :max = "Number(goodslimitnum)"
                                    width = "43px"
                                    align="left"
                                    @on-change="change"></x-number>
                        </div>
                    </div>
                </div>
                <div>
                  <div v-if = "Number(goodstatus.goodsStocks) <= 0">
                    <div class = "haveGoods_tips"
                         @click = "handleTips">到货提醒</div>
                  </div>
                  <div v-else>
                    <div class="confirm_btn"
                         :dataid = "datarepresentid"
                         :isclose = "isclose"
                         @click = "handleModalConfirm($event)">确定</div>
                  </div>
                </div>
            </div>
        </popup>
        <!--到货提醒-->
      <confirm v-if="tipsShow" title="提示"
               @on-confirm="handleConfirm"
               @on-cancel="handleConfirmCancel"
      >
        <x-input placeholder="请输入手机号码"
                 keyboard="number"
                 @on-blur="hadleBlur"
                 is-type="china-mobile"
                 type="tel"></x-input>
      </confirm>
  </div>
</template>
<script>
    import GoodsBottom from './goods_bottom.es6';
    export default GoodsBottom;
</script>
