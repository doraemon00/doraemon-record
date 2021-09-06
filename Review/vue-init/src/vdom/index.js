import { isObject, isReservedTag } from "../utils";

function createComponent(vm, tag, data, children, key, Ctor) {
  // console.log(vm, tag, data, children, "组件");
  if (isObject(Ctor)) {
    // 组件的定义一定是通过 Vue.extend 进行包裹的
    Ctor = vm.$options._base.extend(Ctor);
  }

  // 每个组件 默认的名字内部都会给你拼接一下
  // componentOptions 存放了一个重要的属性 Ctor
  let componentVnode = vnode(vm, tag, data, undefined, key, undefined, {
    Ctor,
    children,
    tag,
  });
  return componentVnode;
}

export function createElement(vm, tag, data = {}, ...children) {
  // 返回虚拟节点 _c('',{}....)

  // 需要进行拓展  因为会传入自定义组件
  // 如何区分是组件还是元素节点
  if (!isReservedTag(tag)) {
    let Ctor = vm.$options.components[tag]; //组件的初始化就是 new 组件的构造函数
    return createComponent(vm, tag, data, children, data.key, Ctor);
  }

  return vnode(vm, tag, data, children, data.key, undefined);
}
export function createText(vm, text) {
  // 返回虚拟节点
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}
function vnode(vm, tag, data, children, key, text, options) {
  return {
    vm,
    tag,
    data,
    children,
    key,
    text,
    componentOptions: options,
  };
}

// vnode 其实就是一个对象 用来描述节点的，这个和ast长的很像啊？
// ast 描述语法的，他并没有用户自己的逻辑 , 只有语法解析出来的内容
// vnode 他是描述dom结构的 可以自己去扩展属性

/**
 * 判断两个虚拟节点是否是同一个虚拟节点
 * 逻辑 标签名与key都相同
 * @param {*} newVnode
 * @param {*} oldVnode
 * @returns
 */
export function isSameVnode(newVnode, oldVnode) {
  return newVnode.tag === oldVnode.tag && newVnode.key == oldVnode.key;
}
