// 目标类
class Subject{
    constructor(){
        //观察者列表
        this.observers = []
    }
    add(observer){
        this.observers.push(observer)
    }
    // 删除
    remove(observer){
        let idx = this.observers.findIndex(item => item === observer)
        idx > 1 && this.observers.splice(idx,1)
    }
    // 通知
    notify(){
        for(let observe of this.observers){
            observe.update()
        }
    }
}



// 观察者类
class Observer {
    constructor(name){
        this.name = name
    }

    update(){
        console.log(`目标者通知我更新了，我是：${this.name}`)
    }


}

let subject  = new Subject()

let obs1 = new Observer("前端")
let obs2 = new Observer("后端")

// 向目标者添加观察者
subject.add(obs1)
subject.add(obs2)

// 目标者通知更新
subject.notify()











