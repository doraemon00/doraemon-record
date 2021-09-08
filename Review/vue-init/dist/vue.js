(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

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

    let lifeCycle = ["beforeCreate", "created", "beforeMount", "mounted"]; // 创建各生命周期的合并策略

    lifeCycle.forEach(hook => {
      strats[hook] = function (parentVal, childVal) {
        // 儿子有值 需要进行合并
        if (childVal) {
          if (parentVal) {
            // 父 子 都有值 ，用父和子拼接在一起，所以父有值就一定是数组
            return parentVal.concat(childVal);
          } else {
            // 如果没值 就变成数组
            // 注意 如果传入的生命周期函数是数组，已经是数组无需在包装成数组
            if (isArray(childVal)) {
              return childVal;
            } else {
              return [childVal];
            }
          }
        } else {
          //儿子没有值 无需合并 直接返回父亲即可
          return parentVal;
        }
      };
    }); // parentVal 为函数，childVal 为对象

    strats.components = function (parentVal, childVal) {
      // 继承：子类可以沿着链找到父亲的属性 childVal.__proto__ = parentVal
      let res = Object.create(parentVal); //合并后产生一个新对象。不用原来的

      if (childVal) {
        for (let key in childVal) {
          res[key] = childVal[key];
        }
      }

      return res;
    };
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
      } // 合并当前key


      function mergeFiled(key) {
        // 设计模式 策略模式:获取当前key的合并策略 
        let strat = strats[key]; // debugger

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

    function makeMap(str) {
      let tagList = str.split(",");
      return function (tagName) {
        return tagList.includes(tagName);
      };
    }

    const isReservedTag = makeMap("template,script,style,element,content,slot,link,meta,svg,view,button," + "a,div,img,image,text,span,input,switch,textarea,spinner,select," + "slider,slider-neighbor,indicator,canvas," + "list,cell,header,loading,loading-indicator,refresh,scrollable,scroller," + "video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown");

    function initGlobalAPI(Vue) {
      // 全局属性 在每个组件初始化的时候 将这些属性放到每个组件上
      Vue.options = {}; //存放全局组件的

      Vue.options.components = {}; // Vue.component -> Vue.extend
      // 在任何地方访问 vm.$options._base 都可以拿到 Vue

      Vue.options._base = Vue; // 为 vue 添加 mixin 静态方法
      //  功能：存放mixin component filter directive 属性

      Vue.mixin = function (options) {
        this.options = mergeOptions(this.options, options);
        console.log("打印mixin合并后的options", this.options); //返回this 提供链式调用

        return this;
      };
      /**
       * 使用基础的Vue构造器 创造一个子类
       * @param {*} opt
       * @returns
       */


      Vue.extend = function (opt) {
        // 父类 Vue即当前this
        const Super = this; // 创建子类Sub

        const Sub = function (options) {
          //创造一个组件 其实就是new 这个组件的类（组件初始化）
          // 当new组件时，执行组件初始化
          this._init(options);
        }; // 子类继承父类


        Sub.prototype = Object.create(Super.prototype); //继承原型方法

        Sub.prototype.constructor = Sub; //Object.create 会产生一个新的实例作为子类的原型，此时 constructor 会指向错误

        Sub.options = mergeOptions(Super.options, opt); // Sub.mixin = Vue.mixin;

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
        definition.name = name; // 如果传入的是对象，使用Vue.extend进行一次处理

        if (isObject(definition)) {
          definition = Vue.extend(definition);
        } // 将 definition 对象保存到全局。Vue.options.components


        Vue.options.components[name] = definition;
        console.log(Vue.options.components);
      }; // Vue.filter = function (options) {};
      // Vue.directive = function (options) {};

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

    function createComponent$1(vm, tag, data, children, key, Ctor) {
      // console.log(vm, tag, data, children, "组件");
      if (isObject(Ctor)) {
        // 组件的定义一定是通过 Vue.extend 进行包裹的
        Ctor = vm.$options._base.extend(Ctor);
      }

      data.hook = {
        // 组件的生命周期
        init(vnode) {
          // vnode.componentInstance.$el -> 对应组件渲染完毕后的结果
          let child = vnode.componentInstance = new Ctor({}); //我想获取组件的真实dom

          child.$mount(); // 所以组件在走挂载的流程时 vm.$el 为null
          // mount挂载完毕后 会产生一个真实节点，这个节点在 vm.$el上-》 对应的就是组件的真实内容
        },

        prepatch() {},

        postpatch() {} ///


      }; // 每个组件 默认的名字内部都会给你拼接一下
      // componentOptions 存放了一个重要的属性 Ctor

      let componentVnode = vnode(vm, tag, data, undefined, key, undefined, {
        Ctor,
        children,
        tag
      });
      return componentVnode;
    } // 参数：_c('标签', {属性}, ...儿子)


    function createElement(vm, tag, data = {}, ...children) {
      // 返回虚拟节点 _c('',{}....)
      // 需要进行拓展  因为会传入自定义组件
      // 如何区分是组件还是元素节点
      if (!isReservedTag(tag)) {
        //组件
        // 获取组件的构造函数：之前已经保存到了全局 vm.$options.components 上
        let Ctor = vm.$options.components[tag]; //组件的初始化就是 new 组件的构造函数

        return createComponent$1(vm, tag, data, children, data.key, Ctor);
      } // 创建元素的虚拟节点


      return vnode(vm, tag, data, children, data.key, undefined);
    }
    function createText(vm, text) {
      // 返回虚拟节点
      return vnode(vm, undefined, undefined, undefined, undefined, text);
    }

    function vnode(vm, tag, data, children, key, text, options) {
      return {
        vm,
        tag,
        data,
        children,
        key,
        text,
        componentOptions: options
      };
    } // vnode 其实就是一个对象 用来描述节点的，这个和ast长的很像啊？
    // ast 描述语法的，他并没有用户自己的逻辑 , 只有语法解析出来的内容
    // vnode 他是描述dom结构的 可以自己去扩展属性

    /**
     * 判断两个虚拟节点是否是同一个虚拟节点
     * 逻辑 标签名与key都相同
     * @param {*} newVnode
     * @param {*} oldVnode
     * @returns
     */


    function isSameVnode(newVnode, oldVnode) {
      return newVnode.tag === oldVnode.tag && newVnode.key == oldVnode.key;
    }

    function patch(oldVnode, vnode) {
      console.log(oldVnode, vnode, "oldVnode"); //   之前少了这个步骤 导致bug 无法排查

      if (!oldVnode) {
        return createElm(vnode); //产生一个组件的真实节点
      }

      const isRealElement = oldVnode.nodeType;

      if (isRealElement) {
        // 删除老节点 根据vnode创建新节点，替换掉老节点
        const elm = createElm(vnode);
        const parentNode = oldVnode.parentNode;
        parentNode.insertBefore(elm, oldVnode.nextSibling);
        parentNode.removeChild(oldVnode);
        return elm; // 返回最新节点
      } else {
        // 不管怎么diff 最终想更新渲染 =》 dom操作里去
        // 只比较同级，如果不一样，儿子就不用比对了， 根据当前节点，创建儿子 全部替换掉
        // diff 算法如何实现？
        if (!isSameVnode(oldVnode, vnode)) {
          // 如果新旧节点 不是同一个，删除老的换成新的
          return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
        } // 文本直接更新即可，因为文本没有儿子


        let el = vnode.el = oldVnode.el; // 复用节点

        if (!oldVnode.tag) {
          // 文本了, 一个是文本 那么另一个一定也是文本
          if (oldVnode.text !== vnode.text) {
            return el.textContent = vnode.text;
          }
        } // 元素  新的虚拟节点


        updateProperties(vnode, oldVnode.data); // 是相同节点了，复用节点，在更新不一样的地方 （属性）
        // 比较儿子节点

        let oldChildren = oldVnode.children || [];
        let newChildren = vnode.children || []; // 情况1 ：老的有儿子 ， 新没儿子

        if (oldChildren.length > 0 && newChildren.length == 0) {
          el.innerHTML = ""; // 新的有儿子 老的没儿子 直接将新的插入即可
        } else if (newChildren.length > 0 && oldChildren.length == 0) {
          newChildren.forEach(child => el.appendChild(createElm(child)));
        } else {
          // 新老都有儿子
          updateChildren(el, oldChildren, newChildren);
        }

        return el;
      }
    }

    function updateChildren(el, oldChildren, newChildren) {
      // vue2中 如何做的diff算法
      // vue内部做了优化 （能尽量提升性能，如果实在不行，在暴力比对）
      // 1.在列表中新增和删除的情况
      let oldStartIndex = 0;
      let oldStartVnode = oldChildren[0];
      let oldEndIndex = oldChildren.length - 1;
      let oldEndVnode = oldChildren[oldEndIndex];
      let newStartIndex = 0;
      let newStartVnode = newChildren[0];
      let newEndIndex = newChildren.length - 1;
      let newEndVnode = newChildren[newEndIndex];

      function makeKeyByIndex(children) {
        let map = {};
        children.forEach((item, index) => {
          map[item.key] = index;
        });
        return map;
      }

      let mapping = makeKeyByIndex(oldChildren); // diff算法的复杂度 是O(n)  比对的时候 指针交叉的时候 就是比对完成了

      while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) {
          // 在指针移动的时候 可能元素已经被移动走了，那就跳过这一项
          oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) {
          oldEndVnode = oldChildren[--oldEndIndex];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
          // 头头比较
          patch(oldStartVnode, newStartVnode); // 会递归比较子节点，同时比对这两个人的差异

          oldStartVnode = oldChildren[++oldStartIndex];
          newStartVnode = newChildren[++newStartIndex];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          // 尾尾比较
          patch(oldEndVnode, newEndVnode);
          oldEndVnode = oldChildren[--oldEndIndex];
          newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          // 头尾
          patch(oldStartVnode, newEndVnode);
          el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
          oldStartVnode = oldChildren[++oldStartIndex];
          newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          // 尾头
          patch(oldEndVnode, newStartVnode);
          el.insertBefore(oldEndVnode.el, oldStartVnode.el); // 将尾部的插入到头部去

          oldEndVnode = oldChildren[--oldEndIndex];
          newStartVnode = newChildren[++newStartIndex];
        } else {
          // 之前的逻辑都是考虑 用户一些特殊情况，但是有非特殊的，乱序排
          let moveIndex = mapping[newStartVnode.key];

          if (moveIndex == undefined) {
            // 没有直接将节点插入到开头的前面
            el.insertBefore(createElm(newStartVnode), oldStartVnode.el);
          } else {
            // 有的话需要复用
            let moveVnode = oldChildren[moveIndex]; // 找到复用的那个人，将他移动到前面去

            patch(moveVnode, newStartVnode);
            el.insertBefore(moveVnode.el, oldStartVnode.el);
            oldChildren[moveIndex] = undefined; // 将移动的节点标记为空
          }

          newStartVnode = newChildren[++newStartIndex];
        }
      }

      if (newStartIndex <= newEndIndex) {
        // 新的多，那么就将多的插入进去即可
        // 如果下一个是null 就是appendChild
        let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el; // 参照物是固定的

        for (let i = newStartIndex; i <= newEndIndex; i++) {
          // 看一下 当前尾节点的下一个元素是否存在，如果存在则是插入到下一个元素的前面
          // 这里可能是向前追加 可能是像后追加
          el.insertBefore(createElm(newChildren[i]), anchor);
        }
      }

      if (oldStartIndex <= oldEndIndex) {
        // 老的多余的  ,需要清理掉，直接删除即可
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          let child = oldChildren[i]; // 因为child可能是undefined 所有要跳过空间点

          child && el.removeChild(child.el);
        }
      }
    } // 给组件预留了 一个初始化流程 init


    function createComponent(vnode) {
      let i = vnode.data;

      if ((i = i.hook) && (i = i.init)) {
        i(vnode);
      }

      if (vnode.componentInstance) {
        // 说明是组件
        return true;
      }
    }

    function createElm(vnode) {
      let {
        tag,
        data,
        children,
        text,
        vm
      } = vnode;

      if (typeof tag === "string") {
        if (createComponent(vnode)) {
          //返回一个组件的真实节点
          return vnode.componentInstance.$el; // 对应的就是真实节点
        } // 先创建 id app


        vnode.el = document.createElement(tag);
        updateProperties(vnode, data); //再去查找 id app 的儿子 对儿子进行创建

        children.forEach(child => {
          vnode.el.appendChild(createElm(child)); //有创建组件和元素的功能
        });
      } else {
        //   创建文本的真实节点
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function updateProperties(vnode, oldProps = {}) {
      // 这里的逻辑 可能是初次渲染，初次渲染 直接 用oldProps 给vnode的el赋值即可
      // 更新逻辑 拿到老的props 和 vnode里面的data进行比对
      let el = vnode.el; // dom真实的节点

      let newProps = vnode.data || {}; // 新旧比对， 两个对象如何比对差异？

      let newStyle = newProps.style || {};
      let oldStyle = oldProps.style || {};

      for (let key in oldStyle) {
        // 老的样式有 新的没有，就把页面上的样式删除掉
        if (!newStyle[key]) {
          el.style[key] = "";
        }
      }

      for (let key in newProps) {
        //  直接用新的改掉老的就可以了
        // 如果前后一样，浏览器会去检测
        if (key == "style") {
          for (let key in newStyle) {
            // {style:{color:red}}
            el.style[key] = newStyle[key];
          }
        } else {
          el.setAttribute(key, newProps[key]);
        }
      }

      for (let key in oldProps) {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
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
        const vm = this; // vm.$el = patch(vm.$el, vnode);

        let preVnode = vm._prevVnode; // 第一次渲染 是根据虚拟节点 生成真实节点，替换掉原来的节点

        vm._prevVnode = vnode; // 如果是第二次 生成一个新得虚拟节点 ，和老的虚拟节点进行对比

        if (!preVnode) {
          // 没有节点就是初次渲染
          vm.$el = patch(vm.$el, vnode);
        } else {
          vm.$el = patch(preVnode, vnode);
        }
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
        // 因为全局定义的内容会混合在当前的实例上 
        // debugger

        vm.$options = mergeOptions(vm.constructor.options, options);
        console.log(vm.$options); // 传入数据 对数据进行操作

        initState(vm);

        if (vm.$options.el) {
          // 将数据挂载到页面上（此时 数据已经被劫持）
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
    // 2. 组件初始化的时候，会做一个合并 mergerOptions （自己的组件.__proto__ = 全局的组件）
    // 3. 内部会对模板进行编译操作， _c('组件的名字') 做筛查，如果是组件就创造一个组件的虚拟节点，还会判断Ctor ，如果是对象会调用Vue.extend ，所有的组件都是通过 Vue.extend 方法来实现的 （componentOptions 里面放着组件的所有内容，属性的实现，事件的实现，插槽的内容，Ctor）
    // 4.创建组件的真实节点（new Ctor 拿到组件的实例，并且调用组件的$mount 方法（会生成一个$el对应组件模板渲染后的结果）） vnode.componentInstance = new Ctor() vnode.componentInstance.$el => 组件渲染后的结果
    // 5.将组件的vnode.componentInstance.$el 插入到父标签中
    // 6.组件在 new Ctor() 时会进行组件的初始化，给组件再次添加一个独立的渲染 watcher (每个组件都有自己的watcher),更新时，只需要更新自己组件对应的渲染watcher (因为组件渲染时，组件对应的属性会收集自己的渲染watcher)

    return Vue;

})));
//# sourceMappingURL=vue.js.map
