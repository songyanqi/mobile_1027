import * as tt_com_0 from './tt_com_0.vue'
import layout from "../layout.es6"
import category from "../../../src/component/com-maybeyoulike.vue";

export default {
    data(){
        return{
            loading:false,
            no_more:false,
            ajaxing:true,
            errors:false,
            beforeFirstLoading:false,
            list:[],
        }
    },
    props:["force"],
    created:function(){
        this.scroll()
    },
    computed: {
        styleObject: function () {
            var scope = this;
            return layout.styleObject(scope.data);
        }
    },
    mounted: function () {
        var scope = this
        if (sessionStorage.getItem('likeList') && window.tj_path == 'index'){
            scope.list = JSON.parse(sessionStorage.getItem('likeList')).data.feedList[0].body.dataList
            scope.beforeFirstLoading = false
            scope.no_more = true
            scope.ajaxing = true
            scope.errors = false
        }
    },
    components:{
        tt_com_0:tt_com_0,
        category: category,
    },
    methods: {
        imgObject:function (imgSrc) {
            return{
                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
            }
        },
        clickAnalysis: function (item) {
            layout.clickAnalysis(item,this,'body');
        },
        scroll: function () {
            var scope = this;
            $(window).scroll(function () {//滚动条滚动事件
                if (window.disabledGoodsLoading) {
                    return false;
                }
                var offset = window.pageYOffset;
                var offsetTop = document.body.scrollHeight;
                if (offsetTop - offset - window.screen.availHeight < 100) {
                    scope.getData();
                }
            })
                console.log("scop",scope);
            if(scope.force){
                scope.getData();
            }
        },
        getData: function () {
            var scope = this;
            if (!scope.no_more) {
                if (scope.ajaxing) {
                    scope.beforeFirstLoading = true;
                    scope.ajaxing = false;
                    $.ajax({
                    type : "POST",
                    url : "/api/mg/sale/index/getPageSecond",
                    // url : '../data/index_data_pagesecond.json',
                    data : layout.strSign('like'),
                    dataType: 'json',
                    success : function(data) { 
                        if (data.data) {
                            localStorage.setItem('likeList', JSON.stringify(data))
                            sessionStorage.setItem('likeList', JSON.stringify(data))
                            scope.list = data.data.feedList[0].body.dataList,
                                scope.beforeFirstLoading = false,
                                scope.no_more = true
                        } else {
                            scope.list = JSON.parse(localStorage.getItem('likeList')).data.feedList[0].body.dataList,
                                scope.beforeFirstLoading = false,
                                scope.no_more = true
                        }
                        scope.ajaxing = true,
                        scope.errors = false
                    },
                    error: function (e) {
                        scope.errors = true
                        scope.ajaxing = false
                        scope.beforeFirstLoading = false
                        setTimeout(function () {
                            scope.ajaxing = true;
                        },1000)
                    }  
                })
                    // layout.api(layout.config.like, {
                    //     method: 'POST',
                    //     data: layout.strSign('like')
                    // }).then(data =>{
                    //     if (data.data) {
                    //         localStorage.setItem('likeList', JSON.stringify(data))
                    //         this.list = data.data.feedList[0].body.dataList,
                    //             scope.beforeFirstLoading = false,
                    //             scope.no_more = true
                    //     } else {
                    //         this.list = JSON.parse(localStorage.getItem('likeList')).data.feedList[0].body.dataList,
                    //             scope.beforeFirstLoading = false,
                    //             scope.no_more = true
                    //     }
                    // })
                        // .then(
                        //     scope.ajaxing = true,

                        //     scope.errors = false
                        // )
                        // .catch(e => console.log("Oops, error", e),
                        //     e => scope.errors = true,
                        //     e => scope.ajaxing = false,
                        //     e => scope.beforeFirstLoading = false,
                        //     e => setTimeout(function () {
                        //         scope.ajaxing = true;
                        //     },1000)
                        // )

                }
            }
        }
    }
}
