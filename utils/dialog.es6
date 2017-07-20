
import  {AlertPlugin,ToastPlugin} from 'vux'
import Vue from 'vue';

Vue.use(AlertPlugin);
Vue.use(ToastPlugin);

/**
 * 弹出
 * @param msg
 * @param callback
 */
let alert = function (msg="", callback) {
    let _callback,_msg = msg;
    if(callback){
        _callback= callback
    }else if(typeof msg==="object"){
        _msg = msg.msg;
        _callback = msg.callback;
    }else{
        _callback = function () {};
    }
    Vue.$vux.alert.show({
        content: _msg,
        onHide:_callback
    })
};

/**
 * 提示
 * @param value
 */
let info = function (value) {
    Vue.$vux.toast.show({
        text:value,
        position:"middle",
        width:"200px",
        type:"text"
    });
};

export default{
    alert,
    info,
    toast:info,
}
