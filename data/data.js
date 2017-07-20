var a = '[{"title":"段数","id":"cd","detail":[{"key":1,"value":"1段（0-6月）"},{"key":2,"value":"2段（6-12月）"},{"key":3,"value":"3段（12-24月）"},{"key":8,"value":"4段（24-36月）"}]},{"title":"尺寸","id":"cs","detail":[{"key":15,"value":"M"},{"key":4,"value":"X"},{"key":5,"value":"XL"},{"key":6,"value":"2XL"},{"key":7,"value":"3XL"},{"key":9,"value":"4XL"},{"key":10,"value":"5XL"}]},{"title":"颜色","id":"cc","detail":[{"key":11,"value":"whitewhitewhite"},{"key":12,"value":"blue"},{"key":13,"value":"black"},{"key":14,"value":"red"},{"key":16,"value":"yellow"}]}]';
var b = JSON.parse(a);
var c = {};
for(var i = 0; i< b[0]["detail"].length; i++){
    for(var j = 0; j< b[1]["detail"].length; j++){
        for(var k = 0; k< b[2]["detail"].length; k++) {
                var id = [b[0]["detail"][i]["key"], b[1]["detail"][j]["key"], b[2]["detail"][k]["key"]].sort(function (a, b) {
                    return a > b
                }).join(":");

                c[id] = [0,"【金盾婴宝】婴儿驱蚊手环（4条）*3",1024];
        }
    }
}
console.log(JSON.stringify(c));