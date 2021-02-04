// let nums = [1,2,3]
// let obj = {val:5}
// let newNums = nums.map(function(item,index,array){
//     return item + index + array[index] + this.val
// },obj)
// console.log(newNums)

//类数组 转换

// 1.Array.prototype.slice.call()
// function sum(a, b) {
//   //可以将类数组转换成新数组
//   let args = Array.prototype.slice.call(arguments);
//   console.log(args.reduce((sum, cur) => sum + cur));
// }
// sum(1, 2);

//2.Array.from()
// function sum(a, b) {
//   let args = Array.from(arguments);
//   console.log(
//     args.reduce((sum, cur) => {
//       return sum + cur;
//     })
//   );
// }
// sum(1, 2);

//3.ES6 展开运算符
// function sum(a, b) {
//   let args = [...arguments];
//   console.log(
//     args.reduce((sum, cur) => {
//       return sum + cur;
//     })
//   );
// }
// sum(1,2)

//4.利用 concat + apply
// function sum(a, b) {
//   //apply 方法会把第二个参数展开
//   let args = Array.prototype.concat.apply([], arguments);
//   console.log(
//     args.reduce((sum, cur) => {
//       return sum + cur;
//     })
//   );
// }
// sum(1,2)














