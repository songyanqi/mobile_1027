<template>
    <div class = "activitys">
        <group class = "goodsInfos clearfix">
          <cell-box class = "activity_t_cont"
                    is-link
                    @click.native = "handleBounsShow"
                    v-if = "activityinfo.bonus && activityinfo.bonus.hasBonus == '1'">
            <div class = "activity_t_title">可用券</div>
            <div class = "activity_t_common">
              <span class = "activity_name">{{ activityinfo.bonus.typeMoney }}元红包</span>
            </div>
          </cell-box>
        </group>
        <group v-if = "activityinfo.activitys && activityinfo.activitys.length" class = "goodsInfos clearfix activity_cont">
            <!--如果1个活动跳连接，两个弹框-->
            <cell-box
                    class = "activity_t_cont"
                    v-if = "activityinfo.activitys.length == '1'"
                    @click.native = "handleSend"
                    :is-link = '!!activityurl'
            >
                <div class = "activity_t_title" style = "line-height: 15px;">活动</div>
                <div class = "activity_t_common active_clamp clearfix" style = "margin-bottom: 0;">
                    <span class = "clearfix" v-if = "activityinfo.activitys && activityinfo.activitys[0].gifts.length">
                        <span class = "act_wrapper"><span class = "active_type">赠品</span></span>
                      <span class = "act_cont" v-for = "(item,index) of activityslist">
                        <span v-if = "index === activityinfo.activitys[0].gifts.length - 1">{{ item.intro }}</span>
                        <span v-else>{{ item.intro }}<span>,</span></span>
                      </span>
                    </span>
                    <span class = "clearfix" v-else>
                        <span class = "act_wrapper">
                          <span v-if = "activityinfo.activitys[0].actTypeName === ''" class = "active_type">{{ activityinfo.activitys[0].typeName }}</span>
                          <span v-else class = "active_type">{{ activityinfo.activitys[0].actTypeName }}</span>
                        </span>
                      <span class = "act_cont">{{ activityinfo.activitys[0].actIntro }}</span>
                    </span>
                </div>
            </cell-box>
            <cell-box
                    v-else
                    is-link
                    @click.native = 'handleActivity'
                    class = "activity_t_cont" style = "padding-bottom: 5px;">
                <div class = "activity_t_title" style = "line-height: 15px;">活动</div>
                <div class = "activity_t_common clearfix">
                    <div
                        v-if = "activityinfo.activitys.length < 3"
                        >
                        <div class = "active_clamp" v-for = "item of activityinfo.activitys">
                            <span class = "clearfix" v-if = "item.gifts.length">
                                <span class = "act_wrapper"><span class = "active_type">赠品</span></span>
                                <span class = "act_cont" v-for = "(list,index) of item.gifts">
                                    <span v-if = "index == item.gifts.length - 1">{{ list.intro }}</span>
                                    <span v-else>{{ list.intro }}<span>,</span></span>
                                </span>
                            </span>
                            <span class = "clearfix" v-else>
                                <span class = "act_wrapper">
                                  <span class = "active_type" v-if = "item.actTypeName === ''">{{ item.typeName }}</span>
                                  <span class = "active_type" v-else>{{ item.actTypeName }}</span></span>
                                <span class = "act_cont">{{ item.actIntro }}</span>
                            </span>
                        </div>
                    </div>
                    <!--大于3-->
                    <div v-else >
                        <div class = "active_clamp">
                            <span class = "clearfix" v-if = "activityinfo.activitys && activityslist.length">
                                <span class = "act_wrapper"><span class = "active_type">赠品</span></span>
                                <span class = "act_cont" v-for = "(item,index) of activityslist">
                                    <span v-if = "index === activityslist.length - 1">{{ item.intro }}</span>
                                    <span v-else>{{ item.intro }}<span>,</span></span>
                                </span>
                            </span>
                            <span class = "clearfix" v-else>
                                <span class = "act_wrapper">
                                  <span class = "active_type" v-if = "activityinfo.activitys[0].actTypeName === ''">{{ activityinfo.activitys[0].typeName }}</span>
                                  <span class = "active_type" v-else>{{ activityinfo.activitys[0].actTypeName }}</span>
                                </span>
                                <span class = "act_cont">{{ activityinfo.activitys[0].actIntro }}</span>
                            </span>
                        </div>
                        <div class = "flexCont">
                          <span v-if = "activityslist.length == '0'">
                              <span class = "act_wrapper" v-for = "item of activityinfo.activitys.slice(1)" style = "margin-right: 5px;">
                                <span class = "active_type" v-if = "item.actTypeName === ''">{{ item.typeName }}</span>
                                <span class = "active_type" v-else>{{ item.actTypeName }}</span>
                              </span>
                            </span>
                          <span v-else>
                            <span v-for = "item of activityinfo.activitys">
                              <span class = "act_wrapper" v-if = "item.gifts && item.gifts.length == 0" style = "margin-right: 5px;">
                                <span class = "active_type" v-if = "item.actTypeName == ''">{{ item.typeName }}</span>
                                <span class = "active_type" v-else>{{ item.actTypeName }}</span>
                              </span>
                            </span>
                          </span>
                        </div>
                    </div>
                </div>
            </cell-box>
        </group>
        <group v-if = "activityinfo.notice && activityinfo.notice.noticeName" class = "goodsInfos">
            <cell-box
                    is-link
                    :link = "activityinfo.notice.command.content"
                    class = "activity_t_cont">
                <div  class = "activity_t_title">快讯</div>
                <div class = "activity_t_common">
                    <span class = "new_flash">{{ activityinfo.notice.noticeName }}</span>
                </div>
            </cell-box>
        </group>
        <group class = "goodsInfos servicesInfo" @click.native = "handleServer">
            <cell-box class = "activity_t_cont clearfix servicePad" is-link>
                <div  class = "activity_t_title">服务</div>
                <div class = "activity_t_common clearfix serviceWid" v-if = "activityinfo.service">
                    <div class = "clearfix">
                      <span class = "service" v-for = "(item,index) of activityinfo.service.slice(0,3)">
                          <span v-if = "index == 1" class = "services_middle"><span class = "service_icon"></span>{{ item.serviceTitle1 }}</span><span v-else><span class = "service_icon"></span>{{ item.serviceTitle1 }}</span>
                      </span>
                    </div>
                    <div class = "clearfix">
                      <span class = "service_s" v-for = "(item,index) of activityinfo.service.slice(3)" :class = "{ servicesStyle:index == 1 }">
                          <span v-if = "index == 0" class = "service_m_o"><span class = "service_icon"></span>{{ item.serviceTitle1 }}</span><span v-else><span class = "service_icon"></span>{{ item.serviceTitle1 }}</span>
                      </span>
                    </div>
                </div>
            </cell-box>
        </group>
        <!--多规格显示的已选择-->
        <group class = "aleady_selected"
               v-if = "goodstags.length || (relativegoodslist && relativegoodslist.length)">
            <cell-box
                    @click.native = "handleTypeModal"
                    is-link
                    class = "activity_t_cont">
                <div  class = "activity_t_title">已选择</div>
                <div class = "activity_t_common" v-if = "goodstags.length">
                    <span class = "activity_m5" v-for = "item of goodsmodalobj.goodsType">{{ item.title }}</span>
                </div>
                <div class = "activity_t_common" v-else>
                    <span v-for = "item of relativegoodslist">
                        <span v-if = "item.isActive">{{ item.title }}</span>
                    </span>
                </div>
            </cell-box>
        </group>
        <!--店主页-->
        <!--<group class = "shopCont" v-if = "dataseller && activityinfo.isShopper != '3'">
            <cell-box
                    is-link
                    :link = "activityinfo.shoppUrl"
                    class = "brand_wrapper">
                <div class = "brand_img">
                    <img :src="dataseller.sellerAvatar" alt="">
                </div>
                <div class = "brand_name">
                    <p class = "brandM5">{{ dataseller.sellerName }}</p>
                    <p class = "brandFont">客服电话：{{ dataseller.servicePhone }}</p>
                </div>
                <div class = "brandEnter">进入店铺</div>
            </cell-box>
        </group>-->

        <!--服务弹框-->
        <popup v-model="serverShow"
               @on-show = "handleModalShow"
               @on-hide = "handleModalHide"
               class = "actModal serverModal">
            <div class = "modalCloseWrapper" @click = "handleClose"><span class = "modal-close"></span></div>
            <div class = " server_scroll">
              <div class = "server_title">服务说明</div>
              <div class = "server_title_scroll">
                <group v-for = "item of activityinfo.service">
                    <div @click = "handleServices(item)">
                        <cell-box
                                :is-link = "!!item.command.content || !!item.servicePolicyRtf"
                                class = "server_h">
                            <icon class = "service_h_icon" type="success-circle"></icon><span class = "services_title">{{ item.serviceTitle2 }}</span>
                        </cell-box>
                        <div class = "server_c">{{ item.servicePolicy }}</div>
                    </div>
                </group>
              </div>
            </div>
        </popup>
        <!--活动弹窗-->
        <popup v-model="activityShow"
               @on-show = "handleModalShow"
               @on-hide = "handleModalHide"
               class = "actModal">
            <div class = "modalCloseWrapper" @click = "handleAtyClose"><span class = "modal-close"></span></div>
            <div class = "server_scroll">
            <div class = "server_title">活动</div>
                <group v-for = "item of activityinfo.activitys">
                    <div class = "activity_show" v-if = "item.gifts && item.gifts.length">
                        <cell-box
                                  class = "server_h"
                                  :is-link = "!!list.command.content"
                                  :link = "list.command.content"
                                  v-for = "(list,index) of activityslist">
                            <span class = "act_wrapper" style = "float: left;margin-right: 10px;"><span class = "active_type">赠品</span></span>
                            <span style = "float: left;width: 70%;">
                                <span>{{ list.intro }}</span>
                            </span>
                        </cell-box>
                    </div>
                    <div v-else class = "activity_show">
                        <cell-box
                                  :is-link = "!!item.command.content"
                                  :link = "item.command.content"
                                  class = "server_h">
                            <span class = "act_wrapper" style = "float: left; margin-right: 10px;">
                              <span v-if = "item.actTypeName === ''" class = "active_type">{{ item.typeName }}</span>
                                <span v-else class = "active_type">{{ item.actTypeName }}</span>
                            </span>
                            <span style = "float: left;width: 70%;">{{ item.actIntro }}</span>
                        </cell-box>
                    </div>
                </group>
            </div>
        </popup>
        <!--为一个活动的时候赠品活动弹框-->
        <popup v-model="activitySendShow"
               @on-show = "handleModalShow"
               @on-hide = "handleModalHide"
               class = "actModal">
            <div class = "modalCloseWrapper" @click = "handleAtySendClose"><span class = "modal-close"></span></div>
            <div class = "server_scroll">
              <div class = "server_title">活动</div>
              <group v-for = "item of activityslist">
                  <div class = "activity_show">
                      <cell-box
                              :is-link = "!!item.command.content"
                              :link = "item.command.content"
                              class = "server_h">
                              <span class = "act_wrapper" style = "float: left;width: 15%">
                                  <span  class = "active_type">赠品</span>
                              </span>
                          <span style = "float: left;width: 80%;">{{ item.intro }}</span>
                      </cell-box>
                  </div>
              </group>
            </div>
        </popup>
        <!--红包列表-->
        <popup v-model = "bounsShow"
               @on-show = "handleModalShow"
               @on-hide = "handleModalHide"
               class = "actModal">
          <div class = "modalCloseWrapper" @click = "handleBounsClose"><span class = "modal-close"></span></div>
          <div class = "server_scroll">
            <div class = "server_title">优惠券</div>
            <div class = "server_title_pre">以下是您账户里适用于该商品的优惠券</div>
            <div class = "server_title_cont">
              <div v-if = "activityinfo.bonus.bonusList.length"
                   v-for = "item of activityinfo.bonus.bonusList"
                   id = "scrollerBouns"
                   class = "coupons_cont clearfix">
                <div class = "coupons_left">
                  <div class = "coupons_l_money">¥ <span>{{ item.typeMoney }}</span></div>
                  <div class = "coupons_l_condition">满{{ item.minGoodsAmount }}元可用</div>
                </div>
                <div class = "coupons_right">
                  <div class = "coupons_r_title">{{ item.typeName }}</div>
                  <div class = "coupons_r_condition">{{ item.limitDesc }}</div>
                  <div class = "coupons_r_date">{{ item.beginDate }} - {{ item.endDate }}</div>
                </div>
              </div>
            </div>
          </div>
        </popup>
        <!--多规格弹框-->
        <popup v-model="cartModal"
               @on-show = "handleModalShow"
               @on-hide = "handleModalHide"
              >
            <div class = "modalCloseWrapper" @click = "handleTypeClose"><span class = "modal-close"></span></div>
            <div class = "goodsTypeModal" :style = "{ height: modalHeight }">
                <i class="dav_icon_detail_close_btn"></i>
                <div class="summary modalPicCont">
                  <div class = "titlePic" :class = "{ titlePresalePic: infoobj.presale }">
                    <img :src="infoobj.goodsShortPic" alt="">
                  </div>
                  <div class = "titleInfo">
                    <div class = "titleM5">
                      <span class = "summary_price"><span class = "summary_p_icon"><span v-if = "infoobj.presale">定金</span> ¥ </span>{{ allPrice }}</span>
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
                    <div class = "pre_final_price" v-if = "infoobj.presale">尾款 ¥ {{ infoobj.price.finalPrice }}</div>
                    <div class = "summary_select"><span class = "summar_select_title">选择</span>
                      <div v-if = "relativegoodslist" class = "summary_m15">
                          <span v-for = "item of relativegoodslist">
                              <span v-if = "item.isActive">{{ item.title }}</span>
                          </span>
                      </div>
                      <div v-if = "goodstags.length" class = "summary_m15">
                          <span v-for = "item of goodsmodalobj.goodsType">
                              {{ item.title }}
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sku-control">
                    <div class = "clearfix s-title-cont" v-if = "relativegoodslist.length">
                        <div class="s-decision_title">相关商品</div>

                        <div class = "clearfix">
                        <div class="relative_items"
                             @click = "handleRelativeGoods(item, relativegoodslist, $event)"
                             :class = "{activieType:item.isActive,isDisabled:item.onSale == '0'}"
                             v-for = "item of relativegoodslist">
                            <!--item是全部的规格，list是点击是的规格，$event为事件，必须是$event-->
                            <span>{{ item.title }}</span>
                        </div>
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
                          
                          <div v-if = "infoobj.presale" class = "preIsLimit">限购{{ infoobj.limitNum }}件</div>
                          <div v-if = "islimitnum" class = "isLimit">库存不足</div>
                          <x-number
                                  ref = "xNumber"
                                  class = "x_number"
                                  :min="1"
                                  :value="cartNum"
                                  :max = "Number(goodslimitnum)"
                                  width = "43px"
                                  align="left"
                                  fillable
                                  @on-change="handleChange"></x-number>
                        </div>
                    </div>
                </div>
                <div class = "bottom_btn clearfix">
                  <div class = "activeBottomBtn" v-if = "goodstatusonsale != '0'">
                    <div v-if = "seckill">
                      <div
                        class = "btn_buy btn_buy_width"
                        :class = "{ disableGray: Number(goodstatus.goodsStocks) <= 0 }"
                        :dataid = "datarepresentid"
                        @click = "handleBuy($event)">
                        <div>立即秒杀</div>
                      </div>
                    </div>
                    <div v-else>
                      <!-- 是否是预定商品 -->
                      <div  v-if = "infoobj.presale"
                            class = "btn_buy btn_buy_width"
                            :class = "{ disableGray: Number(goodstatus.goodsStocks) <= 0 }"
                            :dataid = "datarepresentid"
                            @click = "handleBuy($event)">
                        立即付定金
                      </div>
                      <div v-else>
                        <div class = "flexCont flex1" v-if = "Number(goodstatus.goodsStocks) <= 0">
                          <div class = "haveGoods_tips"
                               style = "wdith: 100%;"
                               @click = "handleTips">到货提醒</div>
                        </div>
                        <div v-else>
                          <div class="add_cart_b"
                               :dataid = "datarepresentid"
                               :isclose = "isclose"
                               @click = "handleModalConfirm($event)">加入购物车</div>
                          <div class="cart_buy_b"
                               :dataid = "datarepresentid"
                               :isclose = "isclose"
                               @click = "handleModalCart($event)">立即购买</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class = "look_again" style = "width: 100%;" @click = "handleLook">
                      再逛逛
                    </div>
                  </div>
                </div>
            </div>
        </popup>
        <div class = "dialogCont">
            <div class = "dialogHead" @click = "handleBack"><span class = "home_arrow"></span></div>
            <div v-html = "dialogText" class = "disalogText"></div>
        </div>
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
    import ActivityTypes from './activity_types.es6';

    export default ActivityTypes;
</script>
