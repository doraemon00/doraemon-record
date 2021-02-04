/**
 * forEach 中 return 相关
 */

//return 并没有终止 forEach 循环
// let arr = [1,2,3]
// arr.forEach((item)=>{
//     if(item===2){
//         return
//     }
//     console.log(item)   //1 3
// })

// let arr = [1, 2, 3];
// try {
//   arr.forEach((item) => {
//     if (item === 2) {
//       throw "循环终止";
//     }
//     console.log(item);
//   });
// } catch (e) {
//   console.log("e", e);
// }

// var a = [1, 2, 3, 4, 5]
// a.every(item=>{
//     console.log(item); //输出：1,2
//     if (item === 2) {
//         return false
//     } else {
//         return true
//     }
// })




