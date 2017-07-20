<template>
    <div id='common'>
        <div class="commonroom">
	        <ul id="ulList">
	            <audio preload="auto" class='allAudio'></audio>
	            <li class='teacherChatData' v-for="(common,index) in barrageList" :key="common.uuid" msg_id="{{decodeURIComponent(common.speake.name)}}">
	                <div class="timebox" v-if='index == 0 || (common.msg.time - barrageList[index - 1].msg.time) > 5*60*1000'>
	                    <span class="talk_time"  v-if="new Date()-common.msg.time < 60*60*12*1000">{{getTime(parseInt(common.msg.time))}}</span>
	                    <span class="talk_time"  v-if="new Date()-common.msg.time >= 60*60*12*1000">{{getFullTime(parseInt(common.msg.time))}}</span>
	                </div>
	                <div class="timebox">
	                	<div class='talk_time remindNews' v-if='common.isTips || common.allMsg && JSON.parse(common.allMsg) && JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1'>{{decodeURIComponent(common.msg.content)}}</div>
	                </div>
	                

	                <span class="head" v-if='!(common.isTips || common.allMsg && JSON.parse(common.allMsg) && JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1)'>
	                    <img :src="common.speaker.avatar || defaultAvatar">
	                </span>
	                <div class="right" v-if='!(common.isTips || common.allMsg && JSON.parse(common.allMsg) && JSON.parse(JSON.parse(JSON.parse(common.allMsg).content).extra).info.isTips==1)'>
	                    <h2>{{decodeURIComponent(common.speaker.name)}}</h2>
	                    <!--text类型的信息-->
	                    <div  v-if="common.msg.type==0" class='main' :class="{'blue':common.is_answer}">
	                        <i class='main_picBox_icon2'></i>
	                        <span class='TextMessageSpan formfield'>{{decodeURIComponent(common.msg.content)}}</span>
	                    </div>
	                    <!--语音类型的信息-->
	                    <div class="audiomain" @click="playVoiceFlag(index, common)" v-if="common.msg.type==2||common.msg.type==91" :class="{'replied':common.replied}">
	                        <div class="voice"  :class="{ 'play': isPlay[index], 'noPlay': !isPlay[index] }">
	                            <i class="fa fa-rss" v-if="common.msg.duration>0"></i>
	                            <!-- <p :style="{width:(common.msg.voicewidth + 40)+'px'}" class="main">{{common.msg.duration}}''</p> -->
	                            <p :style="{width:( getWidth(common.msg.duration) + 40)+'px'}" class="main">{{common.msg.duration}}''</p>
	                            <i class='curcle-full' v-if='!curcleFullHash[common.uuid] && !common.msg.curcleFullHash'></i>
	                        </div>
	                        <div class='audio' :data-src="common.msg.url" preload="auto" :data-type=1 :data-index="index" v-if="common.msg.type==2"></div>
	                        <div class='audio' :data-src="common.msg.url" preload="auto" :data-type=91 :data-index="index" v-if="common.msg.type==91"></div>
	                    </div>
	                    <!--图片类型的信息-->
	                    <div v-if="common.msg.type==1" class="mainPic">
	                        <div class="picBox">
	                            <div class='picBox_icon1_container'>
	                                <i class='picBox_icon1'></i>
	                                <i class='picBox_icon2'></i>
	                                <img :src="common.msg.url" alt="">
	                            </div>
	                            <img :src="common.msg.url" alt="">
	                        </div>
	                        <div class="picBox_container" @click='previewImage(common.uuid)'>
	                            <img :style="getImageStyle(common)" :src="common.msg.url" alt="">
	                        </div>
	                    </div>
	                </div>
	            </li>
	        </ul>
	        <div class="bottom"></div>
	    </div>
    </div>
</template>

