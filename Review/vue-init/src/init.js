import { initState } from './state'

export function initMixin(Vue) {
  // 在vue的原型上进行挂载
  Vue.prototype._init = function (options) {

    // 把用户的选项放到 vm 上，这样在其它方法中都可以获取到 options 
    const vm = this;
    vm.$options = options;


    // 传入数据 对数据进行操作 
    initState(vm)





    // console.log("这是 init 方法");
    
  };
}
