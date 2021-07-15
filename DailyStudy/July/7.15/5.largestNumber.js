/**
 * 返回子数组中最大的一项值
 * return largest Numbers in Arrays
 */

// 方法一 ： map
// function largestOfFour(arr) {
//   return arr.map((sunArr) => Math.max(...sunArr));
// }

// 方法二 ： for 循环
function largestOfFour(arr) {
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    let max = -Infinity;

    for (let j = 0; j < arr[i].length; j++) {
      max = Math.max(max, arr[i][j]);
    }
    res.push(max);
  }
  return res;
}

let res = largestOfFour([
  [4, 5, 1, 3],
  [13, 27, 18, 26],
  [32, 25, 37, 39],
  [1000, 1001, 857, 1],
]);

console.log(res);
