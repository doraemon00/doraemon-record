// 第三版

var salesOffices = {}

salesOffices.clientList = {}

// 订阅消息
salesOffices.listen = function(key,fn){
    if(!this.clientList[key]){
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
}

// 发布消息
salesOffices.trigger = function(){
    var key = Array.prototype.shift.call(arguments) //取出消息类型
    fns = this.clientList[key]

    if(!fns || fns.length === 0){
        return false
    }

    for(var i = 0,fn;fn = fns[i++];){
        fn.apply(this,arguments)
    }

}

// 订阅
salesOffices.listen('squareMeter88',function(price){
    console.log('价格' + price)
})


// 发布 88 平米房子价格 
salesOffices.trigger('squareMeter88',200000)

