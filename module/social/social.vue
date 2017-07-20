<template>
    <div id='socail_container'>
        <social-title :rightshow="true" :id='communityId' :data='title'></social-title>
        <speak v-on:send="sendMsg"></speak>
        <social-switch :data='userCommonRoomData'  :total='total' v-on:usercomment="openUserComment"></social-switch>
        <common v-if='commonRoomData[0]' :id='communityId' :flag='updataflagteacher' :data='commonRoomData' v-on:getupdatateacher="getupdatateacher"></common>
        <user-common v-if='userCommonFlag' :user-common-top="userCommonTop" :getupdataflag="getupdataflag" :flag="userCommonFlag" :data='userCommonRoomData' v-on:closeusercomment="closeUserComment" v-on:getupdata="getupdata"></user-common>
    </div>
</template>

<script>
    import speak from "./component/speak.vue";
    import socialTitle from "./component/social_title.vue";
    import socialSwitch from "./component/switch.vue";
    import common from "./component/common.vue";
    import userCommon from "./component/userCommon.vue";
    import layout from '../common/common.es6';
    import lay from '../index/layout.es6'
    import dialog from "../../utils/dialog.es6";
    let axios = require("axios");
    require('es6-promise').polyfill();
    import WebStorageCache from 'web-storage-cache';
    let socialCache =  new WebStorageCache({storage: 'sessionStorage'});
    export default {
        data(){
            return {
                dialog1:0,
                dialog2:0,
                communityId:'0',
                myName:'匿名',
                myAvatar:'',
                userid:'',
                title:'',
                //老师数据流
                teachertime:1,
                commonRoomData:[],
                commonRoomId:'',
                updataflagteacher: true,
                hashTeacher:{},
                //评论区
                userCommonRoomId: '',
                userCommonRoomData:[],
                userCommonFlag:false,
                getupdataflag:true,
                userCommonTop:-10,
                hash:{},
                time:1,
                //开关组件
                total:0,
                defaultAvatar:"http://pic.davdian.com/free/default_head_icon_0419.png"

            }
        },
        created(){
            this.init()
        },
        components: {
            speak,
            socialTitle,
            socialSwitch,
            common,
            userCommon
        },
        methods:{
            //控制开关点击发言评论弹屏打开
            init(){
                this.initbase()
                if (localStorage.getItem('social_reload')){
                    localStorage.removeItem('social_reload')
                    window.location.reload()
                }

                if (localStorage.getItem('equipment')){
                    localStorage.removeItem('equipment')
                    window.history.back()
                }
                console.log('bate1123123123')
                // this.initData()
            },
            closeUserComment(top){
                this.userCommonFlag = false
                this.userCommonTop = top
            },
            trim(s){  
                return this.trimRight(this.trimLeft(s));  
            },
            trimLeft(s){  
                if(s == null) {  
                    return "";  
                }  
                var whitespace = new String(" \t\n\r");  
                var str = new String(s);  
                if (whitespace.indexOf(str.charAt(0)) != -1) {  
                    var j=0, i = str.length;  
                    while (j < i && whitespace.indexOf(str.charAt(j)) != -1){  
                        j++;  
                    }  
                    str = str.substring(j, i);  
                }  
                return str;  
            },
            trimRight(s){  
                if(s == null) return "";  
                var whitespace = new String(" \t\n\r");  
                var str = new String(s);  
                if (whitespace.indexOf(str.charAt(str.length-1)) != -1){  
                    var i = str.length - 1;  
                    while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){  
                       i--;  
                    }  
                    str = str.substring(0, i+1);  
                }  
                return str;  
            },
            getupdatateacher(flag){
                var that = this
                that.updataflagteacher = false
                var obj = {communityId:this.communityId,roomType:1,time:that.teachertime,direction:0}
                axios.post('/api/mg/community/group/message_list',lay.strSign('socialCommon1', obj))
                    .then(function (respone) {
                        if (respone.data && respone.data.code==0){
                            if (respone.data.data){
                                that.teachertime = respone.data.data.maxTime
                                // that.commonRoomData = respone.data.data.dataList.concat(that.commonRoomData)
                                that.commonRoomData = that.sortTeacher(respone.data.data.dataList, that.commonRoomData)
                                if (respone.data.data.dataList.length==respone.data.data.pageSize){
                                    setTimeout(function () {
                                        that.updataflagteacher = true
                                    },1000)
                                }
                            }
                        } else {
                            if (respone.data){
                                dialog.alert('message_list code:'+ respone.data.code);
                            } else {
                                dialog.alert('message_list接口无data')
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            getupdata: function (flag) {
                var that = this
                that.getupdataflag = false
                var obj = {communityId:this.communityId,roomType:0,time:that.time,direction:0}
                axios.post('/api/mg/community/group/message_list',lay.strSign('socialCommon1', obj))
                    .then(function (respone) {
                        if (respone.data && respone.data.code==0){
                            if (respone.data.data){
                                that.time = respone.data.data.maxTime
                                // that.userCommonRoomData = respone.data.data.dataList.concat(that.userCommonRoomData)
                                that.userCommonRoomData = that.sort(respone.data.data.dataList, that.userCommonRoomData)
                                if (respone.data.data.dataList.length==respone.data.data.pageSize){
                                    setTimeout(function () {
                                        that.getupdataflag = true
                                    },1000)
                                }
                            }
                        } else {
                            if (respone.data){
                                dialog.alert('message_list code:'+ respone.data.code)
                            } else {
                                dialog.alert('message_list接口无data')
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            openUserComment(){
                this.userCommonFlag = true
            },
            //基础信息获取
            initbase(){
                var that = this
                // axios.post('/api/mg/community/group/enter',lay.strSign('socialUser', {userId:338819}))
                axios.post('/api/mg/community/group/enter',lay.strSign('socialUser'))
                    .then(function (respone) {
                        if (respone.data && respone.data.code==0){
                            if (respone.data.data){
                                //todo 判断role
                                if (respone.data.data.role==1){
                                    //群主进入app
                                    dialog.alert("发现您是群主，请在app端进入社群",function () {
                                        window.history.go(-1)
                                    })
                                } else if (respone.data.data.role==3){
                                    //群成员
                                    that.communityId = respone.data.data.communityId
                                    that.initData()
                                }else if (respone.data.data.role==4){
                                    //进入妈妈课堂
                                    window.location.replace(respone.data.data.location)

                                }
                                
                            }
                        } else {
                            if (respone.data){
                                dialog.alert('社群入口code:'+respone.data.code)
                            } else {
                                dialog.alert('社群入口无data')
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        dialog.alert('社群入口error:'+ error)
                    });
            },
            //老师页信息获取
            initChatTeacher(){
                var that = this
                var obj = {communityId:this.communityId,roomType:1,time:that.teachertime,direction:0}
                axios.post('/api/mg/community/group/message_list',lay.strSign('socialCommon1', obj))
                    .then(function (respone) {
                        if (respone.data && respone.data.code==0){
                            if (respone.data.data){
                                // that.commonRoomData = respone.data.data.dataList
                                that.commonRoomData = that.sortTeacher(respone.data.data.dataList)
                                that.teachertime = respone.data.data.maxTime
                            }
                        } else {
                            if(respone.data){
                                dialog.alert('message_list code:' + respone.data.code)
                            }else {
                                dialog.alert('message_list无data')
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            //初始化数据
            initData(){
                var that = this
                axios.post('/api/mg/community/group/info',lay.strSign('socialCommon1', {communityId:this.communityId}))
                    .then(function (respone) {
                        if (respone.data && respone.data.code == 0){
                            if (respone.data.data){
                                let key = 'social_manage_' +  respone.data.data.teacherRoomId.split('_')[respone.data.data.teacherRoomId.split('_').length-1]
                                socialCache.set(key,respone.data.data)
                                that.commonRoomId = respone.data.data.teacherRoomId
                                that.userCommonRoomId = respone.data.data.discussRoomId
                                that.title = respone.data.data.communityTitle || '还没设置群昵称呦'
                                that.initChatData()
                                that.initRongyun()
                                that.initChatTeacher()
                            }
                        } else{
                            if (respone.data){
                                dialog.alert('info code:'+ respone.data.code)
                            } else {
                                dialog.alert('info接口无data')
                            }
                        }
                    })
                    .catch(function (error) {
                        dialog.alert('baseDataError:', error)
                    });
            },
            //评论区数组去重
            sort(data, conData){
                let arr = []
                if (conData){
                    for (let p in data){
                        if (!this.hash[data[p].uuid]){
                            this.hash[data[p].uuid] = true
                            arr.push(data[p])
                        }
                    }
                    return arr.concat(conData)
                } else {
                    for (let p in data){
                        if (!this.hash[data[p].uuid]){
                            this.hash[data[p].uuid] = true
                            arr.push(data[p])
                        }
                    }
                    return arr
                }
            },
            //教师区数组去重
            sortTeacher(data, conData){
                let arr = []
                if (conData){
                    for (let p in data){
                        if (!this.hashTeacher[data[p].uuid]){
                            this.hashTeacher[data[p].uuid] = true
                            arr.push(data[p])
                        }
                    }
                    return arr.concat(conData)
                } else {
                    for (let p in data){
                        if (!this.hashTeacher[data[p].uuid]){
                            this.hashTeacher[data[p].uuid] = true
                            arr.push(data[p])
                        }
                    }
                    return arr
                }
            },
            initChatData(){
                var that = this
                var obj = {communityId:this.communityId,roomType:0,time:that.time,direction:0}
                axios.post('/api/mg/community/group/message_list',lay.strSign('socialCommon1', obj))
                    .then(function (respone) {
                        if (respone.data && respone.data.code==0){
                            if (respone.data.data){
                                // that.userCommonRoomData = respone.data.data.dataList
                                that.userCommonRoomData = that.sort(respone.data.data.dataList)
                                that.time = respone.data.data.maxTime
                                that.total = respone.data.data.total
                            }
                        } else {
                            if(respone.data){
                                dialog.alert('message_list code:'+respone.data.code)
                            }else {
                                dialog.alert('message_list无data')
                            }
                            
                        }
                    })
                    .catch(function (error) {
                        console.log(error,11111111)
                    });
            },
            //融云初始化
            initRongyun(){
                let that = this;
                var it = "n19jmcy59zr29";
                if (location.href.indexOf("davdian.com") > -1) {
                    it = "bmdehs6pd42ks";
                }
                var tokenurl = "/api/live/getToken?format=json";
                var status = 1;                                   //直播状态
                that.ryContent(it, tokenurl, status, that.commonRoomId, that.userCommonRoomId);
            },
            //容云加入房间方法
            joinRoom(roomId, messageCount) {
                let that = this;
                if (typeof roomId == 'number'){
                    roomId = roomId.toString()
                }
                RongIMClient.getInstance().joinChatRoom(roomId, messageCount, {
                    onSuccess: function () {
                    },
                    onError: function (error) {
                        dialog.alert('评论信息加载错误')
                    }
                });
            },
            //容云连接服务器方法
            ryContent(it, tokenurl, status, roomId1, roomId2) {
                var that = this;
                if (status == 1) {                                // 融云收取信息
                    try{
                        RongIMClient.init(it);
                        // RongIMLib.RongIMVoice.init();
                        RongIMLib.RongIMEmoji.init();
                    }catch (e){
                        // log(e)
                        console.log(e)
                        dialog.alert('实时接口异常，请重试', function(){
                            window.location.reload()
                        })
                    }

                    var sess_key = layout.getDvdsid();
                    // 调用
                    loadRongIMClient(false);
                    function loadRongIMClient(ref) {            //ref参数有为1即true 否则为false
                        var data = {refresh: ref ? 1 : 0};
                        if (sess_key != undefined) {
                            data.sess_key = sess_key;
                        }
                        $.ajax({
                            type: "post",
                            url: tokenurl,
                            data: data,
                            dataType: "json",
                            success: function (result) {
                                if (result.code == 0) {
                                    var token = result.data.token;
                                    that.myName = result.data.username;
                                    that.userid = result.data.userid;
                                    if (result.data && result.data.headImage){
                                        that.myAvatar = result.data.headImage
                                    }
                                    if (sess_key == undefined) {   //种cookie
                                        $.cookie("sess_key", result.sess_key);
                                    }
                                    RongIMClient.setConnectionStatusListener({
                                        onChanged: function (status) {
                                            switch (status) {
                                                //链接成功
                                                case RongIMLib.ConnectionStatus.CONNECTED:
                                                    console.log('连接成功')
                                                    break;
                                                //正在链接
                                                case RongIMLib.ConnectionStatus.CONNECTING:
                                                    console.log('正在连接')
                                                    break;
                                                //重新链接
                                                case RongIMLib.ConnectionStatus.DISCONNECTED:
                                                    dialog.alert('消息获取失败，请重试',function(){
                                                        window.location.reload()
                                                    })
                                                    break;
                                                //其他设备登陆
                                                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                                                    console.log('其他')
                                                    console.log(that.$router.history.current.fullPath)

                                                    dialog.alert('您的账号其他设备登陆了', function(){
                                                        if (that.$router.history.current.fullPath != '/social'){
                                                            localStorage.setItem('equipment', '1')
                                                        }
                                                        window.history.back()
                                                        // if (localStorage.getItem('social_reload')){
                                                        //     localStorage.removeItem('social_reload')
                                                        //     window.history.go(-2)
                                                        // } else {
                                                        //     window.history.back()
                                                        // }
                                                        
                                                    })
                                                    break;
                                                //网络不可用
                                                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                                                    console.log('网络不可用')
                                                    if (sessionStorage.getItem('socialManageFlag')){
                                                        sessionStorage.removeItem('socialManageFlag')
                                                    } else {
                                                        dialog.alert('网络不可用',function(){
                                                            if (localStorage.getItem('social_reload')){
                                                                localStorage.removeItem('social_reload')
                                                                window.history.go(-2)
                                                            } else {
                                                                window.history.back()
                                                            }
                                                        })
                                                    }
                                                    break;
                                            }
                                        }
                                    });
                                    // 消息监听器
                                    RongIMClient.setOnReceiveMessageListener({
                                        // 接收到的消息
                                        onReceived: function (message) {
                                            console.log('message->', message)

                                            if (message.messageType != 'CommandMessage'){
                                                if (JSON.stringify(JSON.parse(message.content.extra).info.uuid)){
                                                    let uuid = JSON.stringify(JSON.parse(message.content.extra).info.uuid)
                                                    if (that.hashTeacher[uuid] || that.hash[uuid]){
                                                        return
                                                    }
                                                }
                                            }
                                            if (message.messageType == "TextMessage") {
                                                var content2 = message.content.content;
                                                var content = message.content;
                                                var time = message.receivedTime;
                                                // var uuid = JSON.stringify(JSON.parse(message.content.extra).info.uuid);
                                                var uuid = JSON.parse(message.content.extra).info.uuid;
                                                if (message.content.user) {
                                                    var user = message.content.user;
                                                    var icon = user.portrait||user.icon;
                                                    var id = user.id;
                                                    var name = user.name;
                                                } else {
                                                    var name = "路人";
                                                    var icon = that.defaultAvatar;
                                                }
                                                var isTel = that.isPhoneNum(name);
                                                if (isTel) {
                                                    var myphone = name.substr(3, 4);
                                                    name = name.replace(myphone, "****");
                                                }
                                                var tempmsg = {
                                                    "isPlay": false,
                                                    "msg": {
                                                        "content": content2,
                                                        "time": time,
                                                        "type": 0
                                                    },
                                                    "speaker": {
                                                        "avatar": icon,
                                                        "id": message.senderUserId,
                                                        "name": name
                                                    },
                                                    "uuid": uuid,
                                                };
                                                if (JSON.parse(message.content.extra).info.isTips=='1'){
                                                    tempmsg.isTips = true
                                                }
                                                if (JSON.parse(message.content.extra).info.userAsk=="1") {
                                                    tempmsg.is_answer = true
                                                }
                                                if (message.targetId == that.commonRoomId) {
                                                    if (that.hashTeacher[uuid]){
                                                        return
                                                    }
                                                    that.commonRoomData.push(tempmsg)
                                                    that.hashTeacher[uuid] = true
                                                } else if (message.targetId == that.userCommonRoomId) {
                                                    if (that.hash[uuid]){
                                                        return
                                                    }
                                                    that.userCommonRoomData.push(tempmsg)
                                                    that.total = that.total + 1
                                                    that.hash[uuid] = true
                                                }
                                            }
                                            else if (message.messageType == "ImageMessage") {
                                                var base64Str = message.content.content;
                                                var content = "data:image/png;base64," + base64Str;
                                                var time = message.receivedTime;
                                                // var uuid = JSON.stringify(JSON.parse(message.content.extra).info.uuid);
                                                var uuid = JSON.parse(message.content.extra).info.uuid;
                                                if (message.content.user) {
                                                    var user = message.content.user;
                                                    var icon = user.portrait||user.icon;
                                                    var id = user.id;
                                                    var name = user.name;
                                                } else {
                                                    var name = "临时访客";
                                                    var icon = that.defaultAvatar;
                                                }
                                                var isTel = that.isPhoneNum(name);
                                                if (isTel) {
                                                    var myphone = name.substr(3, 4);
                                                    name = name.replace(myphone, "****");
                                                }
                                                var tempmsg = {
                                                    "isPlay": false,
                                                    "msg": {
                                                        // "url": content,
                                                        "url": message.content.imageUri,
                                                        "time": time,
                                                        "type": 1
                                                    },
                                                    "speaker": {
                                                        "avatar": icon,
                                                        "id": message.senderUserId,
                                                        "name": name
                                                    },
                                                    "uuid": uuid,
                                                    "imageInfo": JSON.parse(message.content.extra).info.imageInfo
                                                }
                                                if (that.hashTeacher[uuid]){
                                                    return
                                                }
                                                that.commonRoomData.push(tempmsg)
                                                that.hashTeacher[uuid] = true
                                            }else if (message.messageType == "VoiceMessage") {
                                                
                                            }else if (message.messageType == "CommandMessage") {
                                                if (message.content.name=='RC_DAV_COURSE_VOICE_TO_H5' && message.targetId == that.commonRoomId){
                                                    let COURSE_VOICE = JSON.parse(message.content.data.content)
                                                    let extra = JSON.parse(COURSE_VOICE.extra)
                                                    let name = COURSE_VOICE.user.name
                                                    var isTel = that.isPhoneNum(name)
                                                    if (isTel) {
                                                        var myphone = name.substr(3, 4)
                                                        name = name.replace(myphone, "****")
                                                    }
                                                    var tempmsg = {
                                                        "isPlay": false,
                                                        "msg": {
                                                            "url": COURSE_VOICE.content,
                                                            "time": message.receivedTime,
                                                            "type": 91,
                                                            "duration": COURSE_VOICE.duration,
                                                            "voicewidth": (COURSE_VOICE.duration  + 65)*2 > 200 ? 200 : (COURSE_VOICE.duration  + 65)*2
                                                        },
                                                        "speaker": {
                                                            "avatar": COURSE_VOICE.user.icon,
                                                            "id": COURSE_VOICE.user.senderUserId,
                                                            "name": name
                                                        },
                                                        "uuid": extra.info.uuid
                                                    };
                                                    if (that.hashTeacher[extra.info.uuid]){
                                                        return
                                                    }
                                                    that.commonRoomData.push(tempmsg)
                                                    that.hashTeacher[extra.info.uuid] = true
                                                }else if (message.content.name=='RC_DVK_DELETECLASS'){
                                                    dialog.alert('直播间已被删除',function(){
                                                        window.history.go(-1)
                                                    })
                                                }
                                            }
                                        },
                                        default: function () {
                                            dialog.alert('消息加载错误')
                                        }
                                    });
                                    RongIMClient.connect(token, {
                                        onSuccess: function (userId) {
                                            console.log(that.commonRoomId, 'hahahahhahahah1')
                                            that.joinRoom(that.commonRoomId, 10);
                                            console.log(that.userCommonRoomId, 'hahahhahah')
                                            that.joinRoom(that.userCommonRoomId, 10);
                                        },
                                        onTokenIncorrect: function () {
                                            if (!ref) {
                                                loadRongIMClient(true);
                                            }
                                        },
                                        onError: function (errorCode) {
                                            var info = '';
                                            switch (errorCode) {
                                                case RongIMLib.ErrorCode.TIMEOUT:
                                                    info = '超时';
                                                    break;
                                                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                                    info = '未知错误';
                                                    break;
                                                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                                                    info = '不可接受的协议版本';
                                                    break;
                                                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                                                    info = 'appkey不正确';
                                                    break;
                                                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                                                    info = '服务器不可用';
                                                    break;
                                            }
                                            // log(errorCode);
                                        }
                                    });
                                } else {
                                    // code 105
                                    dialog.alert('tokenCode='+result.code, function(){
                                        window.location.reload()
                                    })
                                }
                            },
                            error: function (e, msg, data) {
                            }
                        });
                    }
                }
            },
            isPhoneNum: function (s) {
                var patrn = /^((110)|(13[0-9])|(14[5-7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
                if (!patrn.exec(s)) return false;
                return true;
            },
            sendMsg(msg){
                this.sentMessage(this.trim(msg))
            },
            sentMessage(message) {
                if (!message){
                    dialog.alert('发送消息不能为空')
                    return;
                }
                let that = this;
                var isTel = that.isPhoneNum(that.myName);
                if (isTel) {
                    var myphone = that.myName.substr(3, 4);
                    that.myName = that.myName.replace(myphone, "****");
                }
                var msg = new RongIMLib.TextMessage({
                    content: encodeURIComponent(message),
                    extra: JSON.stringify({
                        info: {
                            uuid: layout.md5(Date.now() + "" + layout.getUid() + "" + Math.floor((Math.random() + 1) * 100000000)),
                            userAsk: 0,     //0：不是用户提问，1：是用户提问
                            messageType: 0,   //0：代表讨论消息，1：代表直播间消息
                            // courseId: that.courseId,
                            courseId: that.communityId,
                            time: new Date().getTime()
                        }
                    }),
                    user: {
                        icon: that.myAvatar,
                        id: that.userid,
                        name: encodeURIComponent(that.myName)
                    }
                });
                //评论聊天室
                var commonchatRoomId = that.userCommonRoomId; // 聊天室 Id。
                var conversationtype = RongIMLib.ConversationType.CHATROOM;
                var count = 10;                     // 拉取最近聊天最多 50 条。
                RongIMClient.getInstance().sendMessage(conversationtype, commonchatRoomId, msg, {
                    onSuccess: function (message) {
                        that.total = that.total+1
                       var content = message.content.content;
                            var time = message.sentTime
                            if (message.content.user) {
                                var user = message.content.user;
                                var icon = user.icon;
                                var id = user.id;
                                var name = user.name;
                            } else {
                                var name = that.myName;
                                var icon = that.myAvatar;
                            }
                            var isTel = that.isPhoneNum(name);
                            if (isTel) {
                                var myphone = name.substr(3, 4);
                                name = name.replace(myphone, "****");
                            }
                            var tempmsg = {
                                "msg": {
                                    "content": content,
                                    "time": time,
                                    "type": 0
                                },
                                "speaker": {
                                    "avatar": icon,
                                    "id": message.senderUserId,
                                    "name": name
                                },
                                "uuid": ""
                            };
                            that.userCommonRoomData.push(tempmsg);
                    },
                    onError: function (errorCode, message) {
                        var info = '';
                        switch (errorCode) {
                            case RongIMLib.ErrorCode.TIMEOUT:
                                info = '超时';
                                break;
                            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                info = '未知错误';
                                break;
                            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                info = '在黑名单中，无法向对方发送消息';
                                break;
                            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                info = '不在讨论组中';
                                break;
                            case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                info = '不在群组中';
                                break;
                            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                info = '不在聊天室中';
                                break;
                            default :
                                info = "error";
                                break;
                        }
                        dialog.alert(info)
                        console.log('发送错误:' + info);
                    }
                });
            }
        }
    }
</script>
<!-- 组建内改变全局css样式 -->
<style>
    .curcle-full{
        display: inline-block;
        width: 5px;
        height: 5px;
        background: #FF4A7D;
        border-radius: 50%;
        vertical-align: top;
        margin-top: 5px;
    }
    #ulList li .right{
        position: relative;
    }
    .ulList_recall{
        position: absolute;
        background: #000;
        width: 62px;
        height: 35px;
        top: -55px;
        left: 0;
        color: #fff;
        text-align: center;
        line-height: 35px;
        border-radius: 7px;
    }
    .ulList_recall_angle{
        position: absolute;
        top: -21px;
        left: 21px;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        border-top: 10px solid #000;
    }
    .ulList_recall_content{
        display: none;
    }
    .TextMessageSpan{
        -webkit-user-select: text;
        user-select: text;
    }
    .mask_con_mask{
        position: absolute;
        top: 0;
        width: 100%;
        height: 160px;
        z-index: 100;
    }
</style>
<!-- 组建内部css样式，不会改变全局样式 -->
<style lang='sass' scoped>
    #socail_container{
        width: 100%;
        height: 100%;
    }
</style>