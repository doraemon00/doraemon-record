let _subscribe = function(){
    class Sub {
        // 发布订阅类
        constructor(){
            // 创建一个事件池，用来存储后期需要执行的方法
            this.$pond = []
    
        }
        // 向事件池中追加方法
        add(func){
            let flag = this.$pond.some(item=>{
                return item === func
            })
            !flag ? this.$pond.push(func) : null
        }
    
        // 从事件池中移除方法
        remove(func){
            let $pond = this.$pond
            for(let i = 0; i<$pond.length;i++){
                let item = $pond[i]
                if(item === func){
                    // 移除(顺序不变的情况下基本上只能用 splice )
                    // 注意 此处这样移除会导致数组塌陷问题，我们移除不能真移除，
                    // 只能把当前赋值为null
                    // $pond.splice(i,1)
                    $pond[i] = null
                    break;
                }
            }
        }
    
        // 通知事件池中的方法按照顺序依次执行
        fire(...args){
            let $pond = this.$pond
            for(let i=0;i<$pond.length;i++){
                let item = $pond[i]
                if(typeof item !== 'function'){
                    // 此时再删除
                    $pond.splice(i,1)
                    i--
                     continue
                }
                item.call(this,...args)
            } 
        }
    }
    // 暴露给外面用
    return function subscribe(){
        return new Sub()
    }
    
    
}()


let s1 = _subscribe()
