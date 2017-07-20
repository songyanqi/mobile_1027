<style>
    body {
        padding-bottom: 45px;
        padding-top: 0;
    }
</style>
<!--loadBefore-->
<template>
  <div>
    <div v-if = "loadBefore">
      <spinner class = "spinnerStyle" :type="type" slot="value"></spinner>
    </div>
    <div v-else>
      <div v-if = "isGoods">
        <no-find-goods :isapp = "isApp"></no-find-goods>
      </div>
      <div v-else>
        <!--显示动态条-->
        <div v-if = "Number(goodsStockNumber) > 0 && goodStatusonSale == 1">
          <div v-if="firstScreenFinish && Number(goodsStockNumber) > 0"
               v-show = "swiperInfo.trendsList && swiperInfo.trendsList.length"
               class = "tends_wrapper isProTends"
               :class = "{ proTends: !isPrompt, isAppTends: isApp }">
            <div id="tends">
              <img class = "avarImg"
                   :src="trendAvatar" alt="">
              <span>{{ trendInfo }}</span>
            </div>
          </div>
        </div>
        <!--商品详情页及文章详情未开店用户提示开店-->
        <div  v-if = "firstScreenFinish&&shopUrl.length && !isApp && visitorStatus != '3'">
          <div v-if = "isPrompt" class="kd_prompt_con">
            <i class="modal-close prompt_close"  @click = "handleClosePrompt"></i>
            <span class="title">{{ shopMemo }}</span>
            <a :href="shopUrl"><span class="kd_btn">成为会员</span></a>
          </div>
        </div>
        <div class="top_h_s"
             v-if = "!isApp"
             :class = "{ picTabtop: !isPrompt,top_h_s_c: isChange }"
        >
          <div>
            <div v-if = "isChange">
              <a class="top_back" href="javascript:history.back();" data-dav-tj="detail|back|back|1|back@detail">
                <span class="home_o_arrow"></span>
              </a>
            </div>
            <div v-else class="top_left">
              <a class="top_back" href="javascript:history.back();" data-dav-tj="detail|back|back|1|back@detail">
                <span class="home_arrow"></span>
              </a>
            </div>
          </div>
          <span class = "spanFlex1"></span>
          <tab :line-width=2 class = "top_h_s_to" active-color='#666' v-model="index">
            <tab-item :selected="selectedTitle === item"
                      v-for="(item, index) in goodListTitle"
                      @click.native = "handleChangeTab" :key="index">{{item}}</tab-item>
          </tab>
          <span class = "spanFlex1"></span>
          <div>
            <div v-if = "this.isChange">
              <a class="right_icon" href = "/">
                <span class="right_o_arrow"></span>
              </a>
            </div>
            <div v-else>
              <a class="right_icon" href = "/">
                <span class="right_arrow"></span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div
            class = "goodsWrapper"
            :class = "{ pciTabMtopT: isPrompt && !isApp }"
          >
            <goods-swiper
              :isapp = "isApp"
              :infoobj = "infoObj"
              :singleactivity = "singleActivity"
              :isshowactive = "isShowActive"
              :actendtime = "actEndTime"
              :goodstatusonsale = "goodStatusonSale"
              :goodstatus = "goodStatus"
              :trendavatar = "trendAvatar"
              :trendname = "trendName"
              :swiperinfo = "swiperInfo"
              :videoobj = "videoObj"

              :iscomingactive = "isComingActive"
              :singlecomeactivity = "singleComeActivity"
              :visitorstatus = "visitorStatus"

              :goodstatus = "goodStatus"
              :goodstatusonsale = "goodStatusonSale"

              :goodsimglist = "goodsImgList"></goods-swiper>
            <goods-intro
              :actendtime = "actEndTime"
              :isshowactive = "isShowActive"
              :shopurl = "shopUrl"
              :membercont = "memberCont"

              :seckill = "secKill"

              :isshowa = "isShowa"
              :isshowb = "isShowb"

              :singleactivity = "singleActivity"
              :visitorstatus = "visitorStatus"
              :goodsname = "goodsName"
              :goodsstocknumber = "goodsStockNumber"
              :infoobj = "infoObj"></goods-intro>
            <activity-types
              v-if = "firstScreenFinish"
              :infoobj = "infoObj"
              :actendtime = "actEndTime"
              :isshowactive = "isShowActive"
              :visitorstatus = "visitorStatus"

              :goodslimitnum = "goodsLimitNum"
              :activitynum = "activityNum"
              :activityinfo = "activityInfo"
              :activityslist = "activitysList"
              :activityindex = "activityIndex"
              :activityurl = "activityUrl"

              :dataseller = "dataSeller"

              @confirm-id = "handleConfirmId"
              @change-type = "handleChangeType"
              :goodstags = "goodsTags"
              :isclose = "isClose"
              :goodsmodalobj = "goodsModalObj"
              :datarepresentid = "dataRepresentId"
              :islimitnum = "isLimitNum"

              :seckill = "secKill"

              :handlechangenum = "handleChangeNum"
              @change-cartnum = "handleCartNum"

              :relativegoodslist = "relativeGoodsList"
              @relative-goods = "relativeGoods"
              :goodstatusonsale = "goodStatusonSale"
              :goodstatus = "goodStatus"
            ></activity-types>
            <goods-evaluate
              v-if = "firstScreenFinish"
              :commentobj = "commentObj"
            ></goods-evaluate>
            <brand-type v-if="firstScreenFinish" :brandlist = "brandList"
            ></brand-type>

            <div class = "parmas_wrapper clearfix"
                 v-if = "firstScreenFinish"
                 style = "overfllow: hidden; margin-top: 10px;">
              <tab
                v-if = "goodsParamObj.length"
                class = "picTab"
                :line-width=2
                active-color='#FF4A7D'
                v-model = "detailIndex"
                >
                <tab-item :selected="detailTitle === item"
                          v-if = "goodsParamObj.length"
                          v-for="(item, detailIdx) in detailListTitle"
                          :key="detailIdx">
                  {{item}}
                </tab-item>
                <span v-if = "goodsParamObj.length" class = "tabLine">|</span>
              </tab>
              <tab
                v-else
                class = "picTab"
                :line-width=1
                active-color='#FF4A7D'
                v-model = "detailIndex"
              >
                <tab-item :selected="detailTitle === item"
                          v-for="(item, detailIdx) of detailListNav"
                          :key="detailIdx">
                  {{item}}
                </tab-item>
              </tab>
              <div
                class = "detialWrapper">
                <div class = "parames clearfix" v-show = "detailIndex == 0">
                  <detail-pic
                    :isprompt = "isPrompt"
                    :mayyoulikenomore = "mayYouLikeNoMore"
                    @loadmayyoulike = "handleMayYouLike"
                    :mayyoulikelist = "mayYouLikeList"
                    :isapp = "isApp"
                    :videoobj = "videoObj"
                    :goodsimglist = "goodsImgList"
                    :picdetails = "picDetails"></detail-pic>
                </div>
                <div class= "picCont"
                     v-if = "goodsParamObj.length"
                     :style = "{ minHeight: minHeight + 'px', background: '#fff' }"
                     v-show = "detailIndex == 1">
                  <goods-params :isprompt = "isPrompt"
                                :isapp = "isApp"
                                :goodsparamobj = "goodsParamObj"></goods-params>
                </div>
              </div>
            </div>
          </div>
        </div>
        <goods-bottom
          :infoobj = "infoObj"
          :actendtime = "actEndTime"
          :isshowactive = "isShowActive"
          :parentid = "parentId"

          :ismultigoods = "isMultiGoods"
          :goodslimitnum = "goodsLimitNum"
          :goodstatusonsale = "goodStatusonSale"
          :goodstatus = "goodStatus"

          @change-type = "handleChangeType"
          @confirm-id = "handleConfirmId"
          :goodstags = "goodsTags"
          :isclose = "isClose"
          :goodsmodalobj = "goodsModalObj"
          :datarepresentid = "dataRepresentId"

          :cartnum = "cartNum"
          :handlechangenum = "handleChangeNum"
          @change-cartnum = "handleCartNum"
          :islimitnum = "isLimitNum"

          :mayyoulikelist = "mayYouLikeList"

          :relativegoodslist = "relativeGoodsList"
          @relative-goods = "relativeGoods"
          :visitorstatus = "visitorStatus"
          :spread = "spread"
          :seckill = "secKill"
        ></goods-bottom>
      </div>
      <alert v-model="alertShow" title="提示" @on-hide="handleAlertHide"> {{ alertMsg }}</alert>
      <confirm v-if="confirmShow" title="提示"
               @on-cancel="handleConfirmCancel"
               :confirm-text = 'confirmText'
               :cancel-text = 'cancelText'
               @on-confirm="handleConfirmOk">
        <p style="text-align:center;">{{ confirmMsg }}</p>
      </confirm>
      <loading v-model="loadingShow"></loading>
    </div>
  </div>
</template>

<script>

    import '../css/goods_detail.scss';
    import goods_detail from "./goods_detail.es6";

    export default goods_detail;
</script>
