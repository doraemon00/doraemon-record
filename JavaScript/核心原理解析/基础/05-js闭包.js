// 全局作用域
// var globalName = 'global'
// function getName(){
//     console.log(globalName)
//     var name = 'inner'
//     console.log(name)

// }
// getName()
// console.log(name)
// console.log(globalName)
// function setName(){
//     vName = 'setName'
// }
// setName()
// console.log(vName)
// console.log(window.vName)

// 函数作用域
//坑  name
// function getName(){
//     var aaa = 'inner'
//     console.log(aaa)
// }
// getName()
// console.log(aaa)

//块级作用域
// console.log(a)
// if(true){
//     let a = '123'
//     console.log(a)
// }
// console.log(a)

//閉包： 一个可以访问其他函数内部变量的函数
// function fun1(){
//     var a = 1
//     return function(){
//         console.log(a)
//     }
// }

// fun1()
// var res = fun1()
// res()

// var a = 1
// function fun1(){
//     var a = 2
//     function fun2(){
//         var a = 3
//         console.log(a)
//     }
// }

// var fun3
// function fun1() {
//     var a = 2
//     fun3 = function (){
//         console.log(a)
//     }
// }
// fun1()
// fun3()

// var a = 1;
// function foo() {
//   var a = 2;
//   function baz() {
//     console.log(a);
//   }
//   bar(baz);
// }
// function bar(fn) {
//   // 这就是闭包
//   fn();
// }
// var a = foo();
// console.log(a);



for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
