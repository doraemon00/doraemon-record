/* 
    数组的构造器 


*/

// var a  = Array(6)
// console.log(a)

// var b  =[]
// b.length = 6
// console.log(b)

// console.log(Array.of(8.0))

// console.log(Array.from(new Set(['abc','def'])))


// var obj = {0: 'a', 1: 'b', 2:'c', length: 3};
// var res = Array.from(obj,function(value,index){
//     // console.log(value,index,)
//     return value.repeat(3)
// },obj)

// console.log(res)


// Array.isArray
if(!Array.isArray){
    Array.isArray = function(arg){
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
}








