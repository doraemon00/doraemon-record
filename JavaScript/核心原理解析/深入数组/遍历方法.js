//forEach every some filter map reduce reduceRight
//entries find findIndex keys values

//forEach
// var array = [1,2,3]
// var obj = {name:'cc'}
// var sReturn = array.forEach(function(value,index,array){
//     array[index]=value
//     console.log(this.name)
// },obj)
// console.log(sReturn) //undefined


//every 所有元素
// var o = {0:10,1:8,2:15,length:3}
// var bool = Array.prototype.every.call(o,function(value,index,obj){
//     return value >= 8
// },0)
// console.log(bool)  


// //some 
// var array = [1,2,3]
// var res = array.some(value=>{
//     return value>2
// })
// console.log(res)  //true


//map 会改变原数组
// var array = [1,32,4,5,6,7]
// var res = array.map(item=>{
//     return item + 1
// })
// console.log(res)

//filter 
// var array = [1,3,4,5,6,7,54,3,5]
// var res = array.filter(item=>{
//     return item > 6
// })
// console.log(res) //7,54


//reduce
// var array = [1,2,3,4]
// var res = array.reduce(function(pre,value,index,array){
//     return pre * value
// },1)
// console.log(res)  //24


// var array = ['a','b','c']
// var iterator = array.entries()
// console.log(iterator.next().value)  //[0, "a"]


// var array = [1,3,4,56,6,7]
// var res = array.find(item=>{
//     return item > 5
// })
// console.log(res) //56


// keys 
// var res = [...Array(10).keys()]
// console.log(res) //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



//题目一 求和
// var arr = [1,2,3,4]
// // var sum = 0
// // arr.forEach(function(e){
// //     sum += e
// // })
// // console.log(sum) //10

// var sum = arr.reduce((pre,cur)=>{
//     return pre+cur
// })
// console.log(sum)


var arr = [{name:'one'},{name:'two'},{name:'three'}]
var res = arr.reduce(function(prev,current,index,array){
    if(index===0){
        return current.name
    }else if(index === array.length -1){
        return prev + '&' + current.name
    }else {
        return prev + ', ' + current.name;
      }
},'')
console.log(res)














