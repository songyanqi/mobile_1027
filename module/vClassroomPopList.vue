<template>
        <app></app>
</template>

<script>
    var vSchoolTitle = require("./vClassroomPopListTop.vue");
    var vSchoolList = require("./vSchoolList.vue");

    export default{
        data:function () {
            return{
                msg:"hello"
            }
        },
        components:{
            app:vSchoolTitle,
            vList:vSchoolList,
        }
    }
</script>