var module = window.module || {};
var slider = module.slider = {};
slider.init = function (id, scale, config) {
    $(function () {
        // 顶部轮播图滚动
        config = config || {};
        var w = Math.min(config.max || 9999, document.body.clientWidth);
        var indexAd = $("#" + id).css("height", w * scale + "px").removeClass("hide");
        var indicators = indexAd.find(".indicators");
        var solider = indexAd.find('.iosSlider');
        solider.height(w * scale).find(".item").removeClass('hide');
        solider.iosSlider({
            desktopClickDrag: true,
            snapToChildren: true,
            autoSlide: config["autoSlide"] || false,
            autoSlideTimer: config["autoSlide"] ? 2500 : null,
            infiniteSlider: config["infiniteSlider"] || false,
            onSlideChange: function (h) {
                if (indicators.length) {
                    $(indicators.find(".item").removeClass("selected").get(h.targetSlideNumber - 1)).addClass('selected');
                }
            }
        }).height(w * scale);
        // 点小触发滚动
        indicators.find(".item").each(function (index, el) {
            $(el).data("index", index).click(function () {
                solider.iosSlider('goToSlide', index + 1);
            });
        });

        // 点轮播图链接
        solider.find(".item").each(function (index, el) {
            $(el).click(function () {
                var me = this;
                var url = $(el).attr("data-url");
                url && window.bravetime.goto(url);
            });
        });
    });
};
