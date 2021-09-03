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
