/* 
    forEach every some filter map reduce reduceRight
    entries find findIndex keys values
*/

// var array = [1, 3, 5];
// array.forEach(function(item,index){
//     console.log(item,index)
// })


//every 每个值
// var o = {0:10,1:8,2:25,length:3}
// var bool = Array.prototype.every.call(o,function(value,index){
//     return value >= 8
// },o)
// console.log(bool)  //true


// some
// var array = [18,9,10,35,80]
// console.log(array.some(item=>item > 10))



// map
// var array = [18,9,10,35,80]
// let res = array.map(item=>{
//     return item + 1
// })
// console.log(res)

// filter 
// var array = [18,9,10,35,80]
// var res = array.filter(item=>{
//     return item > 10
// })
// console.log(res)


//reduce  
// var array = [18,9,10,35,80]
// var res = array.reduce((pre,value)=>{
//     return pre * value   //累乘
// })

// console.log(res)



// find findIndex
// var array = [1, 3, 5, 7, 8, 9, 10];
// let res = array.find(item=>{
//     return item > 2
// })
// console.log(res)   //未找到返回 undefined  找到则返回符合的值

// var array = [1, 3, 5, 7, 8, 9, 10];
// let res = array.findIndex(item=>{
//     return item == 6
// })
// console.log(res)   // 找到则返回符合的值则返回index, 未找到返回 -1


// console.log([...Array(10).keys()])

console.log(Array(10))   //[empty × 10]


