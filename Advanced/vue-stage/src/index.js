import {initMixin} from './init'

// vue要如何实现，原型模式，所有的功能都通过 原型拓展的方式来添加
function Vue(options){
    // console.log(options) 
    // 实现vue的初始化功能
    this._init(options)
}

initMixin(Vue)


// 导出Vue
export default Vue