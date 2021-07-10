var salesOffices = {}

salesOffices.clientList = []

// 增加订阅者
salesOffices.listen = function(fn){
    this.clientList.push(fn)
}

// 发布消息
salesOffices.trigger = function(){
    // for(var i=0,fn;fn=this.clientList[i++];){
    //     fn.apply(this,arguments) 
    // }

    for(var i=0;i<this.clientList.length;i++){
        this.clientList[i].apply(this,arguments) 
    }
}

salesOffices.listen(function(price,squareMeter){
    console.log("价格" + price)
    console.log("squareMeter" + squareMeter)
})



salesOffices.listen(function(price,squareMeter){
    console.log("价格" + price)
    console.log("squareMeter" + squareMeter)
})


salesOffices.trigger(2000,88)







