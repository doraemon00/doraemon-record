// 1 原型链继承
// function Parent1(){
//     this.name = "parent1"
//     this.play=[1,2,3]
// }

// function Child1(){
//     this.type = 'child2'
// }

// Child1.prototype = new Parent1()
// console.log(new Child1())

// var s1 = new Child1()
// var s2 = new Child1()
// s1.play.push(4)
// console.log(s1.play,s2.play)

//2 构造函数继承（借助call）
// function Parent1() {
//   this.name = "parent1";
// }
// Parent1.prototype.getName = function () {
//   return this.name;
// };

// function Child1() {
//   Parent1.call(this);
//   this.type = "child1";
// }

// let child = new Child1();
// console.log(child);

// console.log(child.getName());

//3 组合继承
// function Parent3(){
//     this.name = 'parent3'
//     this.play = [1,2,3]
// }
// Parent3.prototype.getName = function(){
//     return this.name
// }

// function Child3(){
//     Parent3.call(this)
//     this.type = "child3"
// }
// Child3.prototype = new Parent3()
// //手动挂上构造器，指向自己的构造函数
// Child3.prototype.constructor = Child3

// var s3= new Child3()
// var s4= new Child3()

// s3.play.push(4)
// console.log(s3.play,s4.play)
// console.log(s3.getName())
// console.log(s4.getName())

// 4 原型式继承
// let parent4 = {
//     name:'parent4',
//     friends:["p1","p2","p3"],
//     getName(){
//         return this.name
//     }
// }

// let person4 = Object.create(parent4)
// person4.name = "tom"
// person4.friends.push("jerry")

// let person5 = Object.create(parent4)
// person5.friends.push("lucy")

// console.log(person4.name)
// console.log(person4.name === person4.getName())
// console.log(person5.name)
// console.log(person4.friends) //因为Object.create 是浅拷贝
// console.log(person5.friends)

//寄生式继承

// let parent5 = {
//   name: "parent5",
//   friends: ["p1", "p2", "p3"],
//   getName() {
//     return this.name;
//   },
// };

// function clone(original) {
//   let clone = Object.create(original);
//   clone.getFriends = function () {
//     return this.friends;
//   };
//   return clone;
// }

// let person5 = clone(parent5);
// console.log(person5.getName());
// console.log(person5.getFriends());

//寄生组合式
// function clone(parent,child){
//     child.prototype = Object.create(parent.prototype)
//     child.prototype.constructor = child
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
// console.log(person6.getFriends())

class Person {
  constructor(name) {
    this.name = name;
  }
  // 原型方法
  // Person.prototype.getName=function(){}
  getName() {
    console.log(this.name);
  }
}

class Gamer extends Person {
  constructor(name, age) {
      //子类中存在构造函数 则需要在使用this之前调用super()
    super(name);
    this.age = age;
  }
}

const asuna = new Gamer("Asuna", 20);
asuna.getName();
