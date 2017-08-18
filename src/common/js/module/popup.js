let getEl = function () {
  return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
};

let loading = null;

export default {
  /**
   * 功能: toast提示
   * @param html      toast内容，可传html
   * @param duration  toast存在时长，毫秒
   * 示例：
   * popup.toast(html, duration);
   */
  toast(html, duration){
    new Vue({
      components: {
        'com-popup-toast': require('../../../component/com-popup-toast.vue')
      },
      el: getEl(),
      data: {html, duration},
      template: '<com-popup-toast :html="html" :duration="duration"/>',
    });
  },
  /**
   * 功能：提示框
   * 示例：
   * popup.alert({
        title: '',        // 标题（支持传入html。有则显示。）
        text: '',         // 文本（支持传入html。有则显示。）
        btnTitle: '',     // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
        btnCallback() {   // 按钮点击回调（有则执行该回调）

        }
      });
   */
  alert(param = {}){
    new Vue({
      components: {
        'com-popup-base': require('../../../component/com-popup-base.vue')
      },
      el: getEl(),
      data: {param},
      template: '<com-popup-base type="alert" :title="param.title" :text="param.text" :ok-btn-title="param.btnTitle" :ok-btn-callback="param.btnCallback"/>',
    });
  },
  /**
   * 功能：确认框
   * 示例：
   * popup.confirm({
        title: '',            // 标题（支持传入html。有则显示。）
        text: '',             // 文本（支持传入html。有则显示。）
        okBtnTitle: '',       // 确定按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
        cancelBtnTitle: '',   // 取消按钮标题（支持传入html。有则显示，无则显示默认'取消'。）
        okBtnCallback() {     // 确定按钮点击回调（有则执行该回调）

        },
        cancelBtnCallback() {    // 取消按钮点击回调（有则执行该回调）

        },
      });
   */
  confirm(param = {}){
    new Vue({
      components: {
        'com-popup-base': require('../../../component/com-popup-base.vue')
      },
      el: getEl(),
      data: {param},
      template: '<com-popup-base type="confirm" :title="param.title" :text="param.text" :ok-btn-title="param.okBtnTitle" :ok-btn-callback="param.okBtnCallback" :cancel-btn-title="param.cancelBtnTitle" :cancel-btn-callback="param.cancelBtnCallback"/>',
    });
  },
  /**
   * 功能：输入框
   * 示例：
   * popup.prompt({
        title: '',            // 标题（支持传入html。有则显示。）
        text: '',             // 文本（支持传入html。有则显示。）
        placeholder: '',      // 输入框占位符（有则显示。）
        btnTitle: '',         // 按钮标题（支持传入html。有则显示，无则显示默认'确定'。）
        btnCallback(result) { // 按钮点击回调（有则执行该回调）

        },
      });
   */
  prompt(param = {}){
    new Vue({
      components: {
        'com-popup-base': require('../../../component/com-popup-base.vue')
      },
      el: getEl(),
      data: {param},
      template: '<com-popup-base type="prompt" :title="param.title" :text="param.text" :placeholder="param.placeholder" :ok-btn-title="param.btnTitle" :ok-btn-callback="param.btnCallback"/>',
    });
  },
  /**
   * 功能：loading条
   * @param show    true显示 || false关闭
   * 示例：
   * popup.loading(show)
   */
  loading(show){
    if (!show && !loading) {
      loading = new Vue({
        components: {
          'com-popup-loading': require('../../../component/com-popup-loading.vue')
        },
        el: getEl(),
        data: {},
        template: '<com-popup-loading />',
      });
    } else if (loading) {
      // 销毁自身
      loading.$destroy();
      loading.$el.parentNode.removeChild(loading.$el);
      loading = null;
    }
  },
}
