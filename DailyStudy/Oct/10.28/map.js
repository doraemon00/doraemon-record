let arr =  [
    {
        name:'chu',
        age:18
    },
    {
        name:'zhangsan',
        age:19
    }
]

let temp = arr.map(item=>{
    return item.name
})
console.log(temp);