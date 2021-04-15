// function Person(){
//     this.name = 'jack'
// }

// var p = new Person()
// console.log(p.name)


// var p = Person()
// console.log(p) //undefined

// function Person(){
//     this.name = 'jack'
//     return {age:18}
// }

// var p = new Person()
// console.log(p) // {age:18}


//对比 必须返回一个对象 
// function Person(){
//     this.name = 'jack'
//     return 'tom'
// }
// var p = new Person()
// console.log(p)  //{name:jack} 并不是返回tom


//apply  call bind
// let a = {
//     name:'jack',
//     getName:function(msg){
//         return msg + this.name 
//     }
// }

// let b = {
//     name:'lily'
// }

// console.log(a.getName("hello"))
// console.log(a.getName.call(b,'hi'))


//判断数据类型
// function getType(obj){
//     let type = typeof obj 
//     if(type !== 'object'){
//         return type
//     }
//     return Object.prototype.toString.call(obj).replace(/^$/, '$1')
// }

// let a = getType([])
// console.log(a)


//类数组方法
// var arrayLike = {
//     0:'java',
//     1:'script',
//     length:2
// }
// Array.prototype.push.call(arrayLike,"chu")
// console.log(arrayLike)


//获取数组的最大最小值
// let arr = [13,6,10,11,16]
// //第一个 参数可以是null
// //Math.max(...arr)
// const max = Math.max.apply(Math,arr)
// console.log(max)


// function Parent3(){
//     this.name = 'parent3'
//     this.play = [1,2,3]
// }
// Parent3.prototype.getName = function(){
//     return this.name
// }

// function Child3(){
//     Parent3.call(this)
//     this.type = 'child3'
// }

// Child3.prototype = new Parent3()
// Child3.prototype.constructor = Child3
// var s3 = new Child3()
// console.log(s3.getName())


//new 实现 

function _new(ctor,...args){
    if(typeof ctor !== 'function'){
        throw 'ctor must be a function'
    }
    let obj= new Object()
    obj.__proto__ = Object.create(ctor.prototype)
    let res = ctor.apply(obj,[...args])

    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    return isObject || isFunction ? res : obj;
}

function Person(){
    this.name = "chu"
}
var p = _new(Person)

console.log(p)


