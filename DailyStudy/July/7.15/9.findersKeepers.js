/**
 * 返回第一个符合条件的值
 *
 */


// function findElement(arr, func) {
//   for (let i = 0; i < arr.length; i++) {
//     if (func(arr[i])) {
//       return arr[i];
//     }
//   }
//   return;
// }

// 方法二 filter
// function findElement(arr,func){
//     return arr.filter(func)[0]
// }


// 方法三 find
function findElement(arr,func){
    return arr.find(func)
}


let res = findElement([1, 2, 3, 4], (num) => num % 2 === 0);
console.log(res);
