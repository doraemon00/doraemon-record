// 定义三个状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
    constructor(executor){
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        // 用户调用 resolve 和 reject 可以将对应的结果保存在当前的promise实例上
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = (value)=>{
            if(this.status == PENDING){
                this.value = value
                this.status = FULFILLED
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }

        const reject = (reason)=>{
            if(this.status == PENDING){
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }

        try{
            executor(resolve,reject)  //默认new Promise 中的函数会立即执行
        }catch(e){
            // 如果执行出错，我们将错误传递到reject中 => 执行到了失败的逻辑
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        if(this.status == FULFILLED){
            onFulfilled(this.value)
        }
        if(this.status == REJECTED){
            onRejected(this.reason)
        }
        if(this.status == PENDING){
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
};

module.exports = Promise;




