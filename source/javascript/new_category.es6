'use strict';
var dvdBottom = require("../../module/bottom.vue");
var kindsearch = require("../../module/new_search.vue");
var cate = require("../../module/categorymain.vue")

var right = $(".right");
var left = $(".left");
var left_container = $(".left_container");

// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

new Vue({
    el: "#category",
    components:{
        dvdBottom:dvdBottom,
        kindsearch:kindsearch,
        cate:cate,
    },
    watch:{
        'category':function () {
            this.$nextTick(function () {
                refreshRight();
            });
        }
    }
});
