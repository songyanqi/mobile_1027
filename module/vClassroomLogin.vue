<template>
    <div class="v_classroom_login">
        <base-title></base-title>
        <div class="classroom_form">
            <div class="input_container">
                <input placeholder="请输入您的手机号" v-model="phoneNumber">
                <div class="button_container">
                    <div class="confirm_btn countdowning" v-show="countdowning" v-text="time+'s后重发'"></div>
                    <div class="confirm_btn" @click="testPhoneNumber" v-show="!countdowning">验证手机号</div>
                </div>
            </div>
            <div class="input_container">
                <input placeholder="请输入验证码" v-model="code">
            </div>
            <div class="input_container">
                <input placeholder="设置密码，不少于6位" type="password" v-model="password">
            </div>
            <div class="complete_container" :class="[{ 'com': all }, 'complete_container']" @click="submit">
                完成
            </div>
        </div>
    </div>
</template>
<script>
    import "./vClassroomLogin.scss"
    import vClassroomLogin from "./vClassroomLogin.es6"
    export default vClassroomLogin
</script>
