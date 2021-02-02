/**
 * 问题：继承
*/

//原型链 继承
// function Parent(){
//     this.name = "chu"
// }

// Parent.prototype.getName = function(){
//     console.log(this.name);
// }
// function Child(){}
// Child.prototype = new Parent()
// Child.prototype.constructor = Child

// const child = new Child()
// console.log(child.name)

//问题 引用类型 （对象） 会影响其他实例
 


//2 借用构造函数
// function Parent(){
//     this.names = ["chu","doraemon"]
// }
// function Child(){
//     Parent.call(this)
// }

// var child1 = new Child()
// child1.names.push("ben")
// console.log(child1.names)

// var child2 = new Child()
// console.log(child2.names)




//3组合继承
// function Parent(name){
//     this.name = name
//     this.colors = ["red","blue","green"]
// }

// Parent.prototype.getName = function(){
//     console.log(this.name)
// }

// function Child(name,age){
//     Parent.call(this,name)
//     this.age = age
// }

// Child.prototype = new Parent()
// Child.prototype.constructor = Child

// var child1 = new Child("chu",18)
// child1.colors.push("black")
// console.log(child1)

// var child2 = new Child("ben",20)
// console.log(child2)


//4原型式继承
// function createObj(o){
//     function F(){}
//     F.prototype = o
//     return new F()
// }

// var person = {
//     name:"chu",
//     friends:["ben","lisa"]
// }

// var p1 = createObj(person)
// var p2 = createObj(person)


// // console.log(p1)
// // p1.name = "p1"
// // console.log(p2.name)

// p1.friends.push("alias")
// console.log(p2.friends) //["ben", "lisa", "alias"]


//寄生式继承

// function createObj(o){
//     //使用了前面的 createObject 函数，生成了一个子类实例
//     var clone = Object.create(o)
//     //先在子类实例上添加一点属性或方法
//     clone.sayName = function(){
//         console.log("hi")
//     }
//     //再返回
//     return clone
// }


//寄生组合式继承
// function Parent(name){
//     this.name = name
//     this.age = 40
//     this.colors = ["red", "blue", "green"]
// }
// Parent.prototype.say = function(){
//     console.log(this.name)
// }

// function Child(name){
//     Parent.call(this,name)
// }

// var F = function(){}
// F.prototype = Parent.prototype
// Child.prototype = new F()


// var child1 = new Child("kevin", 18)
// console.log(child1)



//ES6

















