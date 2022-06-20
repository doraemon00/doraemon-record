// 几种类型 7种   最新的话是8种 BigInt 
// Undefined Null Boolean Number String Symbol Object 
// 基本区别

// let a = {
//     name: '张三',
//     age : 18,
// }
// let b = a
// b.name = '李四'
// console.log(a)



/* 判断数据类型 */
// typeof

// console.log(typeof null)  // object 注意
// console.log(typeof 1) //number


// instanceof
// console.log([] instanceof Array) //true
// console.log('hello' instanceof String) //false



// Object.prototype.toString.call()
// console.log(Object.prototype.toString.call(1))  //"[object Number]"

// 实现全局通用的判断
function getType(obj){
    let type = typeof obj
    if(type !== 'object'){
        return type
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

// let res = getType([]) //Array
// let res = getType('123') //string 注意大小写
// console.log(res)






