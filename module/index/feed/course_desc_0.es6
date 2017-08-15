import lay from "../../layout/api.es6"
import native from '../../../src/common/js/module/native.js'
let axios = require("axios");
// require('babel-polyfill');   // 体积太大了，注掉
require('es6-promise').polyfill();
export default {
    data(){
        return {
            teacherDescInfo:{},
            class_introduce_left:1,
            maskAttention:false,
            teacherList:[],
            userId:null,
            fixFlag: false,
            isApp: !!navigator.userAgent.match(/davdian|bravetime|vyohui/),
            userTicket: window.userTicket,
            arr:[],
            introduceGuide:false,
            guide:0,
            AppVersionFlag: true
        }
    },
    filters: {
        trans: function (value) {
            if (!value) return '';
            return value.replace(/\n/g,"<br/>")
        }
    },
    props: ['data'],
    created:function(){
        var that = this
        let data = this.data.body;
        for(var i in data){
            this[i]=data[i]
        }
        this.userId = window.userId
        window.teacherId = this.data.body.teacherDescInfo.teacherId
        if (that.getAppVersion()<410 && that.isApp)
            that.AppVersionFlag = false
    },
    mounted(){
        let that = this
        this.$nextTick(function(){
            that.scroolFun()
            setTimeout(function(){
                if (localStorage.getItem('introduceGuide')){
                    that.introduceGuide = false
                }else {
                    window.backNewData.$children[0].bottomBtn = true
                    localStorage.setItem('introduceGuide', 1)
                    if ($('.class_introduce_tit').offset().top > 400){
                        $('#scroll_container').scrollTop($('.class_introduce_tit').offset().top-400)
                    }
                    that.introduceGuide = true
                    that.class_introduce_left = 2
                    that.guide = 1
                }
                that.introduceGuide = true
                that.class_introduce_left = 2
                that.guide = 1
                setTimeout(function(){
                    $(".introduceGuideMask").on('touchmove',function(e){
                        e.preventDefault();
                    })
                    $(".bottomBtn").on('touchmove',function(e){
                        e.preventDefault();
                    })
                    $(".lectureNnotesAll").on('touchmove',function(e){
                        e.preventDefault();
                    })
                    $(".writeAllSignUp").on('touchmove',function(e){
                        e.preventDefault();
                    })
                },100)
            },1000)
        })
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return {
                marginTop: scope.data.marginTop + 'px'
            }
        },
        attention: function () {
            return this.data.body.teacherDescInfo.followStatus
        },
        guestList: function () {
            return this.data.body.teacherDescInfo.guestList
        },
        courseDescInfo: function(){
            return this.data.body.courseDescInfo
        },
        courseDescTitle: function(){
            return this.data.body.courseDescTitle
        },
        teacherDescTitle: function(){
            return this.data.body.teacherDescTitle
        },
        courseNotesTitle: function(){
            return this.data.body.courseNotesTitle
        },
        notesList:function () {
            return this.data.body.courseNotesInfo.notesList || []
        },
        notesNum: function (){
            return this.data.body.courseNotesInfo.notesNum
        }
    },
    methods:{
        know:function(){
            if(this.guide==1){
                this.guide = 2
                return
            }
            if (this.guide==2){
                this.guide =0
                this.introduceGuide = false
                window.backNewData.$children[0].bottomBtn = false
                return
            }
        },
        show_all:function (item) {
            if(this.isApp){
              native.Browser.open({
                                    url: '/noteDetail.html?notesId=' + item.notesId + '&courseId=' + window.courseId,
                                    type:'0',
                                    headtype:'0'
                                    })
            } else {
                window.location.href = '/noteDetail.html?notesId=' + item.notesId + '&courseId=' + window.courseId
            }
        },
        share(item){
            var that = this
            var obj = {}
            obj.obj={
                notesId:item.notesId,
                courseId: window.courseId,
                headImg:item.headImg
            }
            window.courseId = window.courseId.toString()
            axios.post('/api/mg/content/course/courseNotesShareInfo',lay.strSign(obj))
                .then(function (respone) {

                    native.custom.share({
                        // 'shareTitle': respone.data.data.shareTitle,
                    //     "shareDesc": window.descContent,
                        "linkDesc": '分享笔记至',
                        "title": respone.data.data.shareTitle,
                        "desc": item.content,
                        "imgUrl": respone.data.data.imageUrl,
                        "link": window.location.host + respone.data.data.shareUrl +'&showFlag=1',
                        'log': {
                                'production':'20',
                                'action':'2',
                                'action_type':'0',
                                'production_data':{
                                    "courseId": window.courseId
                                }
                            }
                    })
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
            
        },
        showImg(i,imgList, img){
            console.log(this.isapp,i,imgList,native.Browser.showBigImage)
            if(this.isApp){
              native.Browser.showBigImage({bigImages:imgList,showIndex:i})
            } else {
                wx.previewImage({
                    current: img,
                    urls: imgList
                  });
            }
        },
        getAppVersion () {
          // 空格分所有
          var versionStr = navigator.userAgent.match(/(ios|android)\.davdian\.com\/([\d\.]+)/i) || navigator.userAgent.match(/(ios|android)\.bravetime\.net\/([\d\.]+)/i) || navigator.userAgent.match(/(ios|android)\.vyohui\.cn\/([\d\.]+)/i);
          if (versionStr == null) {
            return 0;
          } else {
            var v = versionStr[2].split(".").reduce(function (a, b) {
              return +a * 10 + +b
            });
          }
          return +v;
        },
        allNote: function () {
            // if (this.isApp){
                // native.VoiceLive.callAppEnterAllNote({courseId:window.courseId,webUrlAllNote:'/allDiscuss.html?courseId=' + window.courseId +'&flag=1&rp=course_detail&rl=notes',webUrlMyNote:'/allDiscuss.html?courseId=' + window.courseId + '&rp=course_detail&rl=notes'})
            // } else {
            //     window.location.href = '/allDiscuss.html?courseId=' + window.courseId + '&flag=1&rp=course_detail&rl=notes'
            // }
            if (this.isApp){
                if (this.getAppVersion()<410){
                    native.VoiceLive.callAppEnterAllNote({courseId:window.courseId})
                } else {
                    native.VoiceLive.callAppEnterAllNote({courseId:window.courseId,webUrlAllNote:'/allDiscuss.html?courseId=' + window.courseId +'&flag=1&rp=course_detail&rl=notes',webUrlMyNote:'/allDiscuss.html?courseId=' + window.courseId + '&rp=course_detail&rl=notes'})
                }
                
            } else {
                window.location.href = '/allDiscuss.html?courseId=' + window.courseId + '&flag=1&rp=course_detail&rl=notes'
            }
            
        },
        writeNote: function () {
            if (this.isApp){
                native.VoiceLive.callAppEnterWriteNote({courseId:window.courseId})
            } else {
                window.location.href = '/course-notes-create-' + window.courseId + '.html'
            }
        },
        imgObject:function (imgSrc) {
            return{
                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
            }
        },
        change(index){
            var that = this
            setTimeout(function(){
                $('.discuss_container .discuss_content').map(function(index){
                    if (this.offsetHeight < this.scrollHeight){
                        that.arr.push(1)
                    }else {
                        that.arr.push(0)
                    }
                })
            },100)
            console.log(that.arr)
            this.class_introduce_left = index;
        },
        showAll(index){
            $($('.discuss_container .discuss_content')[index]).css({'display':'block'})
            this.arr.splice(index, 1,2)
        },
        showAll1(index){
            $($('.discuss_container .discuss_content')[index]).css({'display':'-webkit-box'})
            this.arr.splice(index, 1,1)
        },
        goTeacher(href){
            window.location.href=  href
        },
        attention_yes(){
            var that = this
            var obj = {}
            obj.obj={
                teacherId:this.data.body.teacherDescInfo.teacherId
            }
            axios.post('/api/mg/content/course/follow',lay.strSign(obj))
                .then(function (respone) {
                    if (respone.data.code == 0){
                        that.data.body.teacherDescInfo.followStatus = 1
                        that.maskAttention = true
                        setTimeout(function () {
                            that.maskAttention = false
                        },2000)
                    }
                  console.log(respone)
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
        },
        attention_yes_guest(id){
            var that = this
            var obj = {}
            obj.obj={
                teacherId:id
            }
            console.log(that.data.body.teacherDescInfo.guestList[id])
            axios.post('/api/mg/content/course/follow',lay.strSign(obj))
                .then(function (respone) {
                    if (respone.data.code == 0){
                        that.data.body.teacherDescInfo.guestList[id].followStatus = 1
                        that.maskAttention = true
                        setTimeout(function () {
                            that.maskAttention = false
                        },2000)
                    }
                  console.log(respone)
                })
                .catch(function (error) {
                    console.log('error:',error)
                });
        },
        scroolFun () {
            var that = this
            $('#scroll_container').scroll(function (e) {
                if (that.isApp){
                    if ($('.class_intrduce_success').offset().top < 47){
                        that.fixFlag = true
                    } else {
                        that.fixFlag = false
                    }
                }else {
                    if ($('.class_intrduce_success').offset().top < 91){
                        that.fixFlag = true
                    } else {
                        that.fixFlag = false
                    }
                }
                
            })
        }
    }
}
