(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function compileToFunction(template) {
      console.log(template);
    }

    function isFunction(val) {
      return typeof val === 'function';
    }
    function isObject(val) {
      return typeof val == 'object' && val !== null;
    }
    let isArray = Array.isArray;

    let oldArrayPrototype = Array.prototype; //获取数组的老的原型方法

    let arrayMethods = Object.create(oldArrayPrototype); //让arrayMethods通过__proto__ 能获取到数组的方法
    // 只有这七个方法可以导致数组发生变化

    let methods = ['push', 'shift', 'pop', 'unshift', 'reverse', 'sort', 'splice'];
    methods.forEach(method => {
      arrayMethods[method] = function (...args) {
        // console.log("数组方法进行重写操作")
        // 数组新增的 要看一下是不是对象，如果是对象，继续进行劫持 
        // 需要调用数组原生逻辑
        oldArrayPrototype[method].call(this, ...args); // todo 可以添加自己逻辑 函数劫持 切片

        let inserted = null;
        let ob = this.__ob__;

        switch (method) {
          case 'splice':
            //修改 删除 添加  arr.splice(1,0,24)
            inserted = args.slice(2); //splice方法从第三个参数起 是增添的新数据

            break;

          case 'push':
          case 'unshift':
            inserted = args; //调用push和unshift传递的参数就是新增的逻辑

            break;
        } // inserted[] 遍历数组，看一下对它是否需要进行二次劫持


        if (inserted) ob.observeArray(inserted);
      };
    });

    // 2. 每个原型上都有一个constructor属性指向函数本身 Function.prototype.constructor = Function

    class Observe {
      constructor(value) {
        // 不让 __ob__ 被遍历到，不然会爆栈
        // value.__ob__ = this; //我给对象和数组添加一个自定义属性 
        Object.defineProperty(value, '__ob__', {
          value: this,
          enumerable: false //标识这个属性不能被列举出来 不能被循环到

        });

        if (isArray(value)) {
          // 更改数组原型方法
          value.__proto__ = arrayMethods; //重写数组的方法

          this.observeArray(value);
        } else {
          this.walk(value); //核心就是循环对象
        }
      } //递归遍历数组，对数组内部的对象再次重写 [[]] [{}]


      observeArray(data) {
        data.forEach(item => observe(item)); //数组里面如果是引用类型那么是响应式的
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
          // 如果设置的是一个对象那么会再次进行劫持
          if (newValue === value) return;
          observe(newValue);
          value = newValue;
        }

      });
    }

    function observe(value) {
      // 如果value不是对象，则不用观测了
      if (!isObject(value)) {
        return;
      }

      if (value.__ob__) {
        return; //一个对象不需要重新被观测 
      } // 需要对对象进行观测，最外层必须是一个 { } 不能是数组
      // 如果一个数据已经被观测过了，就不要在进行观测了，用类来实现，我观测过就增加一个标识， 说明观测过了，在观测的时候可以先检测是否观测过，如果观测过了就跳过检测


      return new Observe(value);
    }

    function initState(vm) {
      const opts = vm.$options;

      if (opts.data) {
        initData(vm);
      }
    } // 取值的时候做代理 不是暴力的把_data属性赋予给vm,而且直接赋值会有命名冲突问题

    function proxy(vm, key, source) {
      Object.defineProperty(vm, key, {
        get() {
          return vm[source][key];
        },

        set(newValue) {
          vm[source][key] = newValue; //vm._data.message = newValue 这个 _data 就是传过来的值
        }

      });
    } // 数据的初始化


    function initData(vm) {
      // 用户传入的数据
      let data = vm.$options.data; // 如果用户传递的是一个函数，则取函数的返回值作为对象，如果就是对象那就直接使用这个对象
      // data 和 vm._data 引用的是同一个人， data 被劫持了， vm._data也被劫持
      // vm._data 是为了外面可以拿到

      data = vm._data = isFunction(data) ? data.call(vm) : data; // 需要将 data 变成响应式的 Object.defineProperty 重写data中的所有属性

      observe(data); //观测数据
      // vm.message = vm._data.message  _data就是一个字符串

      for (let key in data) {
        proxy(vm, key, "_data"); //代理vm上的取值和设置值 和 vm._data没关系了
      }

      data.arr.push(100);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        const vm = this; // 把用户的选项放到vm上，这样在其他方法中就可以获取到options了

        vm.$options = options; //为了后续扩展的方法都可以获取到 options 选项
        // options中是用户传入的数据 el data

        initState(vm);

        if (vm.$options.el) {
          // 要将数据挂载到页面上
          // 现在数据已经被劫持了 数据变化需要更新视图 diff算法更新需要更新的部分
          //vue -> template    jsx->(灵活)
          // vue3 template 写起来性能会更高一些 内部做了很多优化
          // template -> ast语法树 (用来描述语法的，描述语法本身的) -> 描述成一个树结构 -> 将代码重组js语法
          // 模板编译原理（把template模板编译成render函数 -> 虚拟DOM -> diff算法比对虚拟DOM ）
          // ast -> render返回 —> vnode ->生成真实dom
          //        更新的时候再次调用render -> 新的 vnode -> 新旧对比 -> 更新真实dom
          vm.$mount(vm.$options.el);
        }
      }; //new Vue({el})  new Vue().$mount()


      Vue.prototype.$mount = function (el) {
        const vm = this;
        const opts = vm.$options;
        el = document.querySelector(el); //获取真实的元素

        vm.$el = el; //页面真实元素
        //render > template > html

        if (!opts.render) {
          // 模板编译
          opts.template;

          let render = compileToFunction(el.outerHTML);
          opts.render = render;
        } // console.log(opts.render)

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
    // 5.observe 去观测data中的数据 和 vm 没关系，说明data已经变成了响应式
    // 6.vm上像取值也能取到data中的数据 vm._data = data 这样用户能取到data了
    // 7.用户觉得有点麻烦， vm.xxx => vm._data
    // 8.如果更新对象不存在的属性，会导致视图不更新，如果是数组更新索引和长度不会触发更新
    // 9.如果是替换成一个新对象，新对象会被劫持；如果是数组存放新内容 push unshift() 新增的内容也会被劫持 
    // 通过 __ob__ 进行标识这个对象被监控过，（在vue中被监控的对象身上都有一个__ob__属性）
    // 10.如果你想改索引，可以使用 $set方法，内部就是splice()
    // 如果有el需要挂载到页面上

    return Vue;

})));
//# sourceMappingURL=vue.js.map
