/**
 * 使用原型
 */
// let animal = {
//     jumps: null
// }
// let rabbit = {
//     __proto__:animal,
//     jumps:true
// }

// console.log(rabbit.jumps) //true
// delete rabbit.jumps
// console.log(rabbit.jumps)  //null
// delete animal.jumps
// console.log(rabbit.jumps) //undefined


/**
 * 搜索算法
 * 附加问题：通过 pockets.glasses 和 head.glasses 获取 glasses 哪个更快
 * 在现代引擎中，从性能的角度来看，我们是从对象还是从原型链获取属性都是没区别的。它们（引擎）会记住在哪里找到的该属性，并在下一次请求中重用它。
 */
// let head = {
//     glasses:1
// }
// let table = {
//     pen:3,
//     __proto__:head
// }
// let bed = {
//     sheet:1,
//     pillow:2,
//     __proto__:table
// }
// let pockets ={
//     money:2000,
//     __proto__:bed
// }


/**
 * 写在哪里
 * 我们有从 animal 中继承的 rabbit。
 * 如果我们调用 rabbit.eat()，哪一个对象会接收到 full 属性：animal 还是 rabbit？
 * 
 * rabbit 
 * 这是因为 this 是点符号前面的这个对象，因此 rabbit.eat() 修改了 rabbit 
 */

// let animal = {
//     eat(){
//         this.full = true
//     }
// }
// let rabbit = {
//     __proto__ :animal
// }
// rabbit.eat()
// console.log(rabbit.full)




/**
 * 我们有两只仓鼠：speedy 和 lazy 都继承自普通的 hamster 对象。
 * 当我们喂其中一只的时候，另一只也吃饱了。为什么？如何修复它？
 * 确保每只仓鼠都有自己的胃来完全回避这个问题
 */
let hamster = {
    stomach:[],
    eat(food){
        this.stomach.push(food)   //方案二
        // this.stomach = [food]   方案一
    }
}

let speedy = {
    __proto__:hamster,
    stomach:[]  //方案二
}

let lazy = {
    __proto__:hamster,
    stomach:[]   //方案二
}

speedy.eat("apple")
console.log(speedy.stomach)
console.log(lazy.stomach)







