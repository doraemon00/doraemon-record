import { isSameVnode } from ".";

export function patch(oldVnode, vnode) {
  /**
   * 找到老节点的下一个兄弟节点（nextSibling 若不存在将返回null）
   * const nextSibling = el.nextSibling
    将新节点elm插入到老节点el的下一个兄弟节点nextSibling的前面
    备注 若nextSibling 为null insertBefore等价于appendChild
     parentNode.insertBefore(elm, nextSibling);
   */
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    //真实节点 走老逻辑
    const elm = createElm(vnode);
    const parentNode = oldVnode.parentNode;
    parentNode.insertBefore(elm, oldVnode.nextSibling);
    parentNode.removeChild(oldVnode);
    //返回最新节点
    return elm;
  } else {
    //虚拟节点 做diff算法 新老节点比对
    console.log(oldVnode, vnode);
    //不是相同节点，不考虑复用 直接替换
    if (!isSameVnode(oldVnode, vnode)) {
      // 如果新旧节点 不是同一个，删除老的换成新的
      return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
    }

    // 文本直接更新即可，因为文本没有儿子
    let el = (vnode.el = oldVnode.el); //节点复用，将老节点el赋值给新节点el
    if (!oldVnode.tag) {
      //文本：没有标签名
      if (oldVnode.text !== vnode.text) {
        return (el.textContent = vnode.text);
      }
    }

    // 元素 新的虚拟节点
    updateProperties(vnode, oldVnode.data);
    // 是相同节点了，复用节点，在更新不一样的地方 （属性）

    // 比较儿子节点
    let oldChildren = oldVnode.children || [];
    let newChildren = vnode.children || [];

    // 情况1：老的有儿子 新的没儿子
    if (oldChildren.length > 0 && newChildren.length == 0) {
      el.innerHTML = "";
    } else if (
      // 新的有儿子 老的没儿子 直接将新的插入即可
      newChildren.length > 0 &&
      oldChildren.length == 0
    ) {
      newChildren.forEach((child) => {
        el.appendChild(createElm(child));
      });
    } else {
      // 新老都有儿子
      updateChildren(el, oldChildren, newChildren);
    }
  }
}

// 核心的diff算法
function updateChildren(el, oldChildren, newChildren) {
  // 声明头尾指针
  let oldStartIndex = 0;
  let oldStartVnode = oldChildren[0];
  let oldEndIndex = oldChildren.length - 1;
  let oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0;
  let newStartVnode = newChildren[0];
  let newEndIndex = newChildren.length - 1;
  let newEndVnode = newChildren[newEndIndex];

  //循环结束条件，有一方遍历完了就结束，即 老的头指针和尾指针重合并且新的头指针和尾指针重合
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 头头比对
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      // isSameVnode只能判断标签和key一样，但属性可能还有不同
      // 所以需要 patch 方法递归更新新老虚拟节点的属性
      patch(oldStartVnode, newStartVnode);
      // 更新新老头指针和新老头节点
      oldStartVnode = oldStartVnode[++oldStartVnode];
      newStartVnode = newStartVnode[++newStartVnode];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      //头尾
      patch(oldStartVnode, newEndVnode);
      el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // 尾头
      patch(oldEndVnode, newStartVnode);
      el.insertBefore(oldEndVnode.el, oldStartVnode.el); // 将尾部的插入到头部去
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    }else{
      //之前的逻辑都是考虑用户一些特殊情况，但是有非特殊的 乱序排列
    }
  }

  // 1.新的多 插入新增的
  if (newStartIndex <= newEndIndex) {
    // 新的开始指针和新的结束指针之间的节点 （指的是前面已经比对完了）
    // 如果下一个是null，就是appendChild
    let anchor =
      newChildren[newEndIndex + 1] == null
        ? null
        : newChildren[newEndIndex + 1].el;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      //看一下 当前尾节点的下一个元素是否存在，如果存在则是插入到下一个元素的前面
      // 获取对应的虚拟节点，并生成真实节点，添加到dom中
      el.insertBefore(createElm(newChildren[i]), anchor);
    }
  }

  //老儿子比新儿子多，（以旧指针为参照）删除多余的真实节点
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldChildren[i];
      el.removeChild(child.el);
    }
  }
}

export function createElm(vnode) {
  let { tag, data, children, text, vm } = vnode;
  //我们让虚拟节点和真实节点做一个映射关系，后续某个虚拟节点更新了 我可以跟踪到真实节点，并且更新真实节点
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    //如果有data属性，我们需要把data设置到元素上
    updateProperties(vnode, data);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

// 1.初次渲染，用 oldProps 给vnode 的el 赋值即可
// 2.更新逻辑，拿到老的props和vnode中的data进行比对
function updateProperties(vnode, oldProps = {}) {
  let el = vnode.el; //dom上的真实节点
  let newProps = vnode.data || {}; //拿到新的数据

  let newStyle = newProps.style || {}; // 新样式对象
  let oldStyle = oldProps.style || {}; // 老样式对象

  // 老样式对象中有，新样式对象中没有，删掉多余样式
  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = "";
    }
  }

  // 新样式对象中有，覆盖到老样式对象中
  for (let key in newProps) {
    if (key == "style") {
      //处理style样式
      for (let key in newStyle) {
        el.style[key] = newStyle[key];
      }
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }

  //新旧对比 两个对象比对差异
  // for (let key in newProps) {
  //   //直接用新的盖掉老的，但还要注意，老的里面有，可能新的里面没有了
  //   el.setAttribute(key, newProps[key]);
  // }

  // 处理老的里面有，可能新的里面没有的情况，需要在删掉
  for (let key in oldProps) {
    if (!newProps[key]) {
      el.removeAttribute(key);
    }
  }
}
