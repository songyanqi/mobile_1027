<template>
	<div class = "avatarWrapper">
		<div class = "avatarTitle">
			<img src="//pic.davdian.com/free/Zhuanti/modify_title.png">
		</div>
		<div class = "avatarStep">
			<img src="//pic.davdian.com/free/Zhuanti/modify_tilte_icon.png">
		</div>
		<div>
			<div class = "uploadPic">
				<img :src="uploadPic">
			</div>
			<div class = "uploadBtn">
				<input @click = "handleUpload" class = "uploadIpt" type="file" accept="image/*" name="">
				<img src="//pic.davdian.com/free/Zhuanti/modify_btn_upload.png">
			</div>
		</div>
		<div class = "avatarTips">
			<p>上传头像 可生成自己的专属海报</p>
			<p>与全国大v妈妈为大v店3周年加油</p>
		</div>
		<div class = "avatarPoster">
			<div class = "AvatarPosterCont" v-if = "avatarPoster">
				<p class = "avatarTitleTips">长按保存海报</p>
				<img
						@touchstart = "handleTouchStart"
            @touchmove = "handleTouchMove"
            @touchend = "handleTouchEnd"
            @touchcancle = "handleTouchCancle" :src="avatarPoster">
			</div>
		</div>
		<div class = "avatarCont" v-if = "response">
			<p class = "avatarListTips">共有{{response.data.total}}人换头像啦</p>
			<div class = "avatarLists">
				<img v-for = "item of response.data.dataList" :src="item.avatar_url">
			</div>
		</div>
	</div>
</template>
<script>
	import nativeAncestry from '../../../common/js/module/nativeAncestor.js';
	import popup from '../../../common/js/module/popup.js';
	export default {
		data() {
			return {
				uploadPic: '//pic.davdian.com/free/Zhuanti/modify_avatar.png',
				avatarPoster: "//pic.davdian.com/free/Zhuanti/modify_avatar.png",
				// avatarPoster: "",
			}
		},
		components: {},
		props: ["response"],
		created() {},
		watch: {},
		mounted () {
		},
		methods: {
			handleTouchStart (e) {
        this.isLongTabTime = setTimeout(() => {
          if (this.isLongTap) {
            let picSrc = e.target.getAttribute('src');
            // let idx = picSrc.indexOf("?");
            // picSrc = picSrc.substr(0,idx);
            nativeAncestry.savePic(picSrc);
          }
        },500);
      },
      handleTouchMove (e) {
        this.isLongTap = false;
        clearTimeout(this.isLongTabTime);
      },
      handleTouchEnd (e) {
        this.isLongTap = true;
        clearTimeout(this.isLongTabTime);
      },
      handleTouchCancle (e) {
        this.isLongTap = true;
        clearTimeout(this.isLongTabTime);
      },
			handleUpload () {
				let that = this;
				document.querySelector(".uploadIpt").addEventListener('change', function (event) {
          var files = event.target.files;
          var picStr = 'shop_logo';
           var file = files[0];
           var data = new FormData();
           data.append(picStr, file);
          // 全站默认上传接口/upload.php
          var url = '/api/mg/sale/avatarmake/generatePoster';
          $(".picBack img").attr("src","//pic.davdian.com/free/2017/03/01/304_200_5ed94acf11f8a6fb57e1138bea19dccd.gif");
          $.ajax({
            cache: false,
            async: true,
            url: url,
            type: 'post',
            dataType: 'json',
            timeout:20000,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
            	console.log("success",res);
            	if (!res.code) {
              	that.avatarPoster = res.data.shop_logo.s;
            	} else {
            		popup.toast(res.data.msg);
            	}
            },
            error: function (e,e1) {
              console.log("error",e,e1);
            }
          });
        }, false);
			},
		},
	}
</script>