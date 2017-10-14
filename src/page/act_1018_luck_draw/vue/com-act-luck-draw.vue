<style  lang="sass"  rel="stylesheet/scss">
  
</style>
<template>
	<div class = "luckDraw">
    <div></div>
	</div>
</template>
<script type="text/javascript">
  import encrypt from '../../../common/js/module/encrypt.js';
  import popup from '../../../common/js/module/popup.js';
  import native from '../../../common/js/module/native.js';

  export default {
  	components: {

  	},
  	data () {
  		return {
  			
  		}
  	},
    props: [],
  	created() {
  		// this.getData();
  	},
  	watch: {
      
  	},
  	methods: {
      isApp() {
        let u = navigator.userAgent;

        return !!u.match(/davdian|bravetime|vyohui/);
      },
      // 跳转方式
      handleJump(url) {
        this.isapp = this.isApp();
        if (this.isapp) {
          event.preventDefault();
          native.Browser.open({
            url: url
          });
        } else if (this.isMobile()) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      },
  		getData() {
  			
  		}
  	},
  }
</script>
