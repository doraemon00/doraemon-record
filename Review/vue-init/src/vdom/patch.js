export function patch(el, vnode) {
  const elm = createElm(vnode);

  const parentNode = el.parentNode;
  parentNode.insertBefore(elm, el.nextSibling);

  parentNode.removeChild(el);
  //返回最新节点
  return elm;
}

function createElm(vnode) {
  let { tag, data, children, text, vm } = vnode;
  //我们让虚拟节点和真实节点做一个映射关系，后续某个虚拟节点更新了 我可以跟踪到真实节点，并且更新真实节点
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    //如果有data属性，我们需要把data设置到元素上
    updateProperties(vnode.el, data);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(el,props = {}){
    for(let key in props){
        el.setAttribute(key,props[key])
    }
}



