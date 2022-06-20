// 1. 原型链继承
// // 内存空间共享
// function Parent1(){
//     this.name = 'parent1'
//     this.play = [1,2,3]
// }

// function Child1(){
//     this.type = 'child2'
// }
// Child1.prototype = new Parent1()
// let s1 = new Child1()
// let s2 = new Child1()
// s1.play.push(4)
// console.log(s1.play,s2.play) //[1,2,3,4] [1,2,3,4]


// 2.构造函数继承
// 只能继承父类的实例属性和方法，不能继承原型属性或者方法
// function Parent1(){
//     this.name = 'parent1'
// }
// Parent1.prototype.getName = function(){
//     return this.name
// }
// function Child1(){
//     Parent1.call(this)  //核心
//     this.type = 'child1'
// }
// let child = new Child1()
// console.log(child)
// console.log(child.getName())


// 组合继承
function Parent3(){
    this.name = 'parent3'
    this.play = [1,2,3]
}

Parent3.prototype.getName = function(){
    return this.name
}
function Child3(){
    Parent3.call(this)
    this.type = 'child3'
}
Child3.prototype = new Parent3()

// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3
var s3 = new Child3()
var s4 = new Child3()
s3.play.push(4)
console.log(s3.play,s4.play)















