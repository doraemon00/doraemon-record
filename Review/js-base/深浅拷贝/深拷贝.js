/* 深拷贝
    深拷贝会在堆内存中完全开辟一块内存地址·

*/

// JSON.stringify
// let obj1 = {a:1,b:[1,2,3]}
// let obj2 = JSON.parse(JSON.stringify(obj1))
// obj1.a = 2
// obj1.b.push(5)
// console.log(obj2)
// console.log(obj1)


// 如果遇到值为 undefined 那么会被忽略
// let obj1 = {a:undefined,b:[1,2,3]}
// let obj2 = JSON.parse(JSON.stringify(obj1))

// console.log(obj1)
// console.log(obj2)


/* 手写实现 基础版
    并不能复制不可枚举的属性以及Symbol类型的对象
*/

let obj1 = {
    a :{
        b:1
    }
} 
function deepClone(obj){
    let cloneObj = {}
    for(let key in obj){
        if(typeof obj[key] === 'object'){
            // 是对象就再次调用该函数递归
            cloneObj[key] = deepClone(obj[key]) 
        }else{
            //基本类型直接复制
            cloneObj[key] = obj[key]
        }
    }
    return cloneObj
}

let obj2 = deepClone(obj1)
obj1.b = 2
console.log(obj2)
