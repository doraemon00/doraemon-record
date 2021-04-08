class Stack{
    constructor(){
        this.items = []
    }
    push(element){
        this.items.push(element)
    }
    pop(){
        return this.items.pop()
    }
    //输出最后一位
    peek(){
        return this.items[this.items.length - 1]
    }
    isEmpty(){
        return this.items.length === 0
    }
    size(){
        return this.items.length
    }
    clear(){
        this.items = []
    }
}

const stack = new Stack()
console.log(stack.isEmpty())
stack.push(5)
console.log(stack.peek())

