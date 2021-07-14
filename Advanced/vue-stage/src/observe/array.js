let oldArrayPrototype = Array.prototype   //获取数组的老的原型方法

export let arrayMethods = Object.create(oldArrayPrototype)  //让arrayMethods通过__proto__ 能获取到数组的方法

// 只有这七个方法可以导致数组发生变化
let methods = [
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method =>{
    arrayMethods[method] = function(...args){
        // console.log("数组方法进行重写操作")
        // 数组新增的 要看一下是不是对象，如果是对象，继续进行劫持 

        // 需要调用数组原生逻辑
        oldArrayPrototype[method].call(this,...args)

        // todo 可以添加自己逻辑 函数劫持 切片

        let inserted = null
        let ob =  this.__ob__
        switch(method) {
            case 'splice':  //修改 删除 添加  arr.splice(1,0,24)
                inserted = args.slice(2) //splice方法从第三个参数起 是增添的新数据
                break;
            case 'push':    
            case 'unshift':
                inserted = args; //调用push和unshift传递的参数就是新增的逻辑
                break;
        }

        // inserted[] 遍历数组，看一下对它是否需要进行二次劫持
        if(inserted) ob.observeArray(inserted)


    }
})













