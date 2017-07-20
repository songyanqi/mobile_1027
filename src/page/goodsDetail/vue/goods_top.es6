/**
 * create by dony in 2017.03.12
 */

const GoodsTop = {
    components: {

    },
    props: ['isapp','goodsname'],
    created () {
        // 滚动到顶部
        if ($("body.scroll_flag").length) {
            $(window).on("scroll", function () {
                var scrollTop = $(document).scrollTop();

                if (scrollTop > 200) {
                    if ($(".to-top").length == 0) {
                        $("body").append('<div class="to-top"><a href="javascript:void(0);" id="to-top"><i class="icon dav_icon_up2top_80_80" style="width:44px;height:44px;"></i></a></div>');
                        $("#to-top")
                            .on("click", function () {
                                $('html,body').animate({scrollTop: 0}, 500);
                                if (window.up2topCallback && typeof window.up2topCallback == "function") {
                                    up2topCallback(scrollTop);
                                }
                            });
                    }
                } else {
                    $(".to-top").remove();
                }
            });
        }
    },
    data: ()=> {
        return {
        }
    },
    methods: {

    }
}
export default GoodsTop;