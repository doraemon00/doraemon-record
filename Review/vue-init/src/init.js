import { compileToFunction } from "./compiler";
import { initState } from "./state";

export function initMixin(Vue) {
  // 在vue的原型上进行挂载
  Vue.prototype._init = function (options) {
    // 把用户的选项放到 vm 上，这样在其它方法中都可以获取到 options
    const vm = this;
    vm.$options = options;

    // 传入数据 对数据进行操作
    initState(vm);

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  //new Vue({el})  new Vue().$mount
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const opts = vm.$options;
    //获取真实元素
    el = document.querySelector(el);
    vm.$el = el; //页面真实元素

    //此处对 三种挂载方式进行进行判断
    if (!opts.render) {
      //模板编译
      let template = opts.template;
      if (!template) {
        template = el.outerHTML;
      }
      let render = compileToFunction(template);
      opts.render = render;
    }
    // console.log(opts.render);
  };
}
