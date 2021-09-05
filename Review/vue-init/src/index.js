import { compileToFunction } from "./compiler";
import { initGlobalAPI } from "./global-api";
import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifeCycle";
import { renderMixin } from "./render";
import { createElm, patch } from "./vdom/patch";

function Vue(options) {
  //这里调用原型上挂载的方法
  this._init(options);
}

//只是把方法挂载到原型上去了 此处并没有执行
initMixin(Vue);
renderMixin(Vue);
lifeCycleMixin(Vue);
initGlobalAPI(Vue); //初始化global Api

// 先生成第一个虚拟节点
let vm1 = new Vue({
  data() {
    return { name: "chu" };
  },
});

//将 模板 render1 生成为 render 函数

/**
 * 测试用例
 * <div style="color:blue">{{name}}</div>
 */

let render1 = compileToFunction(`<div>
<li key="A">A</li>
<li key="B">B</li>
<li key="C">C</li>
<li key="D">D</li>
</div>`);
//调用 render 函数产生虚拟节点
let oldVnode = render1.call(vm1);
//将虚拟节点生成真实节点
let el1 = createElm(oldVnode);
//将真实节点渲染到页面上
document.body.appendChild(el1);

//生成第二个虚拟节点
let vm2 = new Vue({
  data() {
    return { name: "doraemon" };
  },
});
let render2 = compileToFunction(`<div>
<li key="A" style="color:red">A</li>
<li key="B" style="color:blue">B</li>
<li key="C" style="color:yellow">C</li>
<li key="D" style="color:pink">D</li>
<li key="E">E</li>
<li key="F">F</li>
</div>`);
let newVnode = render2.call(vm2);

// 初始化完成显示 el1,2秒后移除 el1 显示 el2
setTimeout(()=>{
  // 比对新老虚拟节点的差异，尽可能复用原有节点，以提升渲染性能
  patch(oldVnode,newVnode)
  // let el2 = createElm(newVnode)
  // document.body.removeChild(el1)
  // document.body.appendChild(el2)
},2000)



// 导出Vue
export default Vue;
