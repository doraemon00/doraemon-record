function Stack(){
    this.dataStore = []
    this.top = 0
    this.push = push 
    this.pop = pop
    // this.peek = peek
}

function push(element){
    return this.dataStore[this.top++] = element
}

function pop(){
    return this.dataStore[--this.top]
}


var s = new Stack()
s.push("10")
s.push("20")
s.pop()


console.log(s)





