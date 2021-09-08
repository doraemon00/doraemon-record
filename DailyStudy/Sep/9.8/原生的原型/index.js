//Array Date Function 内建对象
// 内建原型顶端都是 Object.prototype 

// let obj = {}
// console.log(obj.__proto__ === Object.prototype)
// console.log(obj.toString === obj.__proto__.toString)

let arr = [1,2,3]
console.log(arr.__proto__ === Array.prototype)  //true


console.log(arr)