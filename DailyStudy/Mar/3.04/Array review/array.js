let arr = [
  {
    name: "chu",
    age: 18,
  },
  {
    name: "ben",
    age: 19,
  },
];

/**
 * 对数组进行一个过滤再重新组合
 */
// let newArr = arr.map(item=>{
//     return {name:item.name }  //注意return返回的是一个数组
// })
// console.log(newArr)

/**
 * 往数组中添加属性
 */
// let newArr = arr.map((item,index)=>{
//     item.id = index
//     return item
// })
// console.log(newArr)


/**
 * 根据某一项值进行排序
 */

// function compare(p) {
//   return function (a, b) {
//     var value1 = a[p];
//     var value2 = b[p];
//     return value1 - value2;
//   };
// }
// let newArr = arr.sort(compare("age"));
// console.log(newArr);


//获取数组中的某几项
// let a = arr.splice(0,1)
// console.log(a)
// console.log(arr)   //改变原数组 
// console.log(arr.slice(0,1)) //不改变原数组 



/**
 * 数组去重的方法
 */
var arr1 = [1,2,3,4,1,2,{},{}]
var newArr = Array.from(new Set(arr1))
console.log(newArr)


















