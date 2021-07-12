import { isFunction } from "./utils"

export function initState(vm){
    const opts = vm.$options

    if(opts.data){
        initData(vm)
    }

}



// 数据的初始化
function initData(vm){
    // 用户传入的数据
    let data = vm.$options.data
    
    // 如果用户传递的是一个函数，则取函数的返回值作为对象，如果就是对象那就直接使用这个对象
    data = isFunction(data) ? data.call(vm) : data

    console.log(data)


}