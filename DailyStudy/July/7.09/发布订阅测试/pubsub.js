const eventProxy = {
    onList:{},

    // 订阅
    on:function(key,fn){
        if(!this.onList[key]){
            this.onList[key] =[]
        }
        this.onList[key].push(fn)
    },

    // 取消订阅
    off:function(key,fn){
        if(!this.onList[key]) return false
        let fnIndex = this.onList[key].indexOf(fn)
        if(fnIndex === -1) return false
        this.onList[key].splice(fnIndex,1)
        return true
    },

    //  发布
    emit:function(...args){
        if(!arguments.length) return

        // 如果没有任何订阅则返回
        const key = args[0]
        if(!this.onList[key] || this.onList[key].length) return

        // 发布对应的订阅事件
        const subscribe = this.onList[key]
        const newArgs = args.splice(1)
        subscribe.forEach(cb=>{
            cb.apply(null,newArgs)
        })



    } 




}