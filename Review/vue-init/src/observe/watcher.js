import Dep from "./dep";
let id = 0;
class Watcher{
    constructor(vm,fn,cb,options){
        this.vm = vm
        this.fn = fn
        this.cb = cb 
        this.options = options
        this.id = id ++ 
        this.depsId = new Set()
        this.deps = []
        /**
         * 因为fn就是vm._update(vm._render()) ,所以就是页面渲染。下面代码意思赋值并调用
         */
        this.getter = fn // fn就是页面渲染逻辑
        this.getter() //表示上来后就做一次初始化 
    }

    addDep(dep){
        let did = dep.id
        if(!this.depsId.has(did)){
            this.depsId.add(did)
            this.deps.push(dep) //做了保存id的功能，并且让watcher记住dep
            dep.addSub(this)
        }
    }

    get(){
        Dep.target = this
        this.getter()
        Dep.target = null
    }

    update(){
        console.log('update')
        this.get()
    }
}

export default Watcher 



