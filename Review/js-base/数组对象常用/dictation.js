// let baseArray = [1, 2, 3, 4, 5, 6, 7, 8]
// let n = 4
// let res = []

// function change2Array(data,len,arr){
//     // 长度过短
//     if(data.length <= len){
//         arr.push(data)
//         return arr
//     }else{
//         arr.push(data.splice(0,len))
//         change2Array(data,len,arr)
//     }
// }

let message = [
    {
        name:'1',
        age:15
    },
    {
        name:'2',
        age:15
    }
]
var newArr = message.map(item=>{
    return {name:item.name}
})

console.log(newArr)







