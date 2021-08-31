function mergeOptions(parentVal,childVal){
    const options = {}

    for(let key in parentVal){
        mergeFiled(key)
    }

    for(let key in childVal){
        if(!parentVal.hasOwnProperty(key)){
            mergeFiled(key)
        }
    }
    function mergeFiled(key){
        options[key] = childVal[key] ||parentVal[key]
    }

    return options
}

console.log(mergeOptions({a:1,b:2},{a:2}))