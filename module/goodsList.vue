<style>
    .logo_container {
        margin-top : 20px;
        width      : 100%;
        text-align : center;
        max-width  : 640px;
    }

    .logo_left {
        display                 : inline-block;
        width                   : 162px;
        height                  : 39px;
        -webkit-background-size : 100%;
        background-size         : 100%;
        background-image        : url('//pic.davdian.com/free/mama0806.png');
    }

    @-webkit-keyframes plus {
        0% {
            -webkit-transform : rotate(0deg);
            transform         : rotate(0deg);
        }
        50% {
            -webkit-transform : rotate(360deg);
            transform         : rotate(360deg);
        }
        100% {
            -webkit-transform : rotate(360deg);
            transform         : rotate(360deg);
        }
    }

    @keyframes plus {
        0% {
            -webkit-transform : rotate(0deg);
            transform         : rotate(0deg);
        }
        50% {
            -webkit-transform : rotate(360deg);
            transform         : rotate(360deg);
        }
        100% {
            -webkit-transform : rotate(360deg);
            transform         : rotate(360deg);
        }
    }

    .logo_right {
        display                 : inline-block;
        width                   : 39px;
        height                  : 39px;
        -webkit-animation       : plus 2s linear 0s infinite;;
        animation               : plus 2s linear 0s infinite;
        -webkit-background-size : 100%;
        background-size         : 100%;
        background-image        : url('//pic.davdian.com/free/plus_0808.png');
    }

    .no_more {
        text-align: center;
        margin: 10px;
        line-height: 18px;
    }
</style>

<template>
    <div class="logo_container" v-if="first_loading">
        <!--<div class="logo_left"></div>-->
        <div class="logo_right"></div>
    </div>

    <!--:href="'/'+item.goods_id+'.html?_refer='+refer||'index'+'&_refer_val='+k"-->
    <div class="good_list_2_row" v-if="!first_loading">
        <a v-if="goods.length"
           v-for="(key,item) in goods"
           :href="'/'+item.goods_id+'.html?_refer='+(refer||'index')+'&_refer_val='+k"
           class="good_item"
           data-dav-tj="{{tj_page}}|hot_good|hot_good_{{item.goods_id}}|1|hot_good@{{tj_page}}"
           data-url="/{{item.goods_id}}.html?_refer={{refer||'index'}}&_refer_val={{k}}">
            <div class="good_img_container">
                <img :src="item.goods_img"
                     style="display: inline;">
                <div v-if="!item.sale_status==''|| !item.sale_status=='undefined'" class="good_list_sell_out">
                    <span v-if="item.sale_status=='soldout'">售罄</span>
                    <span v-if="item.sale_status=='offline'">未上架</span>
                </div>
            </div>
            <div class="good_con">
                <div class="good_title">{{item.goods_name}}</div>
                <div class="fz_12">
                    <span class="dav-color-price">¥{{item.shop_price}}</span>
                    <span v-if="item.goods_label&&item.goods_label!=''" class="lable">{{item.goods_label}}</span>
                </div>
            </div>
        </a>
        <div class="no_more" v-if="!goods.length">
            没有更多商品
        </div>
    </div>

    <div v-if="has_more&&loading" class="no_more">
        加载中 <img src="//pic.davdian.com/free/loading_03252.svg">
    </div>
</template>


<script>
    export default {
        props: {
            goods: [],
            config: {}
        },
        data(){
            return {
                has_more: true,
                pageIndex: window.pageIndexStart || 1,
                loading: false,
                first_loading:true
            }
        },
        ready: function () {
            reRender(this);
            addScrollListener(this);
            this.refer = this.config.refer;
            this.tj_page = window.tj_page;
        },
        watch: {
            'config.dataUrl': function (val, oldVal) {
                this.first_loading = true;
                reRender(this, true)
            }
        }
    }


    /**
     * 重新绘制
     * goodsList vue对象
     * force 强制刷新
     */
    function reRender(goodsList, force) {
        goodsList.has_more = true;
        goodsList.pageIndex = window.pageIndexStart || 1;
        goodsList.loading = false;
        initData(goodsList, force);
    }

    /**
     * 增加滚动监听
     */
    function addScrollListener(goodsList) {
        if(goodsList.config.noRefresh){
            return false;
        }
        window.onscroll = function () {
            var el = document.querySelector(".good_list_2_row");
            // 滚动到指定位置 而且有更多数据的话 就继续加载
            if (el.offsetHeight + el.offsetTop - (window.screen.availHeight + window.scrollY) < 100) {
                if (goodsList.has_more && !goodsList.loading) {
                    goodsList.pageIndex++;
                    loadMoreData(goodsList);
                }
            }
        };
    }

    function loadMoreData(goodsList) {
        goodsList.loading = true;
        getDataFromServer(goodsList, function (data) {
            goodsList.loading = false;
            goodsList.goods = goodsList.goods.concat(data);
            setDataToLS(goodsList.pageIndex, goodsList.goods);
        });
    }

    /**
     * 初始化数据
     */
    function initData(goodsList, force) {
        var data = getDataFromLS();
        if (!data || force) {
            if(!goodsList.first_loading){
                goodsList.loading = true;
            }
            getDataFromServer(goodsList, function (d) {
                goodsList.first_loading = false;
                goodsList.loading = false;
                data = d;
                goodsList.goods = data;
                setDataToLS(goodsList.pageIndex, goodsList.goods);
            });
        } else {
            goodsList.goods = data.goods;
            goodsList.pageIndex = data.page;
            goodsList.first_loading = false;
        }
    }

    /**
     * 从服务器获取数据
     */
    function getDataFromServer(goodsList, callback) {
        $.ajax({
            url: goodsList.config.dataUrl,
            data: {
                page: goodsList.pageIndex
            },
            dataType: "json",
            success: function (re) {
                if (re.msg) {
                    bravetime.info(re.msg);
                } else {
                    callback(re.data);
                }
            }, error: function () {
                bravetime.info("网络异常,请稍后重试");
            }
        });
    }

    /**
     * 从 sessionStorage
     */
    function getDataFromLS() {
        if (window.isPrivateMode || !window.localStorage) {
            return null;
        }
        var data = sessionStorage.getItem("goodsListData");
        // 没有数据直接返回null
        if (!data) {
            return null;
        }

        // 不是从详情页返回也返回null
        if(sessionStorage.history){
            var his = JSON.parse(sessionStorage.history);
            if(!his[his.length - 2]){
                return false;
            }
            if (his[his.length - 2].path != "detail") {
                return false;
            }
        }else{
            return false;
        }


        var goodsListData = JSON.parse(data);

        // 返回数据
        return goodsListData;
    }

    function setDataToLS(page, goods) {
        if (!window.isPrivateMode && window.localStorage) {
            sessionStorage.setItem("goodsListData", JSON.stringify({page: page, goods: goods}));
        }
    }
</script>
