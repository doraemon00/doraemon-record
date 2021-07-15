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

    function patch(el, vnode) {
      // 删除老节点，根据vnode创建新节点，替换掉老节点
      const elm = createElm(vnode); //根据虚拟节点创造了真实节点

      const parentNode = el.parentNode;
      parentNode.insertBefore(elm, el.nextSibing); //el.nextSibing不存在就是null,如果为null，insertBefore 就是appendChild

      parentNode.removeChild(el); //返回最新节点

      return elm;
    } // 面试有问 虚拟节点的实现 -> 如何将虚拟节点渲染成真实节点

    function createElm(vnode) {
      let {
        tag,
        data,
        children,
        text,
        vm
      } = vnode; // 我们让虚拟节点和真实节点做一个映射关系，后续某个虚拟节点更新了，我们可以跟踪到真实节点，并且更新真实节点

      if (typeof tag === "string") {
        vnode.el = document.createElement(tag); // 如果有 data 属性，我们需要把data设置到元素上

        updateProperties(vnode.el, data);
        children.forEach(child => {
          vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(tag);
      }

      return vnode.el;
    } //后续写diff算法的时候 在进行完善, 没有考虑样式等


    function updateProperties(el, props = {}) {
      for (let key in props) {
        el.setAttribute(key, props[key]);
      }
    }

    function mountComponent(vm) {
      // debugger;
      vm._update(vm._render());
    }
    function lifeCycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        // 采用的是  先深度遍历 创建节点 （遇到节点就创造节点，递归创建）
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
      };
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
      } // data.arr.push(100);

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
        // 这里已经获取到了，一个 render函数的了
        // debugger


        mountComponent(vm);
      };
    }

    function createElement(vm, tag, data = {}, ...children) {
      //返回虚拟节点
      return vnode(vm, tag, data, children, data.key, undefined);
    }
    function createText(vm, text) {
      //返回虚拟节点
      return vnode(vm, undefined, undefined, undefined, undefined, undefined);
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
    } // vnode 其实就是一个对象，用来描述节点的，这个和ast区别是什么？
    // ast 描述语法的，他并没有用户自己的逻辑，只有语法解析出来的内容
    // vnode 他是描述dom结构的，可以自己去扩展属性

    function renderMixin(Vue) {
      Vue.prototype._c = function () {
        //createElement 创建元素型节点
        const vm = this;
        return createElement(vm, ...arguments);
      };

      Vue.prototype._v = function (text) {
        //创建文本的虚拟节点
        const vm = this;
        return createText(vm); //描述虚拟节点是属于哪个实例的
      };

      Vue.prototype._s = function (val) {
        //JSON.stringify()
        if (isObject(val)) return JSON.stringify(val);
        return val;
      };

      Vue.prototype._render = function () {
        const vm = this; //vm中有所有的数据

        let {
          render
        } = vm.$options;
        let vnode = render.call(vm);
        return vnode;
      };
    }

    function Vue(options) {
      // console.log(options) 
      // 实现vue的初始化功能
      this._init(options);
    }

    initMixin(Vue);
    renderMixin(Vue);
    lifeCycleMixin(Vue); // 导出Vue
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
