<template>
    <div class="order_list_container">
        <div class="order_list_switcher dav-shadow">
            <div :class="{'selected':selected==0}" @click = 'all' class="switcher_item" data-type="0"><span>全部</span></div>
            <div :class="{'selected':selected==3}" @click = 'unpaid' class="switcher_item" data-type="3"><span>待付款</span></div>
            <div :class="{'selected':selected==2}" @click = 'delivery' class="switcher_item" data-type="2"><span>待发货</span></div>
            <div :class="{'selected':selected==1}" @click = 'unget' class="switcher_item" data-type="1"><span>待收货</span></div>
            <div :class="{'selected':selected==4}" @click = 'completed' class="switcher_item" data-type="4"><span>待评价</span></div>
        </div>
        <div class="no-order hide">
            没有此类型订单
        </div>
        <orderlistitem></orderlistitem>
    </div>
</template>

<script>
    var orderlistitem = require("../module/orderlistitem.vue");
    export default{
        data:function() {
            return{
                selected:'',
                currentType:+location.href.substr(location.href.indexOf("type=")+5,1)||0,
                current:false,
            }
        },
        created:function(){
            var scope = this;
            var patharr = JSON.parse(sessionStorage.history);//获取路径path
                if(patharr.length > 2){//从标签页直接进入也会发出请求
                    console.log(scope);
                     var lastPath = patharr[patharr.length-2].path;
                    if(lastPath == 'order_detail' || lastPath == 'order_delivery' || lastPath == "detail" || lastPath=="grade" || lastPath =="add_address" || lastPath=="agent_pay"||(lastPath == "cart_confirm"&&$.cookie&&!$.cookie("dvd_cart_to_confirm"))) {//判断是否是浏览器上的返回键回到这个页面
                        this.selected = sessionStorage.getItem('selected');
                        scope.current = true;
                    }else if(lastPath == "cart_confirm"&&$.cookie&&$.cookie("dvd_cart_to_confirm")){
                        scope.current = true;
                        this.delivery();
                    }else{
                        sessionStorage.removeItem("selected");
                    }
                }
            if(!scope.current){
                if(this.currentType == 3){
                    this.unpaid();
                }else if(this.currentType == 2){
                    this.delivery();
                }else if(this.currentType == 1){
                    this.unget();
                }else if(this.currentType == 4){
                    this.completed();
                }else{
                    this.all();
                }
            }
        },
        components:{
            orderlistitem:orderlistitem
        },
        methods:{
            all:function(){
                var vm = this;
                vm.selected = 0;
                sessionStorage.setItem('selected',vm.selected);
            },
            unpaid:function(){
                var vm = this;
                vm.selected = 3;
                sessionStorage.setItem('selected',vm.selected);

            },
            delivery:function(){
                var vm = this;
                vm.selected = 2;
                sessionStorage.setItem('selected',vm.selected);
            },
            unget:function(){
                var vm = this;
                vm.selected = 1;
                sessionStorage.setItem('selected',vm.selected);
            },
            completed:function(){
                var vm = this;
                vm.selected = 4;
                sessionStorage.setItem('selected',vm.selected);
            },
            change:function(){
                this.$broadcast('changeSort',this.selected);
            }
        },
        watch:{
            'selected':'change'
        }
    }

</script>