import { mergeOptions } from "../utils";

export function initGlobalAPI(Vue) {
  // 全局属性 在每个组件初始化的时候 将这些属性放到每个组件上
  Vue.options = {};

  // 为 vue 添加 mixin 静态方法
  //  功能：存放mixin component filter directive 属性
  Vue.mixin = function (options) {
    this.options = mergeOptions(this.options, options);
    console.log("打印mixin合并后的options", this.options);
    //返回this 提供链式调用
    return this;
  };
  Vue.component = function (options) {};
  Vue.filter = function (options) {};
  Vue.directive = function (options) {};
}
