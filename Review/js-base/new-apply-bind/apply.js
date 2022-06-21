/* 
    三者区别 
    apply  参数为数组
    call   参数为字符串
    bind   需要调用执行

*/

// let a = {
//     name:'jack',
//     getName:function(msg){
//         return msg + this.name
//     }
// }

// let b = {
//     name:'lily'
// }

// console.log(a.getName('hello'))
// console.log(a.getName.call(b,'hello'))
// console.log(a.getName.apply(b,['hello']))
// console.log(a.getName.bind(b,'hello')())


// 判断数据类型
function getType(obj){
    return Object.prototype.toString.call(obj)
}
console.log(getType([])) //[object Array]
console.log(getType(1)) // [object Number]



// 类数组借用方法
var arrayLike = {
    0:'java',
    1:'c++',
    length:2
}
Array.prototype.push.call(arrayLike,'python')
console.log(arrayLike)


// 获取数组的最大值
let arr= [13, 6, 10, 11, 16];
const max = Math.max.apply(Math,arr)
console.log(max)
