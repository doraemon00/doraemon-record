/**
 * 数组扁平化
 */

// arr.flat(Infinity)
// let arr = [1, [2, [3, [4, 5]]], 6];
// let str = arr.flat(Infinity)
// console.log(str)

var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log(flatten(arr))


