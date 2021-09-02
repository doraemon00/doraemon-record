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
  let callbacks = [];
  let waiting = false;

  function flushCallbacks() {
    callbacks.forEach(fn => fn());
    callbacks = [];
    waiting = false;
  }

  function nextTick(fn) {
    callbacks.push(fn);

    if (!waiting) {
      Promise.resolve().then(flushCallbacks);
      waiting = true;
    }
  } // export function nextTick(fn) {
  //   return Promise.resolve().then(fn);
  // }

  /**
   * 生命周期的合并策略
   * @param {*} parentVal
   * @param {*} childVal
   * @returns
   */

  let strats = {}; //存放所有策略

  let lifeCycle = ["beforeCreate", "created", "beforeMount", "mounted"];
  lifeCycle.forEach(hook => {
    strats[hook] = function (parentVal, childVal) {
      // 儿子有值 需要进行合并
      if (childVal) {
        if (parentVal) {
          // 父 子 都有值 ，用父和子拼接在一起，所以父有值就一定是数组
          return parentVal.concat(childVal);
        } else {
          // 如果没值 就变成数组
          return [childVal];
        }
      } else {
        //儿子没有值 无需合并 直接返回父亲即可
        return parentVal;
      }
    };
  });
  /**
   * 对象合并 将 childVal合并到 parentVal 中
   * @param {*} parentVal
   * @param {*} childVal
   */

  function mergeOptions(parentVal, childVal) {
    let options = {};

    for (let key in parentVal) {
      mergeFiled(key);
    }

    for (let key in childVal) {
      // 当新值存在，老值不存在时，添加到老值中
      if (!parentVal.hasOwnProperty(key)) {
        mergeFiled(key);
      }
    }

    function mergeFiled(key) {
      // 设计模式 策略模式
      let strat = strats[key];

      if (strat) {
        // 合并两个值
        options[key] = strat(parentVal[key], childVal[key]);
      } else {
        // 默认合并方法，优先使用新值覆盖老值
        options[key] = childVal[key] || parentVal[key];
      }
    }

    return options;
  } // console.log(mergeOptions({a:1},{b:1,a:2}))

  function initGlobalAPI(Vue) {
    // 全局属性 在每个组件初始化的时候 将这些属性放到每个组件上
    Vue.options = {}; // 为 vue 添加 mixin 静态方法
    //  功能：存放mixin component filter directive 属性

    Vue.mixin = function (options) {
      this.options = mergeOptions(this.options, options);
      console.log("打印mixin合并后的options", this.options); //返回this 提供链式调用

      return this;
    };

    Vue.component = function (options) {};

    Vue.filter = function (options) {};

    Vue.directive = function (options) {};
  }

  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{   xxx  }}  

  function genProps(attrs) {
    // {key:value,key:value,}
    let str = '';

    for (let i = 0; i < attrs.length; i++) {
      let attr = attrs[i];

      if (attr.name === 'style') {
        // {name:id,value:'app'}
        let styles = {};
        attr.value.replace(/([^;:]+):([^;:]+)/g, function () {
          styles[arguments[1]] = arguments[2];
        });
        attr.value = styles;
      }

      str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }

    return `{${str.slice(0, -1)}}`;
  }

  function gen(el) {
    if (el.type == 1) {
      return generate(el); // 如果是元素就递归的生成
    } else {
      let text = el.text; // {{}}

      if (!defaultTagRE.test(text)) return `_v('${text}')`; // 说明就是普通文本
      // 说明有表达式 我需要 做一个表达式和普通值的拼接 ['aaaa',_s(name),'bbb'].join('+)
      // _v('aaaa'+_s(name) + 'bbb')

      let lastIndex = defaultTagRE.lastIndex = 0;
      let tokens = []; // <div> aaa{{bbb}} aaa </div>

      let match; // ，每次匹配的时候 lastIndex 会自动向后移动

      while (match = defaultTagRE.exec(text)) {
        // 如果正则 + g 配合exec 就会有一个问题 lastIndex的问题
        let index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push(`_s(${match[1].trim()})`);
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return `_v(${tokens.join('+')})`; // webpack 源码 css-loader  图片处理
    }
  }

  function genChildren(el) {
    let children = el.children;

    if (children) {
      return children.map(item => gen(item)).join(',');
    }

    return false;
  } // _c(div,{},c1,c2,c3,c4)


  function generate(ast) {
    let children = genChildren(ast);
    let code = `_c('${ast.tag}',${ast.attrs.length ? genProps(ast.attrs) : 'undefined'}${children ? `,${children}` : ''})`;
    return code;
  }

  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 匹配标签名的  aa-xxx

  const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  aa:aa-xxx  

  const startTagOpen = new RegExp(`^<${qnameCapture}`); //  此正则可以匹配到标签名 匹配到结果的第一个(索引第一个) [1]

  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>  [1]

  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
  // [1]属性的key   [3] || [4] ||[5] 属性的值  a=1  a='1'  a=""

  const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的  />    > 
  // vue3的编译原理比vue2里好很多，没有这么多正则了

  function parserHTML(html) {
    // 可以不停的截取模板，直到把模板全部解析完毕 
    let stack = [];
    let root = null; // 我要构建父子关系  

    function createASTElement(tag, attrs, parent = null) {
      return {
        tag,
        type: 1,
        // 元素
        children: [],
        parent,
        attrs
      };
    }

    function start(tag, attrs) {
      // [div,p]
      // 遇到开始标签 就取栈中的最后一个作为父节点
      let parent = stack[stack.length - 1];
      let element = createASTElement(tag, attrs, parent);

      if (root == null) {
        // 说明当前节点就是根节点
        root = element;
      }

      if (parent) {
        element.parent = parent; // 跟新p的parent属性 指向parent

        parent.children.push(element);
      }

      stack.push(element);
    }

    function end(tagName) {
      let endTag = stack.pop();

      if (endTag.tag != tagName) {
        console.log('标签出错');
      }
    }

    function text(chars) {
      let parent = stack[stack.length - 1];
      chars = chars.replace(/\s/g, "");

      if (chars) {
        parent.children.push({
          type: 2,
          text: chars
        });
      }
    }

    function advance(len) {
      html = html.substring(len);
    }

    function parseStartTag() {
      const start = html.match(startTagOpen); // 4.30 继续

      if (start) {
        const match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);
        let end;
        let attr;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 1要有属性 2，不能为开始的结束标签 <div>
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        } // <div id="app" a=1 b=2 >


        if (end) {
          advance(end[0].length);
        }

        return match;
      }

      return false;
    }

    while (html) {
      // 解析标签和文本   
      let index = html.indexOf('<');

      if (index == 0) {
        // 解析开始标签 并且把属性也解析出来  </div>
        const startTagMatch = parseStartTag();

        if (startTagMatch) {
          // 开始标签
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        let endTagMatch;

        if (endTagMatch = html.match(endTag)) {
          // 结束标签
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
          continue;
        }
      } // 文本


      if (index > 0) {
        // 文本
        let chars = html.substring(0, index); //<div></div>

        text(chars);
        advance(chars.length);
      }
    }

    return root;
  } //  <div id="app">hello wolrd <span>hello</span></div> */}

  function compileToFunction(template) {
    // 1.将模板变成ast语法树
    let ast = parserHTML(template); // 代码优化 标记静态节点
    // 2.代码生成

    let code = generate(ast); // 模板引擎的实现原理 都是 new Function + with  ejs jade handlerbar...

    let render = new Function(`with(this){return ${code}}`);
    return render; // 1.编译原理
    // 2.响应式原理 依赖收集
    // 3.组件化开发 （贯穿了vue的流程）
    // 4.diff算法 
  }

  let id$1 = 0;

  class Dep {
    constructor() {
      //要把watcher放到dep中
      this.subs = [];
      this.id = id$1++;
    }

    depend() {
      Dep.target.addDep(this); //在watcher中调用dep的addSub方法
    } //addSub为每个数据依赖收集器添加需要被监听的watcher


    addSub(watcher) {
      //将当前watcher添加到数据依赖收集器中
      this.subs.push(watcher); //让dep记住watcher
    }

    notify() {
      this.subs.forEach(watcher => watcher.update());
    }

  }

  Dep.target = null;

  let queue = []; //这里存放要更新的watcher

  let has = {}; //用来存储已有的watcher的id

  function flushScheduleQueue() {
    queue.forEach(watcher => watcher.run());
    queue = [];
    has = {};
    pending = false;
  }

  let pending = false;
  function queueWatcher(watcher) {
    // 一般情况下 写去重 可以采用这种方式
    let id = watcher.id; //   debugger

    if (has[id] == null) {
      has[id] = true;
      queue.push(watcher);

      if (!pending) {
        //防抖
        nextTick(flushScheduleQueue);
        pending = true;
      }
    }
  }

  let id = 0;

  class Watcher {
    constructor(vm, fn, cb, options) {
      this.vm = vm;
      this.fn = fn;
      this.cb = cb;
      this.options = options;
      this.id = id++;
      this.depsId = new Set();
      this.deps = [];
      /**
       * 因为fn就是vm._update(vm._render()) ,所以就是页面渲染。下面代码意思赋值并调用
       */

      this.getter = fn; // fn就是页面渲染逻辑

      this.get(); //表示上来后就做一次初始化
    }

    addDep(dep) {
      let did = dep.id;

      if (!this.depsId.has(did)) {
        this.depsId.add(did);
        this.deps.push(dep); //做了保存id的功能，并且让watcher记住dep

        dep.addSub(this);
      }
    }

    get() {
      Dep.target = this;
      this.getter();
      Dep.target = null;
    } // 每次更新数据都会同步调用这个 update 方法，我可以将更新的逻辑缓存起来，等同步更新数据的逻辑执行完毕后，依次调用（去重的逻辑）


    update() {
      console.log("缓存更新");
      queueWatcher(this); // console.log("update");
      // this.get();
    }

    run() {
      console.log("真正执行更新");
      this.get();
    }

  }

  function patch(el, vnode) {
    const elm = createElm(vnode);
    const parentNode = el.parentNode;
    parentNode.insertBefore(elm, el.nextSibling);
    parentNode.removeChild(el); //返回最新节点

    return elm;
  }

  function createElm(vnode) {
    let {
      tag,
      data,
      children,
      text,
      vm
    } = vnode; //我们让虚拟节点和真实节点做一个映射关系，后续某个虚拟节点更新了 我可以跟踪到真实节点，并且更新真实节点

    if (typeof tag === "string") {
      vnode.el = document.createElement(tag); //如果有data属性，我们需要把data设置到元素上

      updateProperties(vnode.el, data);
      children.forEach(child => {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(el, props = {}) {
    for (let key in props) {
      el.setAttribute(key, props[key]);
    }
  }

  function mountComponent(vm) {
    //初始化流程
    let updateComponent = () => {
      vm._update(vm._render());
    }; //每个组件都有一个 watcher 我们把这个watcher称之为渲染watcher


    callHook(vm, "beforeCreate");
    new Watcher(vm, updateComponent, () => {
      console.log("后续增添更新钩子函数 update");
      callHook(vm, "created");
    }, true);
    callHook(vm, "mounted");
  }
  function lifeCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      //采用的是 先序深度遍历 创建节点（遇到节点就创造节点，递归创建）
      const vm = this;
      vm.$el = patch(vm.$el, vnode);
    };
  }
  function callHook(vm, hook) {
    let handlers = vm.$options[hook];

    if (handlers) {
      handlers && handlers.forEach(fn => {
        //生命周期的 this 永远指向实例
        fn.call(vm);
      });
    }
  }

  let oldArrayPrototype = Array.prototype; //让arrayMethods可以通过__proto__ 获取到数组的方法

  let arrayMethods = Object.create(oldArrayPrototype); //只有这7个方法可以导致数组发生变化

  let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];
  methods.forEach(method => {
    arrayMethods[method] = function (...args) {
      console.log("数组的方法进行重写操作"); //数组 新增的属性 要看一下是不是对象，如果是对象，继续进行劫持

      oldArrayPrototype[method].call(this, ...args); // 通过__ob__ 进行标识这个对象被监控过  （在vue中被监控的对象身上都有一个__ob__ 这个属性）

      let inserted = null; //

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


      if (inserted) ob.observeArray(inserted); // 通过 ob 拿到dep，调用notify 触发watcher 做视图更新

      ob.dep.notify();
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

  } //让数组里的引用类型都收集依赖   //[[[]],{}]


  function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
      let current = value[i]; //current 上如果有__ob__，说明是对象，就让dep收集依赖，（只有对象上才有__ob__）

      current.__ob__ && current.__ob__.dep.depend(); //如果内部还是数组继续递归处理

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function defineReactive(obj, key, value) {
    // 递归进行观测数据
    let childOb = observe(value); //childOb 如果有值 那么就是数组或者对象
    //每个属性都增加一个dep 闭包

    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) {
          // 对象属性的依赖收集
          dep.depend(); // 取属性的时候 会对对应的值（对象本身和数组）进行依赖收集

          if (childOb) {
            // 让数组和对象也记住当前的watcher
            childOb.dep.depend();

            if (Array.isArray(value)) {
              //可能是数组套数组的可能
              dependArray(value);
            }
          }
        }

        return value;
      },

      set(newValue) {
        if (newValue === value) return;
        observe(newValue); // console.log("修改");

        value = newValue; // 拿到当前的dep里面的watcher依次执行

        dep.notify();
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
      const vm = this; // 此时需要使用 options 与 mixin 合并后的全局 options 在进行一次合并
      // vm.$options = options;

      vm.$options = mergeOptions(vm.constructor.options, options); // 传入数据 对数据进行操作

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
      //这里已经获取到了一个 render 函数


      mountComponent(vm);
    };

    Vue.prototype.$nextTick = nextTick;
  }

  function createElement(vm, tag, data = {}, ...children) {
    // 返回虚拟节点 _c('',{}....)
    return vnode(vm, tag, data, children, data.key, undefined);
  }
  function createText(vm, text) {
    // 返回虚拟节点
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, children, key, text) {
    return {
      vm,
      tag,
      data,
      children,
      key,
      text
    };
  } // vnode 其实就是一个对象 用来描述节点的，这个和ast长的很像啊？
  // ast 描述语法的，他并没有用户自己的逻辑 , 只有语法解析出来的内容
  // vnode 他是描述dom结构的 可以自己去扩展属性

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      // createElement 创建元素型的节点
      const vm = this;
      return createElement(vm, ...arguments);
    };

    Vue.prototype._v = function (text) {
      // 创建文本的虚拟节点
      const vm = this;
      return createText(vm, text); // 描述虚拟节点是属于哪个实例的
    };

    Vue.prototype._s = function (val) {
      // JSON.stingfiy()
      if (isObject(val)) return JSON.stringify(val);
      return val;
    };

    Vue.prototype._render = function () {
      const vm = this; // vm中有所有的数据 vm.xxx => vm._data.xxx

      let {
        render
      } = vm.$options;
      let vnode = render.call(vm);
      return vnode;
    };
  }

  function Vue(options) {
    //这里调用原型上挂载的方法
    this._init(options);
  } //只是把方法挂载到原型上去了 此处并没有执行


  initMixin(Vue);
  renderMixin(Vue);
  lifeCycleMixin(Vue);
  initGlobalAPI(Vue); //初始化global Api

  return Vue;

})));
//# sourceMappingURL=vue.js.map
