/**
 * remove all falsy values form an array 
 * 
 * false null 0 "" undefined NaN
 * 
 * Hint: try converting each value to a Boolean
 * 
 * 
 * !! 其中就已经暗含 Boolean了
 * 
 * 
 */

// function bouncer(arr){
//     let res = []
//     arr.forEach(item=>{
//         if(Boolean(item)){
//             res.push(item)
//         }
//     })
//     return res
// }

function bouncer(arr){
    return arr.filter(item=>{
        return Boolean(item)
    })
}


let res = bouncer([7,"ate","",false,9])
console.log(res)

