/**
 * find longest word in a string
 */

// function findLongestWordLength(str) {
//   let res = 0,
//     temp = 0; //res 最终的结果 temp 当前字符的长度

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === " ") {
//       // if(temp > res){
//       //     res = temp
//       // }
//       res = Math.max(res, temp);
//       temp = 0;
//     } else {
//       temp++;
//     }
//   }
//   return Math.max(res, temp);
// }

// 方法二 遍历
// function findLongestWordLength(str) {
//   let arr = str.split(" ");
//   let res = 0;

//   for (let i = 0; i < arr.length; i++) {
//     res = Math.max(res, arr[i].length);
//   }

//   return res;
// }

// 方法三 map
// function findLongestWordLength(str) {
//   let arr = str.split(" ").map((e) => e.length);
//   let res = 0;

//   for (let i = 0; i < arr.length; i++) {
//     res = Math.max(res, arr[i]);
//   }
//   return res;
// }

// 方法四
// map ...  slice
function findLongestWordLength(str) {
  //   let arr = str.split(" ").map((e) => e.length);
  //   return Math.max(...arr);

  return Math.max.apply(
    null,
    str.split(" ").map((e) => e.length)
  );
}

console.log(
  findLongestWordLength("The quick brown fox jumped over the lazy dog")
);
