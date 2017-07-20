import lay from "../../layout/api.es6"
let axios = require("axios");
require('babel-polyfill');
require('es6-promise').polyfill();
export default {
    data(){
        return {
            msg: 'hello vue',
            leftTitle:"",
            rightTitle:"",
            leftContent:{},
            rightContent:{},
            class_introduce_left:1,
            maskAttention:false,
            teacherList:[],
            userId:null
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
        let data = this.data.body;
        for(var i in data){
            this[i]=data[i]
        }
        this.userId = window.userId
        window.teacherId = this.data.body.rightContent.teacherId
    },
    computed: {
        styleObject: function () {
            let scope = this;
            return {
                marginTop: scope.data.marginTop + 'px'
            }
        },
        attention: function () {
            return this.data.body.rightContent.followStatus
        },
        guestList: function () {
            return this.data.body.rightContent.guestList
        }
    },
    methods:{
        imgObject:function (imgSrc) {
            return{
                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
            }
        },
        change(index){
            this.class_introduce_left = index;
        },
        goTeacher(href){
            window.location.href=  href
        },
        attention_yes(){
            var that = this
            var obj = {}
            obj.obj={
                teacherId:this.data.body.rightContent.teacherId
            }
            axios.post('/api/mg/content/course/follow',lay.strSign(obj))
                .then(function (respone) {
                    if (respone.data.code == 0){
                        that.data.body.rightContent.followStatus = 1
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
            console.log(that.data.body.rightContent.guestList[id])
            axios.post('/api/mg/content/course/follow',lay.strSign(obj))
                .then(function (respone) {
                    if (respone.data.code == 0){
                        that.data.body.rightContent.guestList[id].followStatus = 1
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
        // attention_no(){
        //     var that = this
        //     var obj = {}
        //     obj.obj={
        //         teacherId:this.data.body.rightContent.teacherId
        //     }
        //     axios.post('/api/mg/content/course/unfollow',lay.strSign(obj))
        //         .then(function (respone) {
        //             if (respone.data.code == 0){
        //                 that.data.body.rightContent.followStatus = 0
        //             }
        //           console.log(respone)
        //         })
        //         .catch(function (error) {
        //             console.log('error:',error)
        //         });
        // }
    }
}