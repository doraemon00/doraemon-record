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
// function Parent3(){
//     this.name = 'parent3'
//     this.play = [1,2,3]
// }

// Parent3.prototype.getName = function(){
//     return this.name
// }
// function Child3(){
//     Parent3.call(this)
//     this.type = 'child3'
// }
// Child3.prototype = new Parent3()

// // 手动挂上构造器，指向自己的构造函数
// Child3.prototype.constructor = Child3
// var s3 = new Child3()
// var s4 = new Child3()
// s3.play.push(4)
// console.log(s3.play,s4.play)


// 原型式继承
// 会共享引用数据类型
// let parent4 = {
//     name:'parent4',
//     friends:["p1","p2","p3"],
//     getName: function(){
//         return this.name
//     }
// }

// let person4 = Object.create(parent4)
// person4.name = 'tom'
// person4.friends.push('jerry')

// let person5 = Object.create(parent4)
// person5.friends.push('lucy')

// console.log(person4.name)
// console.log(person5.name)
// console.log(person4.friends)
// console.log(person5.friends)



// 5.寄生式继承 
// let parent5 = {
//     name:'parent5',
//     friends:["p1","p2","p3"],
//     getName: function(){
//         return this.name
//     }
// }

// function clone(original){
//     let clone = Object.create(original)
//     clone.getFriends = function(){
//         return this.friends
//     }
//     return clone
// }

// let person5 = clone(parent5)
// console.log(parent5.getName())



// 6.寄生组合式继承
// function clone(parent,child){
//     // 创建对象并指定对象（两步合并为一步）
//     child.prototype = Object.create(parent.prototype)
//     // 增强对象
//     child.prototype.constructor = child
//     // console.log(child.prototype)
// }

// function Parent6(){
//     this.name = 'parent6'
//     this.play = [1,2,3]
// }

// Parent6.prototype.getName = function(){
//     return this.name
// }

// function Child6(){
//     Parent6.call(this)
//     this.friends = 'child5'
// }

// clone(Parent6,Child6)

// Child6.prototype.getFriends = function(){
//     return this.friends
// }

// let person6 = new Child6()
// console.log(person6)
// console.log(person6.getName())



// ES6
class Person{
    constructor(name){
        this.name = name
    }
    getName(){
        console.log(this.name)
        // return this.name
    }
}

class Gamer extends Person{
    constructor(name,age){
        // 子类中存在构造函数，则需要在使用 this 之前首先调用 super()
        super(name)
        this.age = age
    }
}

const asuna = new Gamer('asuna',18)
asuna.getName()


























