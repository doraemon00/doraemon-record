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
    pop(){
        if(this.isEmpty){
            return undefined
        }
        this.count --
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }
}

// const stack = new Stack()
// stack.push(5)
// stack.push()


// stack.push()
// stack.push()
// const stack = new Stack()


const stack = new Stack()
console.log(Object.getOwnPropertyNames(stack)) //count items
