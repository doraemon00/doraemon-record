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


// 1.new Vue 会调用_init 方法进行初始化操作
// 2.会将用户的选项放在 vm.$options 上
// 3.会对当前属性上搜索有没有data数据， initState
// 4.有 data 判断data是不是一个函数，如果是函数取返回值initData
// 5.observe 取观测data中的数据

// 如果有el需要挂载到页面上

