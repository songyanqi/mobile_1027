<template>
	<div class = "avatarWrapper">
		<div class = "avatarTitle">
			<img src="//pic.davdian.com/free/Zhuanti/modify_title.png">
		</div>
		<div class = "avatarStep">
			<img src="//pic.davdian.com/free/Zhuanti/modify_tilte_icon.png">
		</div>
		<div>
			<!-- <div>12345 <img :src="firstUrl"></div> -->
			<div class = "uploadPic">
				<div class = "uploadPicCont">
					<img 
							:class = "{ imgRotate: imgrotate == 1,imgRotate1: imgrotate == 2,imgRotate2: imgrotate == 3 }"
							@touchstart = "handleTouchStart"
	            @touchmove = "handleTouchMove"
	            @touchend = "handleTouchEnd"
	            @touchcancle = "handleTouchCancle" :src="uploadPic">
				</div>
			</div>
			<div class = "uploadBtn">
				<input @change = "handleUpload" class = "uploadIpt" type="file" accept="image/*" name="">
				<img src="http://mamaj-oss-ws.oss-cn-beijing.aliyuncs.com/free/Zhuanti/new_upload_icon.png">
			</div>
		</div>
		<div class = "avatarTips">
			<p>上传头像 可生成自己的专属海报</p>
			<p>与全国大V妈妈为大V店3周年加油</p>
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
				<div class = "avatarNavs">
					<img v-for = "item of response.data.dataList" :src="item.avatar_url">
					<span v-if = "isshowdot" :style = "{ height: (avatarimg+2.5) + 'px' }" class = "avatarListDot">
					...</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import nativeAncestry from '../../../common/js/module/nativeAncestor.js';
	import popup from '../../../common/js/module/popup.js';
	import layout from "../../../../module/index/layout.es6";
	
	export default {
		data() {
			return {
				uploadPic: '//pic.davdian.com/avatar_poster/2017/upload_addV.png',
				avatarPoster: "",
				imgrotate: 0,
				// ceshi
				firstUrl: '',
			}
		},
		components: {},
		props: ["response","isshowdot",'avatarimg'],
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
      rotateImg(img) {

      },
			handleUpload (event) {
				let that = this;
				let files = event.target.files;
				let picStr = 'shop_logo';
        let file = files[0];
        let Orientation = null; 
				if (files.length) {

					// EXIF.getData(file, function() {  
     //        EXIF.getAllTags(this);   
     //        Orientation = EXIF.getTag(this, 'Orientation');  
     //    });

	        let data = new FormData();
	        data.append(picStr, file);
	        // 全站默认上传接口/upload.php
	        let url = '/upload.php?owner_id=2547=' + Date.now();
	        that.uploadPic = "//pic.davdian.com/free/2017/03/01/304_200_5ed94acf11f8a6fb57e1138bea19dccd.gif";
	        // popup.loading();
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
	          	that.firstUrl = res.data.shop_logo.src;
	            if (!res.errorCode) {
	              // let imgPic = res.data.shop_logo.src+"@200h_304w_1e_1c_2o";
	              // that.uploadPic = res.data.shop_logo.src;
	              $.ajax({
	              	url: "/api/mg/images/avatarmake/generatePoster",
	              	type: "POST",
									data: layout.strSign('uploadPics',{uploadFile: res.data.shop_logo.src}),
									dataType: "JSON",
									success (res) {
										if (!res.code) {
											// popup.loading(false);
											that.uploadPic = res.data.avatarUrl;

											// if (navigator.userAgent.match(/iphone/i)) {  
		         //            console.log('iphone');  
		         //            if(Orientation != "" && Orientation != 1){  
		         //                switch(Orientation){  
		         //                    case 6://需要顺时针（向左）90度旋转  
		         //                        that.imgrotate = 1;
		         //                        break;  
		         //                    case 8://需要逆时针（向右）90度旋转  
		         //                        that.imgrotate = 2; 
		         //                        break;  
		         //                    case 3://需要180度旋转  
		         //                        that.imgrotate = 3;  
		         //                        break;  
		         //                }         
				       //          }  
				       //        } 
											that.avatarPoster = res.data.posterUrl;
										} else {
											popup.toast(res.data.msg);
										}
									},
									error () {
										popup.toast("定制图片失败，请重试");
									}
	              });
	            } else {
	              popup.toast(res.errorMsg);
	            }
	          },
	          error: function (e,e1) {
	            if(e1=="timeout"){
	                 popup.toast("图片过大,请选则较小的照片或者切换到较好的网络环境后重试");
	             }else{
	                 popup.toast("上传失败，请检查网络后重试("+e1+")");
	             }
	          }
	        });
	      }
			},
		},
	}
</script>