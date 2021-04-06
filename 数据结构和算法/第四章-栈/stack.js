class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }
    push(element){
        this.items[this.count] = element
        this.count ++
    }
    size(){
        return this.count
    }
    isEmpty(){
        return this.count === 0
    }
}

const stack = new Stack()
stack.push(5)
stack.push()


stack.push()
stack.push()
const stack = new Stack()


