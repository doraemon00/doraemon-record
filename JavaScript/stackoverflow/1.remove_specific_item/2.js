// Removing item (ECMA-262 Edition 5 code aka oldstyle JavaScript)
// var value = 3
// var arr = [1,2,3,4,5,3]
// arr = arr.filter(function(item){
//     return item !== value
// })
// console.log(arr)


// Removing item (ECMAScript 6 code)
// let value = 3
// let arr = [1,2,3,4,5,4]
// arr = arr.filter(item => item !== value)
// console.log(arr)



// Removing multiple items (ECMAScript 7 code)
let forDeletion = [2, 3, 5]   //forDeletion 删除 
let arr = [1,2,3,4,5,3]
arr = arr.filter(item => !forDeletion.includes(item))
console.log(arr)



