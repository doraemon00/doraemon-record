// let target = {}
// let source = {a:{b:1}}
// Object.assign(target,source)
// console.log(target)


// let target = {}
// let source = {a:{b:2}}
// Object.assign(target,source)
// console.log(target)
// source.a.b = 10
// console.log(source)
// console.log(target)



// 拓展运算符
// let obj = {a:1,b:{c:1}}
// let obj2 = {...obj}
// obj.a = 2
// console.log(obj)
// obj.b.c = 2
// console.log(obj)

// let arr = [1,2,3]
// let newArr = [...arr]

// concat Array
// let arr = [1,2,3]
// let newArr = arr.concat()

// newArr[1] = 150
// console.log(newArr)
// console.log(arr)

//slice Array
// let arr = [1,2,{val:4}]
// let newArr = arr.slice()
// newArr[2].val = 1000
// console.log(arr)


//浅拷贝
// const shallowClone = (target)=>{
//     //引用类型
//     if(typeof target === 'object' && target !== null){
//         //开辟一个新的存储
//         const cloneTarget = Array.isArray(target) ? [] :{}
//         for(let prop in target){
//             //遍历自身属性并忽略继承属性
//             if(target.hasOwnProperty(prop)){
//                 cloneTarget[prop] = target[prop]
//             }
//         }
//         return cloneTarget
//     }else{
//         return target
//     }
// }

// let arr = [1,2,3,4]
// console.log(shallowClone(arr))


//深拷贝
// let obj1 = {
//     a:{
//         b:1
//     }
// }

// function deepClone(obj){
//     let cloneObj = {}
//     for(let key in obj){   //遍历
//         if(typeof obj[key] === 'object'){
//             cloneObj[key] = deepClone(obj[key]) //是对象就再次调用该函数递归
//         }else{
//             cloneObj[key] = obj[key] //基本类型直接复制值
//         }
//     }
//     return cloneObj
// }

// let obj2 = deepClone(obj1)
// obj1.a.b = 2  
// console.log(obj2)zz



//改进版 递归实现 
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function(obj,hash=new WeakMap()){
    if(obj.constructor === Date){
        return new Date(obj)
    }
    if(obj.constructor === RegExp){
        return new RegExp(obj)
    }
    //如果循环引用了就用 weakMap 来解决
    if(hash,has(obj)) return hash.get(obj)
    let allDesc = Object.getOwnPropertyDescriptors(obj)
}
















