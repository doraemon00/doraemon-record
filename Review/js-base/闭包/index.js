// 闭包 可以访问其他函数内部变量的函数
// 本质 当前环境中存在指向父级作用域的引用

// function fun1(){
//     var a = 1
//     return function(){
//         console.log(a)
//     }
// }
// var result = fun1()
// result()



// 并非只有返回函数才产生闭包。只需要让父级作用域的引用存在即可
// var fun3
// function fun1(){
//     var a = 2
//     fun3 = function(){
//         console.log(a)
//     }
// }
// fun1()
// fun3()


// 闭包的表现形式
// 作为函数参数传递
// var a = 1
// function foo(){
//     var a = 2
//     function baz(){
//         console.log(a)
//     }
//     bar(baz)
// }
// function bar(fn){
//     fn()
// }
// foo()  //输出2 而不是1 


// 立即执行函数
// var a = 2; //注意分号一定加上
// (function IIFE(){
//     console.log(a)  //2
// })()


// for(var i = 1;i<=5;i++){
//     setTimeout(function timer(){
//         console.log(i) //5个6
//     },0)
// }

for(var i =1;i<=5;i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j)
        },0)
    })(i)
}


