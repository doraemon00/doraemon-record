//array.indexOf

// var arr = [1,2,3,4]
// var index = arr.indexOf(2)
// console.log(index)

//array.includes()
// var arr = [1, 2, 3, 4];
// if (arr.includes(3)) console.log("存在");
// else console.log("不存在");


//array.find()
// var arr=[1,2,3,4];
// var result = arr.find(item =>{
//     return item > 3
// });
// console.log(result);  //4 


//array.findIndex()
var arr = [1,2,3,4]
var result = arr.findIndex(item=>{
    return item > 3
})
console.log(result)  //3  返回满足元素的下标

