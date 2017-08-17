<style>
	.modalMask {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.6);
	  opacity: 0;
	  tap-highlight-color: rgba(0, 0, 0, 0);
	  z-index: -1;
	  -webkit-transition: opacity 400ms;
	  transition: opacity 400ms;
	}
	.showMask {
	  opacity: 1;
	  z-index: 15;
	}
	.modalWrapper {
		background: #fff;
	  position: fixed;
	  z-index: 50;
	  bottom: 0;
	  width: 100%;
	  max-width: 640px;
	  height: 64.2%;
	  padding-top: 15px;
	  -webkit-box-sizing: border-box;
	  box-sizing: border-box;
	  font-size: 14px;
	  overflow: hidden;
	  /*-webkit-transform: translateY(100%);
	  transform: translateY(100%);*/
	  -webkit-transform: translateY(0);
	  transform: translateY(0);
	  -webkit-transition-property: -webkit-transform;
	  transition-property: -webkit-transform;
	  transition-property: transform;
	  transition-property: transform, -webkit-transform;
	  -webkit-transition-duration: 300ms;
	  transition-duration: 300ms;
	}
	.modalTitle {
		font-size: 16px;
	  color: #666;
	  text-align: center;
	  padding: 0 10px;
	}
	.modalCloseWrapper {
	  position: absolute;
	  z-index: 10;
	  width: 50px;
	  height: 50px;
	  top: 0;
	  right: 0;
	}
	.modalCloseWrapper .modal-close {
	  position: absolute;
	  z-index: 10;
	  top: 10px;
	  right: 10px;
	  width: 14px;
	  height: 14px;
	  display: inline-block;
	}
.modalCloseWrapper .modal-close:after {
  content: '';
  position: absolute;
  height: 1px;
  width: 17px;
  top: 50%;
  background: #999;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.modalCloseWrapper .modal-close:before {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  content: '';
  position: absolute;
  height: 1px;
  width: 17px;
  top: 50%;
  background: #999;
}
</style>
<template>
	<div>
		<div class="modalMask" @click = "handleCloseModal" :class = "{ showMask: isShowModal }"></div>
	  <div class="modalWrapper" :class = "{ showModal: isShowModal }">
	    <div class="modalCloseWrapper" @click = "handleCloseModal">
	        <span class="modal-close"></span>
	    </div>
	    <div class = "modalTitle" v-html = "contTitle"></div>
	    <div class = "modalCont">
				<slot></slot>
	    </div>
	    <div class = "disabledModal"
	    	@click = "handleConfirm"
	    	v-html = "confirmText"
	     :class = "{ modalConfirm: isDisabled }"></div>
	  </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isShowModal: true,
				isDisabled: false,
			}
		},
		mounted() {

		},
		props: {
			contTitle: {
				detault: "标题",
				type: String
			},
			confirmText: {
				default: "确定",
				type: String
			}
		},
		methods: {
			handleCloseModal() {
				this.isShowModal = false;
			},
			handleConfirm() {
				this.isShowModal = false;
			}
		}
	}
</script>