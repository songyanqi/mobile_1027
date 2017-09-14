<template>
    <!--品牌介绍-->
    <div>
	    <group v-if = "brandlist.length" class = "brand_wrap">
	        <panel :list="brandlist" :type="brandType"></panel>
	        <span v-if = "brandlist[0] && brandlist[0].url" class = "brand_arrow"></span>
	    </group>
    </div>
</template>

<script>
    import BrandType from './brand_type.es6';
    export default BrandType;
</script>
