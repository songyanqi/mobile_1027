<style>
  .weui-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0 0 0 .5);
  }
  .weui-dialog {
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .weui-dialog__hd {
    padding: 1.3em 1.6em .5em;
  }
  .weui-dialog__bd {
    font-weight: 400;
    font-size: 18px;
  }
  .weui-dialog__bd {
    padding: 0 1.6em .8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999;
  }
  .weui-dialog__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .weui-dialog__btn {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
  }
  .davdian-confirm {
    color: #FF4A7D;
  }
</style>

<template>
  <div v-if = "isConfirm">
    <div class = "weui-mask"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd"><slot><div v-html="content"></div></slot></div>
      <div class="weui-dialog__ft">
        <span class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">{{cancelText}}</span>
        <span class="weui-dialog__btn davdian-confirm" @click="_onConfirm">{{confirmText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isConfirm: {
        default: true,
        type: Boolean,
      },
      title: String,
      confirmText:  {
        default: '确定',
        type: String,
      },
      cancelText:  {
        default: '取消',
        type: String,
      },
      content: String,
    },
    watch: {
      value (val) {
        this.isConfirm = val
      },
      isConfirm (val) {
        this.isConfirm = val
      }
    },
    methods: {
      _onCancel () {
          this.isConfirm = false;
          this.$emit('on-cancel');
      },
      _onConfirm () {
        this.isConfirm = false;
        this.$emit('on-confirm');
      }
    }
  }
</script>
