/**
 * Created by luming on 2016/12/19.
 */
var hotpeople = require("../module/vClassroomHotPeople.vue");

new Vue({
    el: "#vPopList",
    data:function(){
        return{
            msg:'hello vue'
        }
    },
    components:{
        hotpeople:hotpeople,
    }
});