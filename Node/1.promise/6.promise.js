// promise 是一个类，我们可以 new Promise 创造一个实例
/**
 * promise 有三个状态， 
 * 1.默认状态叫等待态   pending  
 * 2.resolve表示成功态  fulfilled
 * 3.reject 表示变成失败态 rejected 
 * 
 * 只有在 pending 的状态的时候才能改变状态 不能从成功变成失败，不能从失败变成成功 
 * 
 * 除了调用resolve和reject能改变状态外，还能使用 throw error 抛出异常也会执行到失败的逻辑
 */
// 注意 这里路径写完整 不然会报错
let Promise = require('./promise/index.js');
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // throw new Error('error')
        reject('ok'); // 让promise变成成功态
        resolve('ok')
        // return new Error('失败')
    }, 1000);
})

promise.then((value)=>{
    console.log(value,'success')
},(reason)=>{
    console.log(reason,'fail')
})




