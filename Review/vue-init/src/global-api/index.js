import { isObject, mergeOptions } from "../utils";

export function initGlobalAPI(Vue) {
  // 全局属性 在每个组件初始化的时候 将这些属性放到每个组件上
  Vue.options = {};
  //存放全局组件的
  Vue.options.components = {};
  // Vue.component -> Vue.extend
  // 在任何地方访问 vm.$options._base 都可以拿到 Vue
  Vue.options._base = Vue;

  // 为 vue 添加 mixin 静态方法
  //  功能：存放mixin component filter directive 属性
  Vue.mixin = function (options) {
    this.options = mergeOptions(this.options, options);
    console.log("打印mixin合并后的options", this.options);
    //返回this 提供链式调用
    return this;
  };

  /**
   * 使用基础的Vue构造器 创造一个子类
   * @param {*} opt
   * @returns
   */
  Vue.extend = function (opt) {
    // 父类 Vue即当前this
    const Super = this;
    // 创建子类Sub
    const Sub = function (options) {
      //创造一个组件 其实就是new 这个组件的类（组件初始化）
      // 当new组件时，执行组件初始化
      this._init(options);
    };
    // 子类继承父类
    Sub.prototype = Object.create(Super.prototype); //继承原型方法
    Sub.prototype.constructor = Sub; //Object.create 会产生一个新的实例作为子类的原型，此时 constructor 会指向错误

    Sub.options = mergeOptions(Super.options, opt);
    // Sub.mixin = Vue.mixin;

    return Sub;
  };

  /**
   *
   * @param {*} id 组件名
   * @param {*} definition 组件定义
   */
  // definition 可以传入对象或函数
  Vue.component = function (id, definition) {
    let name = definition.name || id;
    definition.name = name;

    // 如果传入的是对象，使用Vue.extend进行一次处理
    if (isObject(definition)) {
      definition = Vue.extend(definition);
    }
    // 将 definition 对象保存到全局。Vue.options.components
    Vue.options.components[name] = definition;
    console.log(Vue.options.components);
  };

  // Vue.filter = function (options) {};
  // Vue.directive = function (options) {};
}
