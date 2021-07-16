/**
 * 把每个单词的第一个字符大写 且 其他都是小写
 */

// function titleCase(str){
//     let shouldCap = true
//     let res = ''

//     for(let i=0;i<str.length;i++){
//         if(str[i] === ' '){
//             shouldCap = true
//             res += str[i]
//         }else{
//             if(shouldCap){
//                 res += str[i].toUpperCase()
//                 shouldCap = false
//             }else{
//                 res += str[i].toLowerCase()
//             }
//         }
//     }
//     return res
// }

// 方法二 split
// function titleCase(str) {
//   let arr = str.split(" ");
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
//   }
//   return arr.join(' ')
// }

// 方法三 map
// function titleCase(str) {
//   let arr = str.split(" ");
//   return arr
//     .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");
// }

// 方法四 正则
function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/(^|\s)[a-z]/g, (match) => match.toUpperCase());
}

let res = titleCase("I'm a little tea pot");
console.log(res);
