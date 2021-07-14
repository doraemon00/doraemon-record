import {initMixin} from './init'
import { lifeCycleMixin } from './lifecycle'
import { renderMixin } from './render'


// vue要如何实现，原型模式，所有的功能都通过 原型拓展的方式来添加
function Vue(options){
    // console.log(options) 
    // 实现vue的初始化功能
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)
lifeCycleMixin(Vue)


// 导出Vue
export default Vue


// 1.new Vue 会调用_init 方法进行初始化操作
// 2.会将用户的选项放在 vm.$options 上
// 3.会对当前属性上搜索有没有data数据， initState
// 4.有 data 判断data是不是一个函数，如果是函数取返回值initData
// 5.observe 去观测data中的数据 和 vm 没关系，说明data已经变成了响应式
// 6.vm上像取值也能取到data中的数据 vm._data = data 这样用户能取到data了
// 7.用户觉得有点麻烦， vm.xxx => vm._data


// 8.如果更新对象不存在的属性，会导致视图不更新，如果是数组更新索引和长度不会触发更新
// 9.如果是替换成一个新对象，新对象会被劫持；如果是数组存放新内容 push unshift() 新增的内容也会被劫持 
// 通过 __ob__ 进行标识这个对象被监控过，（在vue中被监控的对象身上都有一个__ob__属性）
// 10.如果你想改索引，可以使用 $set方法，内部就是splice()


// 如果有el需要挂载到页面上

