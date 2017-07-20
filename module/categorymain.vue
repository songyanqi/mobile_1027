<template>
    <div class="box box-h con">
        <div class="item left" id="wrapper">
            <div class="box-v left_container">
                <div class="item type"
                     v-for="(i, item) in list"
                     v-text="item.title"
                     :class="{'active':i==index}"
                     @click="changeList(i,item)">
                </div>
            </div>
        </div>
        <div class="item item-3 right" id="right">
            <div class="right_con">
                <div class="banner" v-if="category.banner&&category.banner.length">
                    <img :src="category.banner[0].img" alt="" @click="click(category.banner[0])">
                </div>
                <div class="category box box-warp" v-for="g in Math.ceil(category.category.length/9)">
                    <div class="item item-1of3 cat_block" v-for="item in 9" v-if="category.category[g*9+item]"  @click="click(category.category[g*9+item])">
                        <p><img :src="category.category[g*9+item].img"></p>
                        <p v-text="category.category[g*9+item].text" class="text"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data:function(){
            return{
                list: [], // 左侧列表
                index: 0, // 左侧选中
                category: {}, // 右侧数据
                pos: 0, // 右侧位置
                left_container:$(".left_container"),
                right: $(".right"),
                left: $(".left"),

            }
        },
        created:function(){
            if(!Units.isApp()||Units.isIOS()){
              document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            }
//
            var scope = this;
            this.initData(this,()=>this.initMenu());
            this.initBanner();

        },
        methods:{
            changeList:function (i,item) {
                this.index = i;
                this.category = item.content;
                this.$nextTick(function () {
                    this.leftScroll();
                });
            },
            click:function (d) {
                var data={
                    list:this.list,
                    index:this.index,
                    category:this.category,
                    pos:rightScroll.y
                };
                this.setCacheData(data);
                bravetime.goto(d.link);
            },
            refreshRight:function () {
                var imgs = $(".right").find("img");
                var flag = false;
                imgs.each(function (index, el) {
                    el.onload = function () {
                        if($.makeArray(imgs).filter(function (x) {
                                    return !x.complete;
                                }).length==0&&!flag){
                            flag = true;
                            window.rightScroll && window.rightScroll.refresh();
                        }
                    }
                })
            },
            initMenu:function(index) {
                var config = { mouseWheel: true,preventDefault:false ,bounce:true};
                window.leftScroll = new IScroll('#wrapper', config);
                if(index){
                    this.leftScroll(true);
                }
            },
            initRight:function(pos) {
                var config =  { mouseWheel: true,preventDefault:false ,bounce:true};
                if(pos){
                    config.startY = pos;
                }
                window.rightScroll = new IScroll('#right',config);
            },
            initBanner:function() {
                window.sw = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    observer:true,
                    autoplay:2500
                })
            },
            initData:function (category) {
                var data = this.getCacheData();
                var scope = this;

                if (data) {
                    // 有缓存数据就从缓存中取数据
                    this.index = data.index;
                    this.list = data.list;
                    this.$nextTick(()=>this.initMenu(data.index));
                    this.category = data.category;
                    this.$nextTick(()=>this.initRight(data.pos));
                } else {
                    // 否则从网络请求
                    $.ajax({
                        url: dataUrl,
                        dataType: "json",
                        success: function (result) {
                            let {code, data, msg} = result;
                            if (code) {
                                bravetime.info(msg);
                            } else {
                                scope.list = data;
                                scope.$nextTick(()=>scope.initMenu());
                                scope.category = category.list[category.index].content;
                                scope.$nextTick(()=>scope.initRight());
                            }
                        }, error: _=>bravetime.info('网络异常,请稍后重试')
                    });
                }
            },
            getCacheData:function() {
                if (localStorage.category) {
                    var c = localStorage.category;
                    localStorage.removeItem("category");
                    return JSON.parse(c);
                } else {
                    return null;
                }
            },
            setCacheData:function(data) {
                localStorage.category = JSON.stringify(data);
            },
            leftScroll:function(imm) {
                var top = $(".left .active").get(0).offsetTop;
                var number = $(".left_container").height()-$(".left").height();
                if($(".left_container")-$(".left").height()<0){
                    return false;
                }
                if(number - top>0){
                    window.leftScroll.scrollTo(0,-top,imm?0:500);
                }else{
                    window.leftScroll.scrollTo(0,(-$(".left_container").height()+$(".left").height()),imm?0:500);
                }

            }
        },
        watch:{
            'category':function () {
                this.$nextTick(function () {
                    this.refreshRight();
                });
            }
        }
    }
</script>
