import { compileToFunction } from "./compiler";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    // 把用户的选项放到vm上，这样在其他方法中就可以获取到options了
    vm.$options = options; //为了后续扩展的方法都可以获取到 options 选项

    // options中是用户传入的数据 el data
    initState(vm);

    if (vm.$options.el) {
      // 要将数据挂载到页面上
      // 现在数据已经被劫持了 数据变化需要更新视图 diff算法更新需要更新的部分
      //vue -> template    jsx->(灵活)
      // vue3 template 写起来性能会更高一些 内部做了很多优化
      // template -> ast语法树 (用来描述语法的，描述语法本身的) -> 描述成一个树结构 -> 将代码重组js语法
      // 模板编译原理（把template模板编译成render函数 -> 虚拟DOM -> diff算法比对虚拟DOM ）
      // ast -> render返回 —> vnode ->生成真实dom
      //        更新的时候再次调用render -> 新的 vnode -> 新旧对比 -> 更新真实dom
      vm.$mount(vm.$options.el);
    }
  };
  //new Vue({el})  new Vue().$mount()
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const opts = vm.$options;
    el = document.querySelector(el); //获取真实的元素
    vm.$el = el; //页面真实元素

    //render > template > html
    if (!opts.render) {
      // 模板编译
      let template = opts.template;
      if (!template) {
        template = el.outerHTML;
      }
      let render = compileToFunction(el.outerHTML);
      opts.render = render;
    }

    // console.log(opts.render)

    // 这里已经获取到了，一个 render函数的了

    // debugger
    mountComponent(vm)


  };
}
