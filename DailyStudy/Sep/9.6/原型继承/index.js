// let animal = {
//     eats :true, 
//     walk(){
//         console.log("Animal Walk")
//     }
// }

// let rabbit = {
//     jumps :true,
//     __proto__:animal
// }


// // rabbit.__proto__ = animal  //设置 rabbit.[[prototype]] = animal
// // console.log(rabbit.eats)  //true

// // walk 方法是从原型中获得的
// rabbit.walk()


/**
 * this 值
 */

// let animal = {
//     walk(){
//         if(!this.isSleeping){
//             console.log("i walk")
//         }
//     },
//     sleep(){
//         this.isSleeping = true
//     }
// }


// let rabbit = {
//     name:'chu',
//     __proto__:animal
// }

// // this 始终是点符号 . 前面的对象
// rabbit.sleep()

// console.log(rabbit.isSleeping) //true
// console.log(animal.isSleeping) //undefined


/**
 * for...in 循环
 */

// let animal = {
//     eats:true
// }
// let rabbit = {
//     jumps:true,
//     __proto__:animal

// }

// // Object.keys 只返回自己的key 
// console.log(Object.keys(rabbit))

// // for in 会遍历自己以及继承的键
// for(let prop in rabbit){
//     console.log(prop)
// }


// 如果这不是我们想要的，并且我们想排除继承的属性
// obj.hasOwnProperty(key)
// 如果obj具有自己的（非继承的）名为key的属性，则返回 true
/**
 * hasOwnProperty
 */

let animal = {
    eats:true
}
let rabbit = {
    jumps:true,
    __proto__:animal
}

for(let prop in rabbit){
    let isOwn = rabbit.hasOwnProperty(prop)

    if(isOwn){
        console.log(`Our: ${prop}`)
    }else{
        console.log(`Inherited: ${prop}`)
    }
}



