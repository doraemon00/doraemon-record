function _new(ctor,...args){
    if(typeof ctor !== 'function'){
        throw 'ctor must be a function'
    }
    let obj = new Object()
    obj.__proto__ = Object.create(ctor.prototype)
    let res = ctor.apply(obj,[...args])

    let isObject = typeof res === 'object' && res !== null
    let isFunction = typeof res === 'function'
    return isObject || isFunction ? res : obj
}


function Person(){
    this.name = "chu"
}
var p1 = _new(Person)
console.log(p1)
















