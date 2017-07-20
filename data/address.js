var http = require('http');
var fs = require('fs');
var path = require('path');

var data = [];
var ccc = {province:[],city:[],country:[]};
function init() {
    // 获取一级地址
    http.get("//nemo.davdian.com/index.php?m=default&c=public&a=region&type=1&target=selDistricts&parent=1", function (res) {
        var str = "";
        res.on('data', function (re) {
            str += re;
        });
        res.on("end", function () {
            var result = JSON.parse(str);
            var regions = result["regions"];
            for (var i = 0, item; item = regions[i++];) {
                if (item["region_name"]) {
                    data.push([+item["region_id"], item["region_name"], []]);
                    ccc.province.push({id:+item["region_id"],name:item["region_name"]});
                }
            }
            get2(0, data.length, function () {
                fs.writeFile("./addressList.json", JSON.stringify(ccc), function () {
                    console.log("OK");
                });
                fs.writeFile("./addressList2.json", JSON.stringify(data), function () {
                    console.log("OK");
                });
            }, function () {

            });
        })
    }).on("error", function () {
        console.log("error 1");
    });
}

function get2(index, length, callback, error) {
    console.log("2级:" + index + "/" + length);
    // 获取二级地址
    if (index == length) {
        callback();
        return false;
    }


    // 真正获取
    http.get("//nemo.davdian.com/index.php?m=default&c=public&a=region&type=2&target=selDistricts&parent=" + data[index][0], function (res) {
        var str = "";
        res.on('data', function (re) {
            str += re;
        });
        res.on("end", function () {
            var result = JSON.parse(str);
            var regions = result["regions"];
            for (var i = 0, item; item = regions[i++];) {
                if (item["region_name"]) {
                    data[index][2].push([+item["region_id"], item["region_name"], []]);
                    ccc.city.push({cid:data[index][0],id:+item["region_id"],name:item["region_name"]});
                }
            }
            get3(index, 0, data[index][2].length, function () {
                get2(index + 1, length, callback, error);
            }, function () {
                error();
            }, length);
            //get2(index+1,length,callback,error);
        })
    }).on("error", function () {
        error();
    });
}


function get3(index1, index, length, callback, error) {
    console.log("3级:" + index + "/" + length);
    // 获取三级地址
    if (index == length) {
        callback();
        return false;
    }


    // 真正获取
    http.get("//nemo.davdian.com/index.php?m=default&c=public&a=region&type=3&target=selDistricts&parent=" + data[index1][2][index][0], function (res) {
        var str = "";
        res.on('data', function (re) {
            str += re;
        });
        res.on("end", function () {
            var result = JSON.parse(str);
            var regions = result["regions"];

            for (var i = 0, item; item = regions[i++];) {
                if (item["region_name"]) {
                    data[index1][2][index][2].push([+item["region_id"], item["region_name"]]);
                    ccc.country.push({cid:data[index1][2][index][0],id:+item["region_id"],name:item["region_name"]});
                }
            }
            get3(index1, index + 1, length, callback, error);
        })
    }).on("error", function () {
        error();
    });
}


init();
