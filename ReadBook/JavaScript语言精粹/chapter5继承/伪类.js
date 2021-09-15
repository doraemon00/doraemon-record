// var Mammal = function (name){
//     this.name = name 
// }

// Mammal.prototype.get_name = function(){
//     return this.name
// }
// Mammal.prototype.says = function(){
//     return this.saying || ''
// }

// var muMammal = new Mammal('Herb the Mammal')
// var name = muMammal.get_name()
// console.log(name)

// // 构造另一个伪类来继承 Mammal 这是通过定义它的 constructor 函数并替换它的prototype为另一个Mammal 的实例来实现

// var Cat = function (name){
//     this.name = name 
//     this.saying = 'meow'
// }

// Cat.prototype = new Mammal()
// Cat.prototype.get_name = function(){
//     return  this.says() + ' '+ this.name + '' + this.says()
// }
// var myCat = new Cat('Henrietta')
// var says = myCat.says()
// console.log(says)


// Function.method('inherits',function(Parent){
//     this.prototype = new Parent()
//     return this
// })


