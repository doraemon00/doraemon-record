import {initState} from './state'

export function initMixin(Vue){
    Vue.prototype._init = function(options){
        const vm = this

        // 把用户的选项放到vm上，这样在其他方法中就可以获取到options了
        vm.$options = options //为了后续扩展的方法都可以获取到 options 选项

        // options中是用户传入的数据 el data
        initState(vm)

        if(vm.$options.el){
        // 要将数据挂载到页面上 

        }



    }
}

