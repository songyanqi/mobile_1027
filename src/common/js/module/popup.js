let getEl = function () {
  return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
};

let loading = null;

export default {
  /**
   * 功能: toast提示
   * @param html      toast内容，可传html
   * @param duration  toast存在时长，毫秒
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
  alert(html, ok){
    new Vue({
      components: {
        'com-popup-alert': require('../../../component/com-popup-alert.vue')
      },
      el: getEl(),
      data: {html, ok},
      template: '<com-popup-alert :html="html" :ok="ok" />',
    });
  },
  confirm(html, ok, cancel){
    new Vue({
      components: {
        'com-popup-confirm': require('../../../component/com-popup-confirm.vue')
      },
      el: getEl(),
      data: {html, ok, cancel},
      template: '<com-popup-confirm :html="html" :ok="ok" :cancel="cancel" />',
    });
  },
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