<script>
    // import layout from "../layout/api.es6";
    export default {
    	props:['data','flag', 'id'],
        data(){
            return {
            	teacherDownMore: true,
            	isPlay:[],
            	curcleFullHash:{},
            	length:null,
                defaultAvatar:'//pic.davdian.com/free/2016/12/30/160_160_b879eb6581e8b159e0d35fe485011db3.png',
            }
        },
        created(){

        },
        mounted(){
        	this.$nextTick(function () {
        		setTimeout(function(){
        			document.getElementById('common').scrollTop=document.getElementById('common').scrollHeight
        		},100)
        		this.initScrool()
		  	})
        	this.init()
        },
        computed:{
        	barrageList(){
                window.testData = this.data
        		return this.data || []
        	},
        	updataflagteacher(){
        		return this.flag || false
        	}
        },
        components: {},
        methods:{
        	initScrool(){
        		$('#common').on("scroll",function(){
	                if (document.getElementById('common').scrollTop > document.getElementById('common').scrollHeight - parseInt(document.body.clientHeight * 0.87) - 2){
	                	 document.getElementById('common').scrollTop = document.getElementById('common').scrollHeight - parseInt(document.body.clientHeight * 0.87) - 2
	                }
	                if (document.getElementById('common').scrollTop<1){
	                	document.getElementById('common').scrollTop = 1
	                }
	            });
        	},
        	getWidth(duration){
        		return (duration + 65)*2 > 200 ? 200 : (duration + 65)*2
        	},
            init(){
            	this.curcleFullHash = JSON.parse(localStorage.getItem('curcleFullHash_'+this.id)) || {}
            	this.scroolEvent()
            },
            scroolEvent(){
            	var that = this
            	$('#common').on("scroll",function(){
	                if (document.getElementById('common').scrollTop<100 && that.updataflagteacher){
	                	 that.$emit('getupdatateacher', that.updataflagteacher)
	                }
	            });
            },
            getTime: function (second) {
                var s = new Date(second).getSeconds();
                var m = new Date(second).getMinutes();
                var h = new Date(second).getHours();
                var str;
                if (h) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else if (m) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                }
                return str;
            },
            getFullTime: function (second) {
                var y = new Date(second).getFullYear();
                var monthtime = new Date(second).getMonth();
                var daytime = new Date(second).getDate();
                var s = new Date(second).getSeconds();
                var m = new Date(second).getMinutes();
                var h = new Date(second).getHours();
                var str;
                var fullTime;
                if (h) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else if (m) {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                } else {
                    str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
                }
                fullTime = y + '年' + (monthtime + 1) + '月' + daytime + '日' + str;

                return fullTime
            },
            getImage:function (w, h) {
                var width, height;
                if (w-h >0){
                    if (w > 230){
                        width = '230px'
                        height = 230 * (h/w) + 'px'
                    }
                }else {
                    if (h > 230){
                        height = '230px'
                        width = 230 * (w/h) + 'px'
                    }
                }
                return {
                    width:width,
                    height:height
                }
            },
            getImageStyle: function (item) {
                var obj, o;
                if (item.imageInfo){
                    obj = item.imageInfo
                    o = this.getImage(item.imageInfo.width, item.imageInfo.height)
                    return o
                } else {
                    try{
                        obj = JSON.parse(JSON.parse(JSON.parse(item.allMsg).content).extra).info.imageInfo
                        o  = this.getImage(obj.width, obj.height)
                        return o
                    }catch(e){
                        return {}
                    }
                }
            },
            //语音
            getJsObj: function (index) {
                if (!$('#ulList li').eq(index)[0]){
                    return 'no';
                }
                if ($('#ulList li').eq(index).find('.audio') && $('#ulList li').eq(index).find('.audio').attr('data-src')) {
                    $('.allAudio').get(0).src = $('#ulList li').eq(index).find('.audio').attr('data-src')
                    return $('.allAudio').get(0)
                } else {
                    return false
                }
            },
            getJqObj: function (index) {
                return $('#ulList li').eq(index).find('.audiomain')
            },
            playVoiceFlag: function (index) {
                var that = this
                var audioJs = that.getJsObj(index)
                var audioJq = that.getJqObj(index)
                if (this.barrageList[index]){
                    this.curcleFullHash[this.barrageList[index].uuid] = true
                }
                $('#ulList li').eq(index).find('.curcle-full').css('display','none')
                localStorage.setItem('curcleFullHash_' + this.id, JSON.stringify(this.curcleFullHash))

                if (that.playIndexFlag > that.barrageList.length - 1){
                    that.playIndexFlag = that.barrageList.length - 1
                }
                if (index == 'no'){
                    that.playIndexFlag = index + 1
                    that.getTeacherListAudio()
                    return
                }
                if (audioJs) {
                    if (index == that.playIndexFlag) {
                        if (that.barrageList[index].isPlay){
                            audioJs.pause()
                            that.barrageList[index].isPlay = false
                            audioJq.removeClass('play')
                        }else {
                            audioJs.play()
                            that.barrageList[index].isPlay = true
                            audioJq.addClass('play')
                        }
                    } else {
                        console.log("audioJs",audioJs);
                        if (that.playIndexFlag || that.playIndexFlag == 0) {
                            that.getJqObj(that.playIndexFlag).removeClass('play')
                            that.barrageList[that.playIndexFlag].isPlay = false
                        }
                        that.playIndexFlag = index
                        audioJs.play()
                        audioJq.addClass('play')
                        that.barrageList[index].isPlay = true
                        // console.log(audioJs.onended)
                        // if(audioJs.onended == 'undefined'){
                        //     console.log(1231313231232)
                        // } else {
                        audioJs.onended = function () {
                            var i = index + 1
                            that.playVoiceFlag(i)
                            audioJq.removeClass('play')
                            that.barrageList[index].isPlay = false
                        }
                        // }
                        
                    }
                } else {
                    var i = index + 1
                    that.playVoiceFlag(i)
                }
            },
            //图片微信
            previewImage:function (uuid) {
                var previewImageList = []
                var img = ''
                for (let i =0;i<this.barrageList.length;i++){
                    if (this.barrageList[i].msg && this.barrageList[i].msg.type == 1){
                        previewImageList.push(this.barrageList[i].msg.url)
                    }
                    if (uuid == this.barrageList[i].uuid && this.barrageList[i].msg && this.barrageList[i].msg.url){
                        img = this.barrageList[i].msg.url
                    }
                }
                wx.previewImage({
                        current: img,
                        urls: previewImageList
                });
            },
        }
    }
