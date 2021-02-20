function add(a,b){
    return arguments
}

let arrayLike = add(1,2)
// let array = Array.from(arrayLike)
// let array = Array.prototype.slice.call(arrayLike)
let array = [...arrayLike]

console.log(array)