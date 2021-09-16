(function(window){

    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    /**
     * Promise 构造函数
     * @param {*} excutor 内部同步执行的函数 (resolve,reject) => {}
     */
    function Promise(excutor) {
        const self = this
        self.status = 'pending'
        self.data = undefined
        self.callbacks = []

        function resolve(params) {
            if(self.status !== PENDING){
                return 
            }
            self.status = RESOLVED
            self.data = value
            if(self.callbacks.length > 0){
                // 放入队列中执行所有成功的回调
                setTimeout(()=>{
                    self.callbacks.forEach(callbacksObj=>{
                        callbacksObj.onResolved(value)
                    })
                })
            }
            
        }

        function reject(params) {
            if(self.status !== PENDING){
                return 
            }

            self.status = REJECTED
            self.data = reason
            if(self.callbacks.length>0){
                setTimeout(()=>{
                    self.callbacks.forEach(callbacksObj=>{
                        callbacksObj.onRejected(reason)
                    })
                })
            }

            // 立即同步执行excutor函数
            try{
                excutor(resolve,reject)
            }catch(err){
                reject(err)
            }
        }

    }

    Promise.prototype.then = function (onResolved,onRejected) {
        
    }


    Promise.prototype.catch = function (onRejected) {
        
    }


    Promise.resolve = function (value) {
        

    }

    Promise.reject = function (reason) {
        
    }

    Promise.all = function (promises) {
        
    }

    Promise.race = function (promises) {
        
    }





    // 暴露构造函数
    window.Promise = Promise
})(window)