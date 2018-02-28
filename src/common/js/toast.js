function animate(obj, json, interval, sp, fn) {
    clearInterval(obj.timer);
    function getStyle(obj, arr) {
        if(obj.currentStyle){
            return obj.currentStyle[arr];    //针对ie
        } else {
            return document.defaultView.getComputedStyle(obj, null)[arr]; 
        }
    }
    obj.timer = setInterval(function(){
        var flag = true;
        for(var arr in json) {
            var icur = 0;
            //k++;
            if(arr == "opacity") {
                icur = Math.round(parseFloat(getStyle(obj, arr))*100);
            } else {
                icur = parseInt(getStyle(obj, arr));
            }
            var speed = (json[arr] - icur) * sp;
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            if(icur != json[arr]){
                flag = false;
            } 
            if(arr == "opacity"){
                obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                obj.style.opacity = (icur + speed)/100;
            }else {
                obj.style[arr] = icur + speed + "px";
            }
        }

        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },interval);
}

function toastFun(toastDiv, status, text) {
    document.getElementById(toastDiv).innerHTML = text;
    document.getElementById(toastDiv).classList.add(status + "_toast");

    var move = document.getElementById(toastDiv);
    animate(move, {top: 0 },10, 0.01,);
    setTimeout(function(){
        animate(move, {top: -50 },10, 0.01,);
    },3000)   
};

export{ // 导出模块，在vue文件里引用
    toastFun
}