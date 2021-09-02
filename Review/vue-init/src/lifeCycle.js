import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";

export function mountComponent(vm) {
  //初始化流程
  let updateComponent = () => {
    vm._update(vm._render());
  };

  //每个组件都有一个 watcher 我们把这个watcher称之为渲染watcher
  callHook(vm, "beforeCreate");
  new Watcher(
    vm,
    updateComponent,
    () => {
      console.log("后续增添更新钩子函数 update");
      callHook(vm, "created");
    },
    true
  );
  callHook(vm, "mounted");
}

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    //采用的是 先序深度遍历 创建节点（遇到节点就创造节点，递归创建）
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}

export function callHook(vm, hook) {
  let handlers = vm.$options[hook];
  if (handlers) {
    handlers &&
      handlers.forEach((fn) => {
        //生命周期的 this 永远指向实例
        fn.call(vm);
      });
  }
}
