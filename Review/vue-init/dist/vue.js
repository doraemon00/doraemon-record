(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 匹配标签名的  aa-xxx

  const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  aa:aa-xxx

  const startTagOpen = new RegExp(`^<${qnameCapture}`); //  此正则可以匹配到标签名 匹配到结果的第一个(索引第一个) [1]

  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>  [1]

  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
  // [1]属性的key   [3] || [4] ||[5] 属性的值  a=1  a='1'  a=""

  const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的  />    >

  function parserHTML(html) {
    // 不停的截取模板 直到把模板全部解析完毕
    // 截取方法
    function advance(len) {
      html = html.substring(len);
    } // 解析开始标签


    function parseStartTag() {
      const start = html.match(startTagOpen);

      if (start) {
        const match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);
        let end;
        let attr;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          //1要有属性 2不能为开始的结束标签
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (end) {
          advance(end[0].length);
        }

        return match;
      }

      return false;
    }

    while (html) {
      //解析标签和文本
      let index = html.indexOf("<"); //标签

      if (index == 0) {
        //解析开始标签 并把属性也解析出来
        const startTagMatch = parseStartTag();

        if (startTagMatch) {
          //开始标签
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        if (html.match(endTag)) {
          //结束标签
          continue;
        }

        break;
      } //文本

    }
  }

  function compileToFunction(template) {
    console.log(template); //1 将模板变成ast语法树

    parserHTML(template);
  }

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

      initState(vm);

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    }; //new Vue({el})  new Vue().$mount


    Vue.prototype.$mount = function (el) {
      const vm = this;
      const opts = vm.$options; //获取真实元素

      el = document.querySelector(el);
      vm.$el = el; //页面真实元素
      //此处对 三种挂载方式进行进行判断

      if (!opts.render) {
        //模板编译
        let template = opts.template;

        if (!template) {
          template = el.outerHTML;
        }

        let render = compileToFunction(template);
        opts.render = render;
      } // console.log(opts.render);

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
