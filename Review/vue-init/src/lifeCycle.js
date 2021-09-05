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
    // vm.$el = patch(vm.$el, vnode);
    let preVnode = vm._prevVnode;
    // 第一次渲染 是根据虚拟节点 生成真实节点，替换掉原来的节点
    vm._prevVnode = vnode;
    // 如果是第二次 生成一个新得虚拟节点 ，和老的虚拟节点进行对比
    if (!preVnode) {
      // 没有节点就是初次渲染
      vm.$el = patch(vm.$el, vnode);
    } else {
      vm.$el = patch(preVnode, vnode);
    }
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
