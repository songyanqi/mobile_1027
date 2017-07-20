function getElement(x,y){
    var el = document.elementFromPoint(x,y);
    if(el && el["nodeName"]=="IMG"){
        return el["src"];
    }else{
        return "";
    }
}