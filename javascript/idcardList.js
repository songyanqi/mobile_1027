/**
 * Created by xuzelian on 17/2/22.
 */
// 添加身份证信息返回来刷新页面
//获取身份证添加页面的cookie
window.idcardreload = sessionStorage.getItem('user_cookie');
if (idcardreload == 'user_center_idcard') {
    sessionStorage.removeItem("user_cookie");
    location.reload();
};

var idcardList = require("../module/idcardList.vue");

new Vue({
    el: "#idcardList",
    components: {
        idcardList: idcardList
    }
});
