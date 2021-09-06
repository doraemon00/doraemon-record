import { isObject, mergeOptions } from "../utils";

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

  Vue.options._base = Vue
  // 会产生一个子类
  Vue.extend = function (opt) {
    const Super = this;
    const Sub = function () {
      //创造一个组件 其实就是new 这个组件的类（组件初始化）
    };
    Sub.prototype = Object.create(Super.prototype); //继承原型方法
    Sub.prototype.constructor = Sub; //Object.create 会产生一个新的实例作为子类的原型，此时 constructor 会指向错误

    Sub.options = mergeOptions(Super.options, opt);
    Sub.mixin = Vue.mixin;

    return Sub;
  };
  //存放全局组件的
  Vue.options.components = {};
  // Vue.component -> Vue.extend
  // definition 可以传入对象或函数
  Vue.component = function (id, definition) {
    let name = definition.name || id;
    definition.name = name;

    if (isObject(definition)) {
      definition = Vue.extend(definition);
    }

    Vue.options.components[name] = definition;
    console.log(Vue.options.components);
  };

  Vue.filter = function (options) {};
  Vue.directive = function (options) {};
}
