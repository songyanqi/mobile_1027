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
  alert(okText, ok, title){
    new Vue({
      components: {
        'com-popup-alert': require('../../../component/com-popup-alert.vue')
      },
      el: getEl(),
      data: {okText, ok, title},
      template: '<com-popup-alert :okText="okText" :ok="ok" :title="title" />',
    });
  },
  /*confirm(html, ok, cancel){
    new Vue({
      components: {
        'com-popup-confirm': require('../../../component/com-popup-confirm.vue')
      },
      el: getEl(),
      data: {html, ok, cancel},
      template: '<com-popup-confirm :html="html" :ok="ok" :cancel="cancel" />',
    });
  },*/
  confirm(okContent, ok, cancel, title, okText, cancleText){
    new Vue({
      components: {
        'com-popup-confirm': require('../../../component/com-popup-confirm.vue')
      },
      el: getEl(),
      data: {title, okContent, okText, cancleText, ok, cancel},
      template: '<com-popup-confirm :okContent = "okContent" :ok="ok" :cancel="cancel" :title= "title" :okText="okText" :cancleText = "cancleText" />',
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
