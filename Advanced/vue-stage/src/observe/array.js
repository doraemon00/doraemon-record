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
    }
})













