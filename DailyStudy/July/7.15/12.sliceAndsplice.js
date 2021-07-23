/**
 * frankenSplice([1,2,3],[4,5],1) should return [4,1,2,3,5]
 * 
 */

// slice() 浅拷贝 只可以使用在基本类型中

function frankenSplice(arr1,arr2,n){
    let copy = arr2.slice()
    copy.splice(n,0,...arr1)
    return copy
}

let res = frankenSplice([1,2,3],[4,5,6],1) 
console.log(res)









