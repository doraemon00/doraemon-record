/* 一维转二维  */

// let baseArray = [1, 2, 3, 4, 5, 6, 7, 8]
// let n = 4
// let res = []

/**
   * @param data 一维数组
   * @param len 每个子数组长度
   * @param arr 保存的新数组
   */
// function change2Array(data,len,arr){
//     if(data.length <= len){
//         arr.push(data)
//         return arr
//     }else{
//         // 截取
//         arr.push(data.splice(0,len))
//         // 之后在进行该方法
//         return change2Array(data,len,arr)
//     }
// }
// change2Array(baseArray,n,res)
// console.log(res)




/* 
    二维转一维 
*/

const arr=[[1,2,3],[3,4],[5]];
let flattened = arr.reduce((acc,cur)=>{
    return acc.concat(cur)
})
console.log(flattened)







