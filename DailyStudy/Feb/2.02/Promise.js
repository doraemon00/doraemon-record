// const promise1 = new Promise((resolve, reject) => {
//   console.log("promise1");
// });
// console.log("1", promise1);

// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve("success"); //这个状态没有的话 则3 不会打印
//   console.log(2);
// });
// promise.then(() => {
//   console.log(3);
// });
// console.log(4);

// // 1 2 4 3

// const promise1 = new Promise((resolve, reject) => {
//     console.log('promise1')
//     resolve('resolve1')
//   })
//   const promise2 = promise1.then(res => {
//     console.log(res)
//   })
//   console.log('1', promise1);
//   console.log('2', promise2);

//   'promise1'
//   '1' Promise{<resolved>: 'resolve1'}
//   '2' Promise{<pending>}
//   'resolve1'


// const fn = () => (new Promise((resolve, reject) => {
//     console.log(1);
//     resolve('success')
//   }))
//   fn().then(res => {
//     console.log(res)
//   })
//   console.log('start')
  


// const fn = () =>
//   new Promise((resolve, reject) => {
//     console.log(1);
//     resolve("success");
//   });
// console.log("start");
// fn().then(res => {
//   console.log(res);
// });


//注意：得注意new Promise 是不是包括在函数当中，如果是的话，只有在函数调用的时候才会执行 
// "start"
// 1
// "success"


// console.log('start')
// setTimeout(() => {
//   console.log('time')
// })
// Promise.resolve().then(() => {
//   console.log('resolve')
// })
// console.log('end')

//注意 这里是有两个宏任务 



// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//       console.log("timerStart");
//       resolve("success");
//       console.log("timerEnd");
//     }, 0);
//     console.log(2);
//   });
//   promise.then((res) => {
//     console.log(res);
//   });
//   console.log(4);
  
//注意 当没有状态的时候 .then 不执行 






