/**
 * confirm the ending
 * 确认是不是以该字符串结尾的
 */

// 方法一 循环
// function confirmEnding(str, target) {
//   if (str.length < target.length) {
//     return false;
//   }

//   let i = str.length - 1,
//     j = target.length - 1;
//   while (j >= 0) {
//     if (str[i] !== target[j]) {
//       return false;
//     }
//     i--;
//     j--;
//   }
//   return true
// }

// 方法二
// function confirmEnding(str, target) {
//   if (str.length < target.length) {
//     return false;
//   }

//   return str.slice(-target.length) === target;
// }

// 方法三 正则表达式

function confirmEnding(str, target) {
  if (str.length < target.length) {
    return false;
  }

  return RegExp(target + "$").test(str);
}

let res = confirmEnding("Bastian", "n");
console.log(res);
