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
    toString(){
        if(this.isEmpty){
            return ''
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) { // {2} 
        objString = `${objString},${this.items[i]}`; // {3} 
        } 
        return objString;
    }
}

function decimalToBinary(decNumber){
    const remStack = new Stack()
    let number = decNumber
    let rem
    let binaryString = ''

    while(number > 0 ){
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number / 2)
    }

    while(!remStack.isEmpty()){
        binaryString += remStack.pop().toString()
    }
    return binaryString

}

console.log(decimalToBinary(10))