</script>
<!-- 组建内部css样式，不会改变全局样式 -->

<style lang='sass' rel="stylesheet/scss" scoped>
	@import "../../../stylesheet/yo/usage/core/reset";
	@import "../../../stylesheet/yo/usage/module/commonList";
	.remindNews{
	    margin-left: 25px!important;
	    margin-right: 25px!important;
	    margin-top: 10px!important;
	    margin-bottom: 10px!important;
	    padding-left: 20px!important;
	    padding-right: 20px!important;
	    padding-top: 6px!important;
	    padding-bottom: 7px!important;
	}
	#common{
		position: fixed;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
		width: 100%;
		height: 87%;
	    z-index: 1;
	    background: #f0f0f0;
	}
    .commonroom{
    width:100%!important;
    padding:0 10px;
    ul{
      padding-bottom:10px;
      width:100%;
      min-height: 480px;
      li{
        min-height: 70px;
        padding-bottom: 20px;
        .timebox{
          text-align: center;;
          width:100%;
          max-width: 640px;
          /*height:30px;*/
          .talk_time{
            display: inline-block;
            /*height:20px;*/
            color: #FFFFFF;
            line-height: 20px;
            padding:0 10px;
            font-size: 11px;
            background: #cccccc;
            @include border-radius(4px);
          }
        }
        .right {
          .mainPic{
            max-height: 230px;
            max-width: 230px;
            margin-top: 5px;
            margin-left: 5px;
            position: relative;
            .picBox{
              max-height: 230px;
              max-width: 230px;
              .picBox_icon{
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid #fff;
                border-bottom: transparent;
                position: absolute;
                left: 0;
                top: 8px;
                overflow: hidden;
              }
              .picBox_icon1_container{
                position: absolute;
                left: 1;
                top: 8px;
                width: 10px;
                height: 20px;
                overflow: hidden;
                img{
                  max-height: 230px;
                  max-width: 230px;
                  opacity: 1;
                  margin-top: -8px;
                }
              }
              .picBox_icon1{
                position: absolute;
                border-right: 10px solid transparent;
                border-bottom: 20px solid #f0f0f0;
                border-top: transparent;
                width: 10px;
                height: 20px;
              }
              .picBox_icon2{
                position: absolute;
                border-right: 10px solid #f0f0f0;
                border-bottom: 3px solid transparent;
              }
              img{
                max-height: 230px;
                max-width: 230px;
                opacity: 0;
              }
            }
            .picBox_container{
              max-height: 230px;
              max-width: 220px;
              position: absolute;
              border-radius: 4px;
              top: 0;
              left: 10px;
              overflow: hidden;
              img{
                max-height: 230px;
                max-width: 230px;
                margin-left: -10px;
              }
            }
          }
          margin-left: 30px;
          h2 {
            font-size: 12px;
            font-weight: normal;
            min-height: 20px;
            margin-left: 5px;
            color: #666;
          }
          .audiomain{
            .main{
              text-indent: 30px;
              color: #333;
            }
            height:30px;
            display: inline-block;
            .voice {
              height:40px;
              .fa {
                position: relative;
                display: inline-block;
              }
              .min {
                position: absolute;
                right: -53px;
                top: 8px;
                width: 40px;
                color: #666;
                font-size: 12px;
              }
            }
          }
          .main{
            min-width: 40px;
            min-height: 40px;
            font-size: 14px;
            color: #333;
            background-color: #fff;
            border-radius: 3px;
            padding: 7px 10px 6px;
            position: relative;
            display: inline-block;
            line-height: 27px;
            word-break: break-all;
            word-wrap: break-word;
            max-width: 80%;
            margin-left: 15px;
            margin-top: 5px;
            padding-left: 12px;
            span{
              display: block;
              word-break: keep-all;
              word-wrap: break-word;
              overflow: hidden;
              max-width: 500px;
            }
          }
          .noPlay .fa:after {
            content: "";
            position: absolute;
            top: -14px;
            left: 35px;
            width: 12px;
            z-index: 100;
            height: 17px;
            background: url('//pic.davdian.com/free/2016/12/24/22_32_16dffc36683debdbbf6a813306594422.png') no-repeat;
            background-size: 12px;
          }
          .play .fa:after {
            content: "";
            position: absolute;
             left: 31px;
             width: 20px;
             top: -15px;
             z-index: 100;
             height: 20px;
             background: url('//pic.davdian.com/free/2017/02/27/playVoice.gif') no-repeat;
             background-size: 20px;
          }
          .main:before {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 20px solid #fff;
            border-bottom: transparent;
            content: "";
            position: absolute;
            left: -10px;
            top: 8px;
          }
          .main_picBox_icon2{
            position: absolute;
            left: -15px;
            border-right: 15px solid #f0f0f0;
            border-bottom: 3px solid transparent;
          }
        }
        .head{
          width: 30px;
          height: 30px;
          float: left;
          overflow: hidden;
          img {
            width: 30px;
            height: 30px;
            @include border-radius(15px);
          }
        }
      }
      .myself{
        padding-bottom: 20px;
        overflow: hidden;
        .timebox{
          text-align: center;;
          width:100%;
          height:30px;
          .talk_time{
            display: inline-block;
            height:20px;
            color: #FFFFFF;
            line-height: 20px;
            padding:0 5px;
            background: #cccccc;
            @include border-radius(3px);
          }
        }
        .right {
          float: right;
          padding-right: 35px;
          h2 {
            position: absolute;
            font-size: 12px;
            font-weight: normal;
            margin-bottom: 5px;
          }
          .audiomain{
            height:30px;
            .voice {
              width: 80px;
              background: #FFFFFF;
              @include border-radius(5px);
              .fa {
                position: relative;
                display: inline-block;
              }
              .min {
                position: absolute;
                right: -53px;
                top: 8px;
                width: 40px;
                color: #666;
                font-size: 12px;
              }
            }
          }
          .main{
            float: right;
            font-size: 14px;
            background-color: #fff;
            color: #666;
            border-radius: 3px;
            padding: 7px 10px 6px;
            position: relative;
            display: inline-block;
            line-height: 17px;
            word-break: break-all;
            word-wrap: break-word;
            max-width: 70%;
            margin-left: 4px;
            word-wrap:break-word;
            word-break:break-all;
          }
          .play .fa:after {
            content: "";
            position: absolute;
            top: -11px;
            left: 39px;
            width: 12px;
            z-index: 100;
            height: 13px;
            background: url('//pic.davdian.com/free/voice_img_311.gif') no-repeat;
            background-size: 12px;
          }
          .main:before {
            width: 0;
            height: 0;
            border-left: 0px solid transparent;
            border-right: 0px solid transparent;
            border-top: 0px solid #fff;
            border-bottom: transparent;
            content: "";
            position: absolute;
            left: 0px;
            top: 0px;
          }
          .main:after {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #fff;
            border-bottom: transparent;
            content: "";
            position: absolute;
            right: -10px;
            top: 8px;
          }
        }
        .head{
          position: absolute;
          right: 0;
          width: 25px;
          height: 25px;
          float: left;
          overflow: hidden;
          @include border-radius(25px);
          img {
            width: 25px;
            height: 25px;
          }
        }
      }
    }
  }
</style>
