(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function isFunction(val) {
      return typeof val === 'function';
    }

    function initState(vm) {
      const opts = vm.$options;

      if (opts.data) {
        initData(vm);
      }
    } // 数据的初始化

    function initData(vm) {
      // 用户传入的数据
      let data = vm.$options.data; // 如果用户传递的是一个函数，则取函数的返回值作为对象，如果就是对象那就直接使用这个对象

      data = isFunction(data) ? data.call(vm) : data;
      console.log(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        const vm = this; // 把用户的选项放到vm上，这样在其他方法中就可以获取到options了

        vm.$options = options; //为了后续扩展的方法都可以获取到 options 选项
        // options中是用户传入的数据 el data

        initState(vm);

        if (vm.$options.el) ;
      };
    }

    function Vue(options) {
      // console.log(options) 
      // 实现vue的初始化功能
      this._init(options);
    }

    initMixin(Vue); // 导出Vue

    return Vue;

})));
//# sourceMappingURL=vue.js.map
