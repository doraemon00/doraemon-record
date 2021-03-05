/**
 * 什么是提升？什么是暂时性死区？var、let 及 const 区别？
 *     虽然变量还没有被声明，但是却可以使用，这种就是提升
 *
 * 原型如何实现继承？Class 如何实现继承？Class 本质是什么？
 * 为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？
 * Proxy 可以实现什么功能？
 * map, filter, reduce 各自有什么作用？
 * 
 * 
 * 
 */

// function Parent(value) {
//   this.val = value;
// }
// Parent.prototype.getValue = function () {
//   console.log(this.val);
// };
// function Child(value) {
//   Parent.call(this, value);
// }

//组合继承
// Child.prototype = new Parent()
// const child = new Child(1)
// child.getValue() // 1
// child instanceof Parent // true

//寄生组合继承
// Child.prototype = Object.create(Parent.prototype, {
//   constructor: {
//     value: Child,
//     enumerable: false, 
//     writable: true,
//     configurable: true,
//   },
// });

// ES6 继承 
// class Parent{
//     constructor(value){
//         this.val = value
//     }
//     getValue(){
//         console.log(this.val)
//     }
// }

// class Child extends Parent{
//     constructor(value){
//         super(value)
//         this.val = value
//     }
// }



//模块化
// module.exports = {
//     a:1
// }


//map filter reduce
const arr =[1,3,4]
const sum = arr.reduce((acc,current)=>{
   return acc + current
},0)
console.log(sum)









