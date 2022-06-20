
/* 
浅拷贝 
1. Object.assign
2. ...拓展运算符
3. 拷贝数组 concat 
4. 拷贝数组 slice 

*/

// Object.assign()
// let target = {}
// let source = {a:{b:1}}
// Object.assign(target,source)
// // source.a.b = 2
// console.log(target) //{a:{b:1}}


// 可以拷贝 Symbol 类型的对象；不会拷贝对象的不可枚举的属性
// let obj1 = {a:{b:1},sym:Symbol(1)};
// Object.defineProperty(obj1,'innumerable',{
//     value:1,
//     enumerable:false
// })
// // console.log(obj1)
// let obj2 = Object.assign({},obj1)
// console.log(obj1)  //需要在浏览器中查看
// console.log(obj2)


//无嵌套的对象 正常拷贝
// let a = {
//     age:1
// } 
// let b = Object.assign({},a)
// a.age = 2 
// console.log(b)  


/* 拓展运算符 */
// let obj = {a:1,b:{c:1}}
// let obj2 = {...obj}
// console.log(obj2)


/* 拷贝数组 concat */
// 下列没有影响是因为数组中存储的是 值类型
// let arr = [1,2,3]
// let newArr = arr.concat()
// newArr[1] = 100
// console.log(newArr) //[1,2,3] 
// console.log(arr)


/* 拷贝数组 slice */
// let arr = [1,2,{val:4}]
// let newArr = arr.slice()
// newArr[2].val = 1000
// console.log(arr)



/* 自己实现 */
const shallowClone = target => {
    if (typeof target === 'object' && target !== null) {
        // 克隆的是对象还是数组
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                // 赋值到对象中去
                cloneTarget[prop] = target[prop]
            }
        }
        return cloneTarget
    } else {
        return target
    }

}
// let arr = 1
// let newArr = shallowClone(arr)

let arr = [1, 2, { val: 4 }]
let newArr = shallowClone(arr)
newArr[2].val = 10

console.log(newArr)






