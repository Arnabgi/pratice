promise = function(x,y) {
    console.log("x="+x,"y="+y);

    cal(x,y).then(result=>{
        console.log("Result"+result);
    }).catch(err=>{
        console.log(err);
    });
}
cal = function(x,y){
    return new Promise(function(reslove,reject){
        if(x+y>0){
            reslove(x+y);
        }
        else{
            reject("sum is less than zero");
        }
    });
   // return _promise;
}
promise(5,-9);
//cal(5,4);