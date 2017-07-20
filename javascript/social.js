/**
 * Created by jianchep on 17/03/29.
 */

var social = require("../module/social/social.vue");
var manage = require("../module/social/social_manage.vue");
var member = require("../module/social/social_member.vue");

const routes = [
    {path: '/', redirect: '/social'},
    {path: '/social', component: social},
    {path: '/manage/:id', component: manage},
    {path: "/member/:id", component: member},
    {path: "/:default", redirect: "/social"}

]

const router = new VueRouter({
    routes:routes
})

const app = new Vue({
    router:router
}).$mount('#social')

