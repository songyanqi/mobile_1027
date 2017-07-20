<template>
    <div id='switch'>
        <!--fiexd定位的弹幕-->
        <div v-if="commonflag && discussStatus" class="flexd" @click="open_comment">
            <div class="common_position"  v-if='commonList[commonList.length-2] && commonList[commonList.length-2].msg.content'>
                <span class="common_box" v-text='decodeURIComponent(commonList[commonList.length-2].msg.content)'></span>
                <img :src="commonList[commonList.length-2].speaker.avatar || defaultAvatar">
            </div>

            <div class="common_position" v-if='commonList[commonList.length-1] && commonList[commonList.length-1].msg.content'>
                <span class="common_box" v-text='decodeURIComponent(commonList[commonList.length-1].msg.content)'></span>
                <img :src="commonList[commonList.length-1].speaker.avatar || defaultAvatar">
            </div>
        </div>
        <!--开关按钮-->
        <div v-if="commonflag && discussStatus" class="flag">
            <span @click="switchflag" >关</span>
        </div>
        <div v-if="!commonflag && discussStatus" class="flag">
            <span @click="switchflag">开</span>
        </div>
        <div  class="commen_num" v-if='discussStatus'><span>讨论：{{total}}</span></div>
    </div>
</template>

<script>
    export default{
        props:['total', 'data'],
        data:function(){
            return{
                discussStatus:true,
                commonflag: true,
                total: 100,
                defaultAvatar:'//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png',
            }
        },
        computed:{
            commonList(){
                return this.data || []
            }
        },
        methods:{
            switchflag(){
                this.commonflag = !this.commonflag
            },
            open_comment(){
                this.$emit('usercomment')
            }
        },
        ready: function () {
        }
    }
</script>

<!-- 组建内改变全局css样式 -->
<style>
    
</style>
<!-- 组建内部css样式，不会改变全局样式 -->
<style lang='sass' scoped>
    .flag{
    z-index: 105;
    position: fixed;
    top: 54px;
    width: 100%;
    max-width: 640px;
    text-align: right;
    margin: 0 auto;
  }
  .flag span{
    margin-right: 10px;
    color: #ffffff;
    width: 28px;
    height:28px;
    line-height: 28px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background: #FF4A7D;
    display: inline-block;
    position: relative;
    border-radius:14px;
  }
  .flag span:after{
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    border: 1px solid #fff;
    width: 100%;
    height: 100%;
    border-radius:14px;
  }
  .commen_num{
    position: fixed;
    top: 57px;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    text-align: right;
    z-index: 99;
  }
  .commen_num span{
    display: inline-block;
    margin-right: 24px;
    padding: 0 19px 0 10px;
    color: #fff;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    background: rgba(0,0,0,.6);
    border-radius: 10px;
    background-clip: padding-box!important;
  }
  .flexd {
    width: 100%;
    position: fixed;
    z-index: 105;
    max-width: 640px;
    margin: 0 auto;
    text-align: right;
    padding: 10px;
    box-sizing: border-box;
    top: 80px;
    .common_position {
      position: relative;
      height: 35px;
      margin-bottom: 5px;
      img {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 25px!important;
        height: 25px!important;
        border-radius: 25px;
      }
      .common_box {
        padding: 0 40px 0 10px;
        color: #fff;
        display: inline-block;
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        background: rgba(0, 0, 0, .6);
        border-radius: 35px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
      }
    }
  }
</style>