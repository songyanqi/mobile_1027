<template>
    <div>
        <div class="add_address_container">
            <ul class="custom-info">
                <li class="list-group-item">
                    <label>主题:</label>

                    <div class="input_wrap">
                        <input type="text" placeholder="请输入您的活动主题" v-model="title">
                    </div>
                </li>
                <li class="list-group-item">
                    <label>活动时间:</label>

                    <div class="input_wrap">
                        <input type="datetime-local" placeholder="请输入您的活动时间" v-model="time">
                    </div>
                </li>
                <li class="list-group-item">
                    <label>活动人数:</label>

                    <div class="input_wrap">{{number}}人</div>
                </li>
                <li class="list-group-item">
                    <label>微信号:</label>

                    <div class="input_wrap">
                        <input type="text" placeholder="请输入您的微信号" v-model="Wechat_number">
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <label>活动地址:</label>

                        <choice-address v-on:change="allAddress"  :initprovince="province"
                                        :initcity="city"
                                        :initcounty="district" ></choice-address>
                    </div>
                    <div>
                        <textarea placeholder="请输入您的活动详细地址" v-model="address"></textarea>
                    </div>
                </li>
                <li class="list-group-item">
                    <table>
                        <tr>
                            <td>封面图</td>
                            <td align="right"><img :class="(activity_pic=='')?'':'activity_headPic'" :src="activity_pic+(uploadsuccess==1?'@54h_112w_1e_1c_2o':'')"></td>
                            <td class="upload_image_arrow"></td>
                            <td><input type="file" @change="onFileChange($event,'activity_pic')" class="upload_input" accept="image/*"></td>
                        </tr>
                    </table>
                </li>
                <li class="list-group-item">
                    <div>物料收货地址<span class="dav-color9 fz_12"> (发布或预览不在活动页面中显示)</span></div>
                    <div class="input_wrap">
                        <textarea placeholder="1、收货人姓名 2、手机号 3、物料收货详细地址" v-model="wl_address"></textarea>
                    </div>
                </li>
                <li class="list-group-item">
                    <div>活动描述</div>
                    <div class="input_wrap">
                        <textarea rows="5" placeholder="1、活动概述 2、活动流程 3、活动特色（信息完善有助邀请朋友及审核通过）" v-model="detail"></textarea>
                    </div>
                </li>
            </ul>
        </div>

        <div class="activity_bottom">
            <ul>
                <li class="preview" @click="preview">预览</li>
                <li class="activity_submit" @click="submit">发起活动</li>
            </ul>
        </div>
    </div>
</template>
<style>

</style>

<script>
    import address from './address.vue'
    export default{
        data(){
            return{
                title:"",
                time:"",
                Wechat_number:"",
                number:window.number,
                province:"",
                city:"",
                district:"",
                address:"",
                activity_pic:"",
                wl_address:"",
                detail:"",
                uploadsuccess:"",
                activityId:window.activityId,
            }
        },
        created(){
            this.getinitData()
        },
        components:{
            choiceAddress:address
        },
        computed:{
            "all":function () {
                return (this.title.length)&&(this.time.length)&&(this.Wechat_number.length)&&(this.province.length)&&(this.city.length)&&(this.district.length)
                        &&(this.address.length)&&(this.wl_address.length)&&(this.detail.length)
            }

        },
        methods:{
            /*获取省市区的id*/
            allAddress(){
                var that=this;
                if(arguments[0]=='province'){
                    that.province=arguments[1]
                }
                if(arguments[0]=='city'){
                    that.city=arguments[1]
                }
                if(arguments[0]=='county'){
                    that.district=arguments[1]
                }
            },
            getinitData(){
                var that=this;
                if(window.activityId){
                    var activitySuccess=sessionStorage.getItem("activitySuccess");
                    if (activitySuccess) {
                        sessionStorage.removeItem("activitySuccess");
                        setTimeout(function () {
                            location.reload();
                        }, 200);
                        return false
                    }
                    $.ajax({
                        type: "POST",
                        url: activityDataUrl,
                        dataType: "json",
                        success: function (result) {
                            if (result.code) {
                                bravetime.info(result.msg);
                            } else {
                                that.title = result.data.title;
                                that.time = result.data.time;
                                that.Wechat_number = result.data.wx_name;
                                that.province = result.data.province;
                                that.city = result.data.city;
                                that.district = result.data.district;
                                that.address = result.data.address;
                                that.activity_pic = result.data.img;
                                that.wl_address = result.data.wl_address;
                                that.detail = result.data.detail;
                            }
                        },
                        error: function () {
                            bravetime.info("网络异常,数据获取失败");
                        }
                    });
                }
            },
            onFileChange(e,name){
                var that=this;
                var files = e.target.files;
                if(files.length){
                    var picStr = 'shop_logo';
                    var file = files[0];
                    var data = new FormData();
                    data.append(picStr, file);
                    $.ajax({
                        type: "POST",
                        url: picUploadUrl,
                        data: data,
                        cache: false,
                        timeout:20000,
                        contentType: false,    //不可缺
                        processData: false,    //不可缺
                        dataType: "json",
                        success: function (data) {
                            if (data.errorCode) {
                                bravetime.info(data['errorMsg']);
                            } else {
                                that[name] = data.data[picStr].src;
                                that.uploadsuccess=1
                            }
                        },
                        error: function () {
                            bravetime.removeLoader();
                            bravetime.info("网络异常,数据获取失败");
                        }
                    });
                }
            },
            preview(){
                let that = this;
                if(!that.all){
                    bravetime.info("请完善您的信息");
                    return false;
                }
                bravetime.addLoader({little: true});
                $.ajax({
                    type: "POST",
                    url:window.activityPreviewUrl,
                    data:{
                        activityId:that.activityId,
                        title:that.title,
                        time:that.time,
                        wx_name:that.Wechat_number,
                        province:that.province,
                        city:that.city,
                        district:that.district,
                        address:that.address,
                        img:that.activity_pic,
                        wl_address:that.wl_address,
                        detail:that.detail,
                    },
                    dataType:"json",
                    success: function (result) {
                        bravetime.removeLoader();
                        if (result.code) {
                            bravetime.info(result.msg);
                        } else {
                            location.href=result.location;
                        }
                    }, error: function () {
                        bravetime.removeLoader();
                        bravetime.info("网络异常,数据获取失败");
                    }
                });
            },
            submit(){
                let that = this;
                if(!that.all){
                 bravetime.info("请完善您的信息");
                 return false;
                 }
                bravetime.addLoader({little: true});
                $.ajax({
                    type: "GET",
                    url:window.activitySumbitUrl,
                    data:{
                        activityId:that.activityId,
                        title:that.title,
                        time:that.time,
                        wx_name:that.Wechat_number,
                        province:that.province,
                        city:that.city,
                        district:that.district,
                        address:that.address,
                        img:that.activity_pic,
                        wl_address:that.wl_address,
                        detail:that.detail,
                    },
                    dataType:"json",
                    success: function (result) {
                        bravetime.removeLoader();
                        if (result.code) {
                            bravetime.info(result.msg);
                        } else {
                            bravetime.info("您的大V活动已经发起~</br>快去召集妈妈们一起活动吧～");
                            location.href=result.location;
                        }
                    }, error: function () {
                        bravetime.removeLoader();
                        bravetime.info("网络异常,数据获取失败");
                    }
                });
            },
        }
    }
</script>
