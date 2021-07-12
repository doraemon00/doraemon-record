(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function isFunction(val) {
      return typeof val === 'function';
    }
    function isObject(val) {
      return typeof val == 'object' && val !== null;
    }

    class Observe {
      constructor(value) {
        this.walk(value); //核心就是循环对象 
      }

      walk(data) {
        // 要使用 definePrototype 重新定义 
        Object.keys(data).forEach(key => {
          defineReactive(data, key, data[key]);
        });
      }

    } // vue2 应用了defineProperty 需要一加载的时候就进行递归操作，所以耗性能，如果层次过深，也会浪费性能
    // 1.性能优化的原则：
    // 1）不要把所有的数据都防在data中，因为所有的数据都会增加get和set
    // 2）不要写数据的时候层次过深，尽量扁平化数据
    // 3）不要频繁获取数据 比如可以使用变量缓存 
    // 4）如果数据不需要响应式，可以使用 Object.freeze 冻结属性
    // vue2 慢的主要原因在这个方法中


    function defineReactive(obj, key, value) {
      observe(value); //递归进行观测数据，不管有多少层，都进行 defineProperty

      Object.defineProperty(obj, key, {
        get() {
          return value; //闭包 此value会像上层的value进行查找 
        },

        set(newValue) {
          if (newValue === value) return;
          value = newValue;
        }

      });
    }

    function observe(value) {
      // 如果value不是对象，则不用观测了
      if (!isObject(value)) {
        return;
      } // 需要对对象进行观测，最外层必须是一个 { } 不能是数组 
      // 如果一个数据已经被观测过了，就不要在进行观测了，用类来实现，我观测过就增加一个标识， 说明观测过了，在观测的时候可以先检测是否观测过，如果观测过了就跳过检测 


      return new Observe(value);
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

      data = isFunction(data) ? data.call(vm) : data; // 需要将 data 变成响应式的 Object.defineProperty 重写data中的所有属性

      observe(data); //观测数据

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
    // 2.会将用户的选项放在 vm.$options 上
    // 3.会对当前属性上搜索有没有data数据， initState
    // 4.有 data 判断data是不是一个函数，如果是函数取返回值initData
    // 5.observe 取观测data中的数据
    // 如果有el需要挂载到页面上

    return Vue;

})));
//# sourceMappingURL=vue.js.map
