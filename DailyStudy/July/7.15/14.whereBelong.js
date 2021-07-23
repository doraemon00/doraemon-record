/**
 * 插入元素后，按照顺序排列，然后返回插入元素的位置
 * getIndexToIns([1,2,3],1.5) should return 1 
 */

function getIndexTpIns(arr,num){
    return arr.concat(num).sort((a,b)=>a-b).indexOf(num)
}

let res = getIndexTpIns([40,60],50)
console.log(res)