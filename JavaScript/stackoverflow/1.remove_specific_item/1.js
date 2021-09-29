/**
 * How can I remove a specific item from an array?
 */


// const array = [2,5,9]
// const index = array.indexOf(5)
// if(index>-1){
//     array.splice(index,1)
// }
// console.log(array)



// 完整方式 函数形式
function removeItemOnce(arr,value){
    var index = arr.indexOf(value)
    if(index > -1){
        arr.splice(index,1)
    }
    return arr
}


function removeItemAll(arr,value){
    var i = 0
    while(i<arr.length){
        if(arr[i] === value){
            arr.splice(i,1)
        }else{
            ++i
        }
    }
    return arr
}















