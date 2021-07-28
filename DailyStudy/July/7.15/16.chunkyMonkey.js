/**
 * 按照传递的参数进行 几维分组 
 * 最后剩的为一组
 */

function chunkArrayInGroups(arr,size){
    let result = []

    for(let i =0;i<arr.length;i+=size){
        let temp = []
        for(let j= i;j < Math.min(i+size,arr.length);j++){
            temp.push(arr[j])
        }
        result.push(temp)
    }
    return result
}

let res = chunkArrayInGroups(["a","b","c","d"],2)
console.log(res)


