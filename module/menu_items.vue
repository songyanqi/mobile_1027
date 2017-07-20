<template>
    <a class="menu_item" :href="item_link">
        <span v-text="item_name">{{item_name}}</span>
        <span class="child pull-right"><i class="icon"></i></span>
    </a>
</template>
<style scoped>
    .menu_item{
        display: block;
        border-bottom: #eee solid 1px;
        line-height: 40px;
        padding-left: 10px;
        background-color: #FFFFFF;
    }
    .menu_item span {
        display: inline-block;
        height: 27px;
        line-height: 27px;
    }
    .menu_item .child {
        padding-top: 4px;
    }
    .menu_item .child i.icon {
        display: inline-block;
        vertical-align: 0;
        width: 8px;
        height: 8px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        margin-right: 10px;
        background: none;
    }
</style>
<script>
    export default{
        data:function(){
            return{

            }
        },
        props:["item_name","item_link"],
        created:function () {

        },
        methods:{

        }
    }
</script>
