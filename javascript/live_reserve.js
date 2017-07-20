
$(function(){
    var startTime = $(".time").attr("start-time");
    var nowTime =$(".time").attr("now-time");
    var Countdown = startTime - nowTime;
    function calculateTime(second) {
        var s = second % 60, m = Math.floor(second / 60) % 60,
            h = Math.floor(second / 60 / 60);
        var str = '';
        if (h) {
            str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        } else if (m) {
            str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        } else {
            str = (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        }
        return str;
    }
    $(".time").attr("data-remain-second",Countdown);
    var remainTimeContainer = $(".time");

        if(remainTimeContainer.length){
            remainTimeContainer.hide();
            var timer = setInterval(function () {
                remainTimeContainer.each(function () {
                    remainTimeContainer.show();
                    var $this = $(this);
                    var second = parseInt($this.attr("data-remain-second"));
                    if(second > 3600){
                        var zb_date = new Date(startTime*1000);
                        var current = new Date();
                        if((current.getFullYear()==zb_date.getFullYear())&&(current.getMonth()==zb_date.getMonth())&&(current.getDate()==zb_date.getDate())){
                            $(".time").html("今天 "+(zb_date).Format('hh:mm'));
                            $(".time").css("width","120px")
                        }
                        else if((current.getFullYear()==zb_date.getFullYear())&&(current.getMonth()==zb_date.getMonth())&&((current.getDate()+1)==zb_date.getDate())){
                            $(".time").html("明天 "+(zb_date).Format('hh:mm'));
                            $(".time").css("width","120px")
                        }
                        else if((current.getFullYear()==zb_date.getFullYear())&&(current.getMonth()==zb_date.getMonth())&&((current.getDate()-1)==zb_date.getDate())){
                            $(".time").html("昨天 "+(zb_date).Format('hh:mm'));
                            $(".time").css("width","120px")
                        }
                        else if((current.getFullYear()==zb_date.getFullYear())){
                             if((current.getMonth()!=zb_date.getMonth())||((current.getDate()-1)!=zb_date.getDate())){
                                 $(".time").html("直播开始时间 "+(zb_date).Format('MM-dd hh:mm'));
                                 $(".time").css("width","170px")
                             }
                        }
                        else{
                            $(".time").html((zb_date).Format('yyyy-MM-dd hh:mm'));
                            $(".time").css("width","120px")

                        }

                        $this.attr("data-remain-second",second-1 );
                    }
                    else if(second < 0){
                        $this.html("直播进行中 " +calculateTime(-second));
                        $this.attr("data-remain-second",second-1 );
                        $(".time").css("width","150px")
                    }
                    else if(second == 0){
                        location.assign(location.href)
                    }
                    else {
                        $this.html("直播倒计时 " +calculateTime(second));
                        $this.attr("data-remain-second", second - 1);
                        $(".time").css("width","150px")
                    }
                })

            }, 1000);
        }

});
Date.prototype.Format = function (fmt) { //author: yyyy/MM/dd
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
