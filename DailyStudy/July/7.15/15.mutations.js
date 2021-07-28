/**
 * 第二个元素里的所有字母需要在第一个元素中都可以找到
 */

// function mutation(arr){
//     let origin = arr[0].toLowerCase()
//     let target = arr[1].toLowerCase()

//     !origin.includes(target[i]) 
//     for(let i= 0;i<target.length;i++){
//         if(origin.indexOf(target[i]) === -1) {
//             return false
//         }
//     }
//     return true
// }


// 方法二 every
// function mutation(arr){
//     return arr[1].toLowerCase().split('').every(char=>
//         arr[0].toLowerCase().includes(char))
// }


// 方法三 set
function mutation(arr){
    let set = new Set(arr[0].toLowerCase())

    for(let char of arr[1].toLowerCase()){
        if(!set.has(char)){
            return false
        }
    }
    return true
}



let res = mutation(["hello","hey"])
console.log(res)

