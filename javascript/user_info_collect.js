$(function () {
    var page = 0;

    //点击规则说明
    var mask = $(".mask");
    mask.find(".close").click(function () {
        mask.addClass("hide");
    });
    $(".top").find(".icon").click(function () {
        mask.removeClass("hide");
    });

    //点击跳过
    $(".top").find(".btn").click(function () {
        window.bravetime.newConfirm("完善信息可获得额外积分哟</br>确定跳过吗？", {
            okText: "确定",
            okLink: skip_url, //点击确定跳转
            cancelText: "取消",
        });
    });

    //下一步
    $(".btn_right").click(nextBtn);
    //上一步
    $(".btn_left").click(upBtn);

    // 第一页
    $(".collect_con_01").find(".label_list span").click(page1Check);
    // 第二页
    $(".collect_con_02").find(".label_list span").click(page2Check);
    // 第三页 宝宝性别选择
    $(".collect_con_03").find(".category li").click(page3Check);
    // 第四页 用户职业选择
    $(".collect_con_04").find(".crowdk span").click(page4Check);
    // 完成按钮
    $(".complete").click(complete);

    // 第一页勾选
    function page1Check(el) {
        var page1_check = $(el.target).parents("li");
        var page1_checkbBtn = page1_check.find("span");
        var page1_check_size = page1_check.parents(".label_list").find('.checked').size();

        if (page1_check_size > 2) {

            //已经选中的去除选择状态
            if (page1_check.hasClass('checked')) {
                page1_check.removeClass("checked");
                page1_checkbBtn.removeClass("hover");
            }
            //已经选中三个,再点击其他未选择的无效
            else {
                bravetime.info("您已经选择三个了哦</br>可以点击下一步继续填写~~");
                return
            }
        }
        else {
            if (page1_check.hasClass('checked')) {
                page1_check.removeClass("checked");
                page1_checkbBtn.removeClass("hover")
            } else {
                page1_check.addClass("checked");
                page1_checkbBtn.addClass("hover")
            }
        }

    }

    // 第二页勾选
    function page2Check(el) {
        var page1_check = $(el.target).parents("li");
        var page1_checkbBtn = page1_check.find("span");
        var page1_check_size = page1_check.parents(".label_list").find('.checked').size();

        if (page1_check_size > 2) {

            //已经选中的去除选择状态
            if (page1_check.hasClass('checked')) {
                page1_check.removeClass("checked");
                page1_checkbBtn.removeClass("hover");
            }
            //已经选中三个,再点击其他未选择的无效
            else {
                bravetime.info("您已经选择三个了哦</br>可以点击下一步继续填写~~");
                return
            }
        }
        else {
            if (page1_check.hasClass('checked')) {
                page1_check.removeClass("checked");
                page1_checkbBtn.removeClass("hover")
            } else {
                page1_check.addClass("checked");
                page1_checkbBtn.addClass("hover")
            }
        }

    }

    // 第三页大宝小宝名片切换
    $("#big_baby_title").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#big_baby").removeClass("hide");
        $("#little_baby").addClass("hide");
    });
    $("#little_baby_title").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#little_baby").removeClass("hide");
        $("#big_baby").addClass("hide");
    });

    // 第三页宝宝性别选择
    function page3Check() {
        var page1_check = $(this);
        if (page1_check.hasClass('checked')) {
            page1_check.removeClass("checked");
        } else {
            page1_check.addClass("checked");
            page1_check.siblings().removeClass("checked");
        }
    };

    // 第四页用户职业选择
    function page4Check() {
        var page1_check = $(this).parents("li");

        if (page1_check.hasClass('checked')) {
            page1_check.removeClass("checked");
        } else {
            page1_check.addClass("checked");
            page1_check.siblings().removeClass("checked");
        }


    }

    //点击下一步
    function nextBtn() {
        page = page + 1;
        if (page == 1) {
            var page1_check_size = $(".collect_con_01").find('.checked').size();
            if (page1_check_size == 3) {
                $(".collect_con_02").removeClass("hide").siblings().addClass("hide");
                $(".dot_con").removeClass("hide");
                $(".dot_con").find("span:eq(1)").addClass("active").siblings().removeClass("active");
                $(".btn_left").removeClass("hide");
            }
            else {
                bravetime.info("您的关注还没完善</br>要选3个哟");
                page = page - 1;
            }
            //将选中的内容转换为真正的数组对象,并在每个内容中间加上",",然后把值传在需要提交的form表单对应的input里面
            var user_attention = $.makeArray($(".collect_con_01 .checked span")).map(function (val) {
                return $(val).text()
            }).join(",");
            $("#user_attention").attr("value", user_attention);

        }

        else if (page == 2) {
            var page1_check_size = $(".collect_con_02").find('.checked').size();
            if (page1_check_size == 3) {
                $(".collect_con_03").removeClass("hide").siblings().addClass("hide");
                $(".dot_con").removeClass("hide");
                $(".dot_con").find("span:eq(2)").addClass("active").siblings().removeClass("active");
                $(".btn_left").removeClass("hide");

            }
            else {
                bravetime.info("您的爱好还没完善</br>要选3个哟");
                page = page - 1;
            }
            //将选中的内容转换为真正的数组对象,并在每个内容中间加上","
            var user_hobby = $.makeArray($(".collect_con_02 .checked span")).map(function (val) {
                return $(val).text()
            }).join(",");
            $("#user_hobby").attr("value", user_hobby);
        }

        else if (page == 3) {
            var big_baby = $("#big_baby");
            var little_baby = $("#little_baby");
            //大宝的信息
            var big_baby_name = big_baby.find(".baby_name").val();
            var big_baby_date = big_baby.find(".baby_date").val();
            var big_baby_sex = big_baby.find(".category").find('.checked p').text();
            var big_baby_sex_size = big_baby.find(".category").find('.checked').size();
            var big_baby_sex_class = big_baby.find(".category").find('.checked p').attr("name");
            //小宝的信息
            var little_baby_name = little_baby.find(".baby_name").val();
            var little_baby_date = little_baby.find(".baby_date").val();
            var little_baby_sex = little_baby.find(".category").find('.checked p').text();
            var little_baby_sex_size = little_baby.find(".category").find('.checked').size();
            var little_baby_sex_class = little_baby.find(".category").find('.checked p').attr("name");

            console.log(little_baby_sex_class);

            var big_baby_info;
            if (big_baby_name !== "" && big_baby_date !== "" && big_baby_sex_size == 1) {
                big_baby_info = 1
            } else if (big_baby_name == "" && big_baby_date == "" && big_baby_sex_size == 0) {
                big_baby_info = 2
            }

            var little_baby_info;
            if (little_baby_name !== "" && little_baby_date !== "" && little_baby_sex_size == 1) {
                little_baby_info = 1
            } else if (little_baby_name == "" && little_baby_date == "" && little_baby_sex_size == 0) {
                little_baby_info = 2
            }

            if (big_baby_info == 1 || little_baby_info == 1) {
                if ((big_baby_info == 1 && little_baby_info == 2) || (big_baby_info == 2 && little_baby_info == 1)) {
                    $(".collect_con_04").removeClass("hide").siblings().addClass("hide");
                    $(".btn_right").addClass("hide");
                    $(".btn_left").removeClass("hide");
                }
                else if (big_baby_info == 1 && little_baby_info == 1) {
                    $(".collect_con_04").removeClass("hide").siblings().addClass("hide");
                    $(".btn_right").addClass("hide");
                    $(".btn_left").removeClass("hide");
                }
                else {
                    bravetime.info("宝宝资料还没完善哦！");
                    page = page - 1;
                }
            }
            else if (big_baby_sex == "备孕中" || little_baby_sex == "备孕中") {
                $(".collect_con_04").removeClass("hide").siblings().addClass("hide");
                $(".btn_right").addClass("hide");
                $(".btn_left").removeClass("hide");
            }

            else {
                bravetime.info("宝宝资料还没完善哦！");
                page = page - 1;
            }

            //获取填写后的信息,再把值传在需要提交的form表单对应的input里面
            $("#big_baby_name").attr("value", big_baby_name);
            $("#big_baby_date").attr("value", big_baby_date);
            $("#big_baby_sex").attr("value", big_baby_sex_class);
            $("#little_baby_name").attr("value", little_baby_name);
            $("#little_baby_date").attr("value", little_baby_date);
            $("#little_baby_sex").attr("value", little_baby_sex_class);

        }

    }

    //点击上一步
    function upBtn() {
        $(".btn_right").removeClass("hide");
        if (page == 1) {
            $(".collect_con_01").removeClass("hide").siblings().addClass("hide");
            $(".dot_con").removeClass("hide");
            $(".dot_con").find("span:eq(0)").addClass("active").siblings().removeClass("active");
            page = page - 1;
            $(".btn_left").addClass("hide");
        }

        else if (page == 2) {
            $(".collect_con_02").removeClass("hide").siblings().addClass("hide");
            $(".dot_con").removeClass("hide");
            $(".dot_con").find("span:eq(1)").addClass("active").siblings().removeClass("active");
            page = page - 1;

        }

        else if (page == 3) {
            $(".collect_con_03").removeClass("hide").siblings().addClass("hide");
            $(".dot_con").removeClass("hide");
            $(".dot_con").find("span:eq(2)").addClass("active").siblings().removeClass("active");
            page = page - 1;
        }

    }

    //点击完成
    function complete() {
        var user_date = $(".my_date").val();
        var user_crowdk = $(".crowdk").find('.checked span').attr("name");
        var user_crowdk_size = $(".crowdk").find('.checked').size();
        $("#my_date").attr("value", user_date);
        $("#crowdk").attr("value", user_crowdk);
        if (user_date !== "" && user_crowdk_size == 1) {
            //提交表单
            $("#form").submit();
        }
        else {
            bravetime.info("您的资料还没完善哦！");
        }
    }

});

