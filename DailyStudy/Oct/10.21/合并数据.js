// const a =[1,2,3]
// const b =[1,5,6]
// const c = a.concat(b)


// const obj1  ={
//     a:1
// }
// const obj2 = {
//     b:1
// }
// const obj = Object.assign({},obj1,obj2)
// console.log(obj)



const a = [1,2,3];
const b = [1,5,6];
const c = [...new Set([...a,...b])];//[1,2,3,5,6]

const obj1 = {
  a:1,
}
const obj2 = {
  b:1,
}
const obj = {...obj1,...obj2};//{a:1,b:1}

