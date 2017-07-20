/**
 * Created by nemolee on 15/5/27.
 */
$(function () {
    var loading = $(".next_level_container").find(".level_loading");
    if(loading.length){
        var pre = +loading.attr("data-for-percent");
        var w = pre/2+25;
        $(".level_loading_color").animate({width:w+"%"});
    }

    var form = $(".integral_exchange").find("form");
    if(form.length){
        form.find(".integral_button_container").find(".dav-btn").click(function () {
            if(form.find(".name_container").length&&!form.find(".name_container").find("input").val().length){
                window.bravetime.newAlert("请填写收货人信息");
                return false;
            }

            if(form.find(".tel_container").length&&!Units.isTel(form.find(".tel_container").find("input").val())){
                window.bravetime.newAlert("请填写正确的手机号码");
                return false;
            }

            if(form.find("#selProvinces").length){
                var selProvincesValue = $("#selProvinces").val();
                if(selProvincesValue == 0){
                    bravetime.newAlert("请选择省份");
                    return false;
                }

                var selCitiesValue = $("#selCities").val();
                if(selCitiesValue == 0){
                    bravetime.newAlert("请选择城市");
                    return false;
                }

                var selDistrictsValue = $("#selDistricts").val();
                if(selDistrictsValue == 0){
                    bravetime.newAlert("请选择地区");
                    return false;
                }
            }

            if(form.find(".detail_address_container").length&&!form.find(".detail_address_container").find("textarea").val().length){
                window.bravetime.newAlert("请填写详细地址");
                return false;
            }


            form.ajaxSubmit({
                success:function(result){
                    if(typeof result == "string"){
                        result = JSON.parse(result);
                    }
                    if(result["error"]==0){
                        bravetime.goto(window.integralUrl);
                    }else{
                        bravetime.newAlert(result["msg"]);
                    }
                },
                error:function(error){
                    bravetime.ajaxError(19);
                }
            });
        });
    }

});