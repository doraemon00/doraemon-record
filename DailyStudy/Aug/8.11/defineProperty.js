// let car = {
//     'brand':'BMW',
//     'price':3000
// }

let car = {}
let val = 3000

Object.defineProperty(car,'price',{
    enumerable:true,
    configurable:true,
    get(){
        console.log('读取')
        return val
    },
    set(newVal){
        console.log('修改')
        val = newVal
    }
})




