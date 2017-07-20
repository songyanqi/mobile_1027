var num = 1, tmp, ttt = 0, lastttt = 0, lst;


var http = require('http');

var get = function () {
    ttt++;
    var d = Date.now();
    http.get({method: 'HEAD', host: 'chen.davdian.com', port: 80, path: '/'}, function (res) {
        var str = "";
        res.on('data', function (re) {
            str += re;
        });
        res.on("end", function () {
            var time = Date.now();
            var t = (time - d) / 1000;
            //console.log("num:" + num +"  time:"+t);
            lst = t;
            if (Math.random() > 0.95 && t < 3 && num < 10) {
                get();
                num++;
            }
            get();
        })
    }).on("error", function () {
        console.log("error 1");
    });
};

get();

setInterval(function () {
    console.log(lst + "-------- " + num + " ----------------------------->" + (ttt - lastttt));
    lastttt = ttt;
}, 1000);
