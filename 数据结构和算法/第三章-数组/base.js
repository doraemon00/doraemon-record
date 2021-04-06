// let days = new Array()
// console.log(days)

// let days = ["a","b"]
// console.log(days.length)

// 斐波那契数列
// const fibonacci = []
// fibonacci[1] = 1
// fibonacci[2] = 1
// for(let i =3;i<20;i++){
//     fibonacci[i] = fibonacci[i-1] + fibonacci[i-2]
// }

// for(let i =1;i<fibonacci.length;i++){
//     console.log(fibonacci[i])
// }


// let numbers = [0,1,2,3,4,5]
// 在数组前面添加一位数的情况，所以取数组的长度，这样就会多出一位
// 总结：就是将整个数组往后移动一位
// Array.prototype.insertFirstPosition = function(value){
//     for(let i=this.length;i>=0;i--){
//         this[i] = this[i-1]
//     }
//     this[0] = value
// }

// numbers.insertFirstPosition(-1)
// console.log(numbers)



let numbers = [0,1,2,3,4,5]
numbers.splice(5,1) //删除
numbers.splice(5,0,11) //插入
console.log(numbers)











