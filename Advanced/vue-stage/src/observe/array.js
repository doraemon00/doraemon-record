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
    arrayMethods[method] = function(){
        // console.log("数组方法进行重写操作")
    }
})













