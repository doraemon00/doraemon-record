(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function isFunction(val) {
    return typeof val == "function";
  }
  function isObject(val) {
    return typeof val == "object" && val !== null;
  }
  let isArray = Array.isArray;

  let oldArrayPrototype = Array.prototype; //让arrayMethods可以通过__proto__ 获取到数组的方法

  let arrayMethods = Object.create(oldArrayPrototype); //只有这7个方法可以导致数组发生变化

  let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];
  methods.forEach(method => {
    arrayMethods[method] = function (...args) {
      console.log("数组的方法进行重写操作"); //数组 新增的属性 要看一下是不是对象，如果是对象，继续进行劫持

      oldArrayPrototype[method].call(this, ...args); // 通过__ob__ 进行标识这个对象被监控过  （在vue中被监控的对象身上都有一个__ob__ 这个属性）

      let inserted = null;
      let ob = this.__ob__;

      switch (method) {
        case "splice":
          inserted = args.slice(2);
          break;

        case "push":
        case "unshift":
          inserted = args;
          break;
      } // 看一下新增的属性是不是对象， 看是否需要进行劫持


      if (inserted) ob.observeArray(inserted);
    };
  });

  class Observer {
    constructor(value) {
      //可以调用 __ob__ 是因为这里进行了设置
      // 不让__ob__ 被遍历到
      // value.__ob__ = this; // 我给对象和数组添加一个自定义属性
      Object.defineProperty(value, "__ob__", {
        value: this,
        enumerable: false // 标识这个属性不能被列举出来，不能被循环到

      }); // 数组的情况  改写数组的原型链

      if (isArray(value)) {
        value.__proto__ = arrayMethods; //重写数组的方法

        this.observeArray(value);
      } else {
        //对象的情况
        // 核心就是循环对象
        this.walk(value);
      }
    }

    observeArray(data) {
      //递归遍历数组 对数组内部的对象再次重写  [[]]  [{}]
      data.forEach(item => observe(item));
    }

    walk(data) {
      Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
      });
    }

  }

  function defineReactive(obj, key, value) {
    // 递归进行观测数据
    observe(value);
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },

      set(newValue) {
        if (newValue === value) return;
        observe(newValue);
        console.log("修改");
        value = newValue;
      }

    });
  }

  function observe(value) {
    // 如果不是对象就不用观测 写的有问题
    if (!isObject(value)) {
      return;
    }

    if (value.__ob__) {
      return; //一个对象不需要重新被观测 
    }

    return new Observer(value);
  }

  function initState(vm) {
    // 把用户的选项传递过来
    const opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }

  function proxy(vm, key, source) {
    Object.defineProperty(vm, key, {
      get() {
        return vm[source][key];
      },

      set(newValue) {
        vm[source][key] = newValue;
      }

    });
  }

  function initData(vm) {
    let data = vm.$options.data; // 这一步 把 data 也放在vm 上了

    data = vm._data = isFunction(data) ? data.call(vm) : data; //   需要将 data 变成响应式的

    observe(data);

    for (let key in data) {
      proxy(vm, key, '_data');
    } // console.log(data)
    // data.arr.push(100);

  }

  function initMixin(Vue) {
    // 在vue的原型上进行挂载
    Vue.prototype._init = function (options) {
      // 把用户的选项放到 vm 上，这样在其它方法中都可以获取到 options 
      const vm = this;
      vm.$options = options; // 传入数据 对数据进行操作 

      initState(vm); // console.log("这是 init 方法");
    };
  }

  function Vue(options) {
    //这里调用原型上挂载的方法
    this._init(options);
  } //只是把方法挂载到原型上去了 此处并没有执行


  initMixin(Vue); // 导出Vue

  return Vue;

})));
//# sourceMappingURL=vue.js.map
