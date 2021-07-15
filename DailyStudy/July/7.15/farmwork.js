/**
 * reverse a String
 */

// 方法一 遍历
// function reverseString(str){
//     let res = ''
//     for(let i = str.length-1;i>=0;i--){
//         res += str[i]
//     }
//     return res
// }

// 方法二 中心对称
// function reverseString(str){
//     let arr = str.split('')
//     let i = 0, j = str.length -1
//     while(i<j){
//         // [arr[i],arr[j]] = [arr[j],arr[i]]
//         let temp = arr[i]
//         arr[i] = arr[j]
//         arr[j] = temp
//         i++
//         j--
//     }
//     return arr.join('')
// }

// 方法三 公式推导只使用一个变量
// function reverseString(str){
//     let arr = str.split('')
//     let i = 0;
//     while(i < Math.floor(arr.length / 2)){
//         let j = arr.length -i - 1;
//         [arr[i],arr[j]] = [arr[j],arr[i]]
//         i++
//     }
//     return arr.join('')
// }

// 方法四 reverse
// function reverseString(str){
//     return str.split('').reverse().join('')
// }

// 方法五 递归
// function reverseString(str){
//     if(!str) return ''
//     if(str.length === 1) return str

//     let end = str.length - 1
//     // slice(1,3) 只返回两项 不包含最后一项
//     return str[end] + reverseString(str.slice(1,end)) +str[0]

// }

// console.log(reverseString("hello"))

/**
 * factorialize a number 分解一个数/阶乘
 */

// 方法一
// function factorialize(num) {
//   let res = 1;
//   for (let i = 2; i <= num; i++) {
//     res *= i;
//   }
//   return res;
// }

// 方法二 递归
function factorialize(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorialize(num - 1);
}

console.log(factorialize(5));






