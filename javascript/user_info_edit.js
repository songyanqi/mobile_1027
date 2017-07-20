$(function (){
    // 判断有几个baby名片,如果有两个则隐藏添加宝宝按钮
    var baby_card_size=$(".baby_card:visible").size();
    if(baby_card_size==2){
        $(".add_baby_card").addClass("hide")
    }

    //保存
    $(".text_btn").click(save);

    // 宝宝名片删除
    $(".user_info_delete").click(deleteCheck);

    // 添加宝宝点击
    $(".add_baby_card").click(addBaby);

    // 关注、爱好点击
    $(".attention_list_edit span").click(attentionCheck);

    // 关注、爱好选择
    function attentionCheck(el) {
        var attention_check = $(el.target).parents("li");
        var attention_checkbBtn = attention_check.find("span");
        var attention_check_size = attention_check.parents(".attention_list_edit").find('.checked').size();

        if (attention_check_size > 2) {

            //已经选中的去除选择状态
            if (attention_check.hasClass('checked')) {
                attention_check.removeClass("checked");
                attention_checkbBtn.removeClass("hover");
            }
            //已经选中三个,再点击其他未选择的无效
            else {
                bravetime.info("您已经选择三个了哦");
                return
            }
        }
        else {
            if (attention_check.hasClass('checked')) {
                attention_check.removeClass("checked");
                attention_checkbBtn.removeClass("hover")
            } else {
                attention_check.addClass("checked");
                attention_checkbBtn.addClass("hover")
            }
        }

    }

    //添加宝宝按钮
    function addBaby(){
        var big_baby_con=$('<div class="user_info_list clearfix baby_card big_baby">'+
            '<div class=" one_border hairlines">'+
            '<div class="info_title border_inner">大宝名片<span class="user_info_delete"></span></div>'+
            '</div>'+
            '<div class="info_list one_border hairlines ">'+
            '<ul>'+
            '<li class="border_inner"><span>宝宝名字</span><input type="text" class="baby_name"></li>'+
            '<li class="border_inner"><span>宝宝生日</span><input type="date" class="baby_date"></li>'+
            '<li class="border_inner"><span>宝宝性别</span><select name="sel" class="baby_sex">'+
            '<option value="1">王子</option>'+
            '<option value="2">公主</option>'+
            '</select>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '</div>');
        var little_baby_con=$('<div class="user_info_list clearfix baby_card little_baby">'+
            '<div class=" one_border hairlines">'+
            '<div class="info_title border_inner">小宝名片<span class="user_info_delete"></span></div>'+
            '</div>'+
            '<div class="info_list one_border hairlines ">'+
            '<ul>'+
            '<li class="border_inner"><span>宝宝名字</span><input type="text" class="baby_name"></li>'+
            '<li class="border_inner"><span>宝宝生日</span><input type="date" class="baby_date"></li>'+
            '<li class="border_inner"><span>宝宝性别</span><select name="sel" class="baby_sex">'+
            '<option value="1">王子</option>'+
            '<option value="2">公主</option>'+
            '</select>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '</div>');
        if($("body").find(".big_baby:visible").length==1){
            $(".add_baby_card").before(little_baby_con);
            $(".user_info_delete").click(deleteCheck);
        }
        else if($("body").find(".little_baby:visible").length==1){
            $(".add_baby_card").before(big_baby_con);
            $(".user_info_delete").click(deleteCheck);
        }
        else if(baby_card_size==0){
            $(".add_baby_card").before(big_baby_con);
            $(".user_info_delete").click(deleteCheck);
        }


        //宝宝名片数
        baby_card_size=$(".baby_card:visible").size();
        if(baby_card_size==1||baby_card_size==0){
            $(".add_baby_card").removeClass("hide")
        }
        else if(baby_card_size==2){
            $(".add_baby_card").addClass("hide")
        }
    }

    //删除宝宝名片
    function deleteCheck(){
        var deleteBtn=$(this);
        deleteBtn.parents(".user_info_list").remove(".user_info_list");

        baby_card_size=$(".baby_card:visible").size();
        if(baby_card_size==1||baby_card_size==0){
            $(".add_baby_card").removeClass("hide")
        }
    }

    function save() {
        var big_baby = $(".big_baby");
        var little_baby = $(".little_baby");
        //大宝的信息
        var big_baby_name = big_baby.find(".baby_name").val();
        var big_baby_date = big_baby.find(".baby_date").val();
        var big_baby_sex = big_baby.find('.baby_sex option:selected').val();
        console.log(big_baby_sex);
        //小宝的信息
        var little_baby_name = little_baby.find(".baby_name").val();
        var little_baby_date = little_baby.find(".baby_date").val();
        var little_baby_sex = little_baby.find('.baby_sex option:selected').val();

        //将选中的内容转换为真正的数组对象,并在每个内容中间加上",",然后把值传在需要提交的form表单对应的input里面
        var user_attention_size = $(".my_attention").find('.checked').size();
        var user_hobby_size = $(".my_hobby").find('.checked').size();
        var user_attention = $.makeArray($(".my_attention .checked span")).map(function (val) {
            return $(val).text()
        }).join(",");
        var user_hobby = $.makeArray($(".my_hobby .checked span")).map(function (val) {
            return $(val).text()
        }).join(",");

        var user_date = $(".my_date").val();
        var user_crowdk = $('.crowdk option:selected').val();

        //获取填写后的信息,再把值传在需要提交的form表单对应的input里面
        $("#user_attention").attr("value", user_attention);
        $("#user_hobby").attr("value", user_hobby);
        $("#big_baby_name").attr("value", big_baby_name);
        $("#big_baby_date").attr("value", big_baby_date);
        $("#big_baby_sex").attr("value", big_baby_sex);
        $("#little_baby_name").attr("value", little_baby_name);
        $("#little_baby_date").attr("value", little_baby_date);
        $("#little_baby_sex").attr("value", little_baby_sex);
        $("#my_date").attr("value", user_date);
        $("#crowdk").attr("value", user_crowdk);

        if(user_attention_size!=3){
            bravetime.info("您的关注还没完善哦！");
            return false;
        }

        if(user_hobby_size!=3){
            bravetime.info("您的爱好还没完善哦！");
            return false;
        }

        if(user_date=="" || user_crowdk==""){
            bravetime.info("您的资料还没完善哦！");
            return false;
        }

        // 如果有大宝的div
        if(big_baby.length){
            // 判断里面的值
            if(big_baby_name == "" || big_baby_date == "" || big_baby_sex == ""){
                bravetime.info("大宝资料还没完善哦！");
                return false;
            }
        }

        // 如果有小宝的div
        if(little_baby.length){
            // 判断里面的值
            if(little_baby_name == "" || little_baby_date == "" || little_baby_sex == ""){
                bravetime.info("小宝资料还没完善哦！");
                return false;
            }
        }

        // 提交表单
        $("#form").submit();

    }



});

