/**
 * 对数字求和到给定值
 */

// 循环
// function sumTo(n){
//     let result = 0
//     for(let i=0;i<=n;i++){
//         result += i
//     }
//     return result
// }

//递归
// function sumTo(n){
//     if(n==1){
//         return n
//     }else{
//         return n + sumTo(n-1)
//     }
// }

// console.log(sumTo(100))

/**
 * 2 计算阶乘
 */

// function factorial(n) {
//   if (n == 1) {
//     return n;
//   } else {
//     return n * factorial(n - 1);
//   }
// }

// console.log(factorial(5));

/**
 * 3 斐波那契数列
 */

//递归方式 性能及差
// function fib(n) {
//   if (n <= 1) {
//     return n;
//   } else {
//     return fib(n - 1) + fib(n - 2);
//   }
// }

// // console.time()
// // console.timeEnd()



// // 自下而上的动态规划
// function fib(n) {
//     let a = 1;
//     let b = 1;
//     for (let i = 3; i <= n; i++) {
//       let c = a + b;
//       a = b;
//       b = c;
//     }
//     return b;
//   }
  
// console.log(fib(7));




/**
 * 4 输出一个单链表
 */
 let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

//循环解法
// function printList(list){
//     let tmp = list 
//     //因为最后一个 是 null 所以会有停止的地方
//     while(tmp){
//         console.log(tmp.value)
//         tmp = tmp.next
//     }
// }

// 递归
function printList(list){
    // 最简单的一步（基础条件）就是 直接输出
    console.log(list.value)

    if(list.next){
        printList(list.next)
    }
}



printList(list)
// console.log(printList(list))

