class PubSub {
    constructor (){
        this.subscribers = []
    }

    subscribe(type,fn){
        let listeners = this.subscribers[type] || []
        listeners.push(fn)
    }

    unsubscribe(type,fn){
        let listeners = this.subscribers[type]
        if(!listeners || !listeners.length) return
        this.subscribers[type] = listeners.filter(v=>v !== fn)
    }
    publish(type, ...args) {
        let listeners = this.subscribers[type];
        if (!listeners || !listeners.length) return;
        listeners.forEach(fn => fn(...args));
    }

}


let ob = new PubSub();
ob.subscribe('add', (val) => console.log(val));
ob.publish('add', 1);