<template>
    <div class = "goods_params clearfix"
         style = "overflow: hidden;"
         >
        <group>
            <cell-box v-for = "item of goodsparamobj">
                <span class = "params_title">{{ item.attrType }}</span>
                <span class = "params_content">{{ item.attrInfo }}</span>
            </cell-box>
        </group>
    </div>
</template>

<script>
    import GoodsParams from './goods_params.es6';
    export default GoodsParams;
</script>
