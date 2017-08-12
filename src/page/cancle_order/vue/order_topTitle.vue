<style scoped lang = "sass">
$themeColor: #FF4A7D;
	.top0 {
	  position: fixed;
	  top: 0;
	  width: 100%;
	  max-width: 640px;
	  z-index: 11;
	}
	.top0 .top_container {
	  font-size: 16px;
	  background-color: rgba(250,250,250,0.95);
	  text-align: center;
	  position: relative;
	}
	.top0 .top_left {
	  position: absolute;
	  top: 0;
	  left: 0;
	}
	.top0 .top_back {
	  width: 40px;
	  height: 44px;
	  float: left;
	}
	.top0 .home_arrow {
	  margin-top: 15px;
	  margin-left: 10px;
	  display: inline-block;
	  vertical-align: 0;
	  width: 12px;
	  height: 12px;
	  border-left: 1px solid #333;
	  border-bottom: 1px solid #333;
	  transform: rotate(45deg);
	  -webkit-transform: rotate(45deg);
	}
	.top0 .title_container {
	  margin-left: 80px;
	  margin-right: 80px;
	  font-size: 16px;
	  height: 44px;
	  line-height: 44px;
	  box-sizing: content-box;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  overflow: hidden;
	  color: #333;
	}
	.top0 .top_right {
	  position: absolute;
	  right: 0;
	  top: 0;
	}
	.top0 .top_container:after {
	  content: '';
	  position: absolute;
	  left: 0;
	  bottom: -1px;
	  background: #f0f0f0;
	  width: 100%;
	  height: 1px;
	}
	.top0 .top_right {
		position: absolute;
    right: 0;
    top: 0;
	}
	.top0 .top_home {
		width: 40px;
    height: 44px;
    float: right;
	}
	.top0 .top_home .home_icon {
		 width: 20px;
    height: 20px;
    background: url(//pic.davdian.com/free/home_icon_0825.png) no-repeat center;
    background-size: 100%;
    display: block;
    margin-top: 12px;
    margin-left: 10px;

	}
</style>

<template>
	<div class="top0">
  <div class="top_container">
    <div class="top_left">
      <a class="top_back" href="javascript:history.back();">
        <span class="home_arrow"></span>
      </a>
    </div>
    <div class="title_container" v-html = "titletext"></div>
    <div class="top_right">
      <a href="/" class="top_home">
        <span class="home_icon"></span>
      </a>
    </div>
  </div>
</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			titletext: {
				type: String,
				default: "",
			}
		},
		methods: {

		},
		mounted() {

		},
	}
</script>