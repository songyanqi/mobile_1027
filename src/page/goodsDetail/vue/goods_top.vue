<template>
    <div>
        <div v-if = "!isapp" class = "top0 top_h_t top_show">
            <div class="top_container">
                <div class="top_left">
                    <a class="top_back" href="javascript:history.back();" data-dav-tj="detail|back|back|1|back@detail">
                        <span class="home_arrow"></span>
                    </a>
                </div>
                <div class="title_container">
                    {{ goodsname }}
                </div>
                <div class="top_right">
                    <a href="/" class="top_home" data-dav-tj="detail|home|home|1|home@detail">
                        <span class="home_icon"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GoodsTop from './goods_top.es6';
    export default GoodsTop;
</script>