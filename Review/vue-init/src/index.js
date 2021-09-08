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
// let vm1 = new Vue({
//   data() {
//     return { name: "chu" };
//   },
// });

//将 模板 render1 生成为 render 函数

/**
 * 测试用例
 * <div style="color:blue">{{name}}</div>
 */

// let render1 = compileToFunction(`<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// </div>`);
// //调用 render 函数产生虚拟节点
// let oldVnode = render1.call(vm1);
// //将虚拟节点生成真实节点
// let el1 = createElm(oldVnode);
// //将真实节点渲染到页面上
// document.body.appendChild(el1);

// //生成第二个虚拟节点
// let vm2 = new Vue({
//   data() {
//     return { name: "doraemon" };
//   },
// });
// let render2 = compileToFunction(`<div>
// <li key="A" style="color:red">A</li>
// <li key="B" style="color:blue">B</li>
// <li key="C" style="color:yellow">C</li>
// <li key="D" style="color:pink">D</li>
// <li key="E">E</li>
// <li key="F">F</li>
// </div>`);
// let newVnode = render2.call(vm2);

// // 初始化完成显示 el1,2秒后移除 el1 显示 el2
// setTimeout(()=>{
//   // 比对新老虚拟节点的差异，尽可能复用原有节点，以提升渲染性能
//   patch(oldVnode,newVnode)
//   // let el2 = createElm(newVnode)
//   // document.body.removeChild(el1)
//   // document.body.appendChild(el2)
// },2000)

// 导出Vue
export default Vue;

// 1、Vue.component 注册成全局组件，内部会自动调用 Vue.extend 方法，返回组件的构造函数
// 2. 组件初始化的时候，会做一个合并 mergerOptions （自己的组件.__proto__ = 全局的组件）
// 3. 内部会对模板进行编译操作， _c('组件的名字') 做筛查，如果是组件就创造一个组件的虚拟节点，还会判断Ctor ，如果是对象会调用Vue.extend ，所有的组件都是通过 Vue.extend 方法来实现的 （componentOptions 里面放着组件的所有内容，属性的实现，事件的实现，插槽的内容，Ctor）
// 4.创建组件的真实节点（new Ctor 拿到组件的实例，并且调用组件的$mount 方法（会生成一个$el对应组件模板渲染后的结果）） vnode.componentInstance = new Ctor() vnode.componentInstance.$el => 组件渲染后的结果
// 5.将组件的vnode.componentInstance.$el 插入到父标签中
// 6.组件在 new Ctor() 时会进行组件的初始化，给组件再次添加一个独立的渲染 watcher (每个组件都有自己的watcher),更新时，只需要更新自己组件对应的渲染watcher (因为组件渲染时，组件对应的属性会收集自己的渲染watcher)

