var arr = [
    {
 good:1,
 children:[{
     id:1,tag:1
 }]
},{
    good:2,
    children:[
        {id:1,tag:null}
    ]
}]

let temp=arr.some(good=>{
    return good.children.some(item=>{
        return item.tag
    })
})



// arr.forEach(good => {
//     temp = good.children.forEach(item => {
//         if(item.tag && item.tag==1){
//             temp= true
//             break;
//         }
//     });
//     if(temp) break;
//   });

  console.log(temp)



// let res = arr.some(item=>{
//     return item == true
// })
// console.log(res)
