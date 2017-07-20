var array = [1,3,4,5,7];

var r = [];
for(var j = 0;j<array.length;j++){
    var len = r.length;
    r.push(array[j].toString());
    for(var k =0;k<len;k++){
        r.push(r[k]+":"+array[j]);
    }
}
console.log(r);