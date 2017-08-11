'use strict';

var right = $(".right");
var left = $(".left");

new Vue({
    el: "#category",
    data: {
        list: [], // 左侧列表
        index: 0, // 左侧选中
        category: {}, // 右侧数据
        pos: 0
    },
    ready: function ready() {

        initData(this);

        initBanner();
    },
    methods: {
        changeList: function changeList(i, item) {
            this.index = i;
            this.category = item.content;
            leftScroll();
        },
        click: function click(d) {
            var data = {
                list: this.list,
                index: this.index,
                category: this.category,
                pos: right.scrollTop()
            };
            setCacheData(data);
            bravetime.goto(d.link);
        }
    }
});

function initBanner() {
    window.sw = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        observer: true
    });
}

function initData(category) {
    var data = getCacheData();

    if (data) {
        // 有缓存数据就从缓存中取数据
        console.log(data);
        category.list = data.list;
        category.category = data.category;
        category.index = data.index;
        setTimeout(function () {
            return right.scrollTop(data.pos);
        }, 100);
        leftScroll(true);
    } else {
        // 否则从网络请求
        $.ajax({
            url: dataUrl,
            dataType: "json",
            success: function success(result) {
                var code = result.code;
                var data = result.data;
                var msg = result.msg;

                if (code) {
                    bravetime.info(msg);
                } else {
                    category.list = data;
                    category.category = category.list[category.index].content;
                }
            }, error: function error(_) {
                return bravetime.info('网络异常,请稍后重试');
            }
        });
    }
}

function getCacheData() {
    if (localStorage.category) {
        var c = localStorage.category;
        localStorage.removeItem("category");
        return JSON.parse(c);
    } else {
        return null;
    }
}

function setCacheData(data) {
    localStorage.category = JSON.stringify(data);
}

function leftScroll(imm) {
    setTimeout(function () {
        var top = $(".left .active").get(0).offsetTop;
        if (imm) {
            left.scrollTop(top);
        } else {
            left.animate({ scrollTop: top + 'px' }, 500);
        }
    }, 100);
}
//# sourceMappingURL=new_category.js.map
