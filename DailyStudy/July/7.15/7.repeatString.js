/**
 * 重复一个字符串   repeat 方法  "abc".repeat(3)
 * "abc" 3  => abcabcabc
 *
 */


// 方法一：循环
// function repeatStringNumTimes(str, num) {
//   let res = "";
//   for (let i = 0; i < num; i++) {
//     res += str;
//   }
// }



// 方法二 
// Arrry(num+1).join(str)







let res = repeatStringNumTimes("abc", 3);
console.log(res);
