<template>
    <div class="kind_sort">
        <a :class="{'selected':selected==1}" href="javascript:void(0)" @click = "a"><span>新品</span></a><a :class="{'selected':selected==2}" href="javascript:void(0)" @click = "b"><span>销量</span></a><a class="price" :class="{'selected':selected==3}" href="javascript:void(0)" @click = "c"><span>价格</span></a>
    </div>
    <!--<categorys :referer="referer"></categorys>-->
    <categorys :referer="referer"></categorys>
</template>



<script>
//    var categorys = require("../module/new_category.vue");
    var categorys = require("../src/component/com-maybeyoulike.vue");
    export default{
        data:function(){
            return{
                selected:0,
                even:'',
                currentType:+location.href.substr(location.href.indexOf("sort=")+5,1)||0,
                current:false,
                list:[],
                no_more:false,
                ajaxing:true,
                loading:false,
                url:"",
                pageSize:syncPageSize,
                page:"",
                allData:[[],[],[]],
                typePage:[1, 1, 1],
                anymore:[{flag:false},{flag:false},{flag:false}],// 下拉刷新标识
                referer:{}
            }
        },
        components:{
            categorys:categorys,
        }
        ,
        created:function(){
            var scope = this;
            var ua = navigator.userAgent.toLowerCase();
            if(!isPrivateMode){//浏览器中能存储session storage
                var patharr = JSON.parse(sessionStorage.history);//获取路径path
                if(patharr.length > 2){//从标签页直接进入也会发出请求
                    var lastPath = patharr[patharr.length-2].path;
                    if(lastPath == 'detail') {//判断是否是浏览器上的返回键回到这个页面
                        this.selected = sessionStorage.getItem('goodSelected');
                        this.allData = eval(sessionStorage.getItem('gooddata'));//获取session的数据
                        this.typePage = JSON.parse(sessionStorage.getItem('goodTypePage'));
                        if (eval(sessionStorage.getItem('good_no_more')) != undefined) {
                            this.anymore = eval(sessionStorage.getItem('good_no_more'));
                        };
                        this.list = this.allData[this.selected-1];
                        scope.current = true;
                        if (/iphone|ipad|ipod/.test(ua)) {
                            setTimeout(function(){
                                document.body.scrollTop = eval(sessionStorage.getItem('goodTop'));
                            },0);
                        }
                        this.referer = JSON.parse(sessionStorage.getItem("categoryReferer"));
                    }else{
                        // 清空数据
                        sessionStorage.removeItem("gooddata");
                        sessionStorage.removeItem("goodTypePage");
                        sessionStorage.removeItem("good_no_more");
                        sessionStorage.removeItem("goodSelected");
                        sessionStorage.removeItem("categoryReferer");
                    }
                }
            };
            if(!scope.current){
                if(this.currentType == 2){
                    this.b();
                }else if(this.currentType == 3){
                    this.c();
                }else{
                    this.a();
                }
            };
            this.scroll();
        },
        methods:{//点击不同的a标签，替换不同的ajax链接，刷新页面，但是浏览器上的返回不能返回上一个点击a标签的网页
            a:function(){
                var vm = this;
                vm.selected = 1;
                var number = vm.selected - 1;
                vm.even = vm.selected;
                sessionStorage.setItem('goodSelected',vm.selected);
                vm.no_more = vm.anymore[number].flag;
                if(vm.allData[number].length == 0){
                    vm.getData();
                }else{
                    vm.list = vm.allData[number];
                }
            },
            b:function(){
                var vm = this;
                vm.selected = 2;
                this.even = vm.selected;
                var number = vm.selected - 1;
                sessionStorage.setItem('goodSelected',vm.selected);
                vm.no_more = vm.anymore[number].flag;
                vm.ajaxing = true;
                if(vm.allData[number].length == 0){
                    vm.getData();
                }else{
                    vm.list = vm.allData[number];
                }
            },
            c:function(){
                var vm = this;
                vm.selected = 3;
                var number = vm.selected - 1;
                this.even = vm.selected;
                sessionStorage.setItem('goodSelected',vm.selected);
                vm.no_more = vm.anymore[number].flag;
                vm.ajaxing = true;
                if(vm.allData[number].length == 0){
                    vm.getData();
                }else{
                    vm.list = vm.allData[number];
                }
            },
            getData:function(){
                var scope = this;
                var currentType = scope.selected - 1;
                if(scope.ajaxing){
                    scope.ajaxing = false;
                    //请求数据
                    if(!scope.no_more){
                        scope.loading = true;
                        $.ajax({
                            url:goodsUrl,
                            dataType:"json",
                            data:{
                                sort:scope.selected,
                                _t:Date.now()+Math.random(),
                                page_size: scope.pageSize,
                                page: scope.typePage[currentType],
                            },
                            success:function (result) {
                                scope.loading = false;
                                if (!result["error"]) {//返回数据没有问题
                                    scope.ajaxing = true;
                                    if (result["data"].length) {//返回函数中有数据
                                        scope.allData[currentType] = scope.allData[currentType].concat(result.data);
                                        scope.list = scope.allData[currentType];
                                        scope.typePage[currentType] = scope.typePage[currentType] + 1;//ajax中的参数中页数加1
                                        scope.referer = result.referer;
                                        sessionStorage.setItem('gooddata',JSON.stringify(scope.allData));
                                        sessionStorage.setItem('goodTypePage',JSON.stringify(scope.typePage));
                                        sessionStorage.setItem('categoryReferer',JSON.stringify(scope.referer));


                                    }else{
                                        scope.no_more = true;//显示 没有更多商品了
                                        scope.anymore[currentType] = true;
                                        sessionStorage.setItem('good_no_more',JSON.stringify(scope.anymore));
                                    }
                                }
                            },error:function () {
                                bravetime.ajaxError();
                                scope.loading = false;
                                scope.no_more = true;
                                scope.ajaxing = true;
                            }
                        })
                    }
                }
            },
            scroll:function(){
                var scope = this;
                $(window).scroll(function(){//滚动条滚动事件
                    if(window.disabledGoodsLoading){
                        return false;
                    }
                    var top = document.body.scrollTop;
                    sessionStorage.setItem('goodTop',top);
                    var offset = window.pageYOffset;//文档现在的位置加上窗口的高度
                    var offsetTop = document.body.scrollHeight;//整个页面的高度
                    if(offsetTop-offset-window.screen.availHeight<100){//如果滚动条到一定位置
                        scope.getData();
                    }
                })

            },
            change:function(){
                this.$broadcast('changeData',this.list);
            },
            loadings:function () {
                this.$broadcast('loadings',this.loading);
            },
            no_mores:function () {
                this.$broadcast('no_mores',this.no_more);
            }
        },
        watch:{
            'list':'change',
            'loading':'loadings',
            'no_more':'no_mores',
        }

    }
</script>
