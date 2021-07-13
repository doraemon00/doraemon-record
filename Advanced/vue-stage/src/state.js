import { observe } from "./observe"; //rollup-plugin-node-resolve
import { isFunction } from "./utils";

export function initState(vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }
}

// 取值的时候做代理 不是暴力的把_data属性赋予给vm,而且直接赋值会有命名冲突问题
function proxy(vm, key, source) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue; //vm._data.message = newValue 这个 _data 就是传过来的值
    },
  });
}

// 数据的初始化
function initData(vm) {
  // 用户传入的数据
  let data = vm.$options.data;

  // 如果用户传递的是一个函数，则取函数的返回值作为对象，如果就是对象那就直接使用这个对象

  // data 和 vm._data 引用的是同一个人， data 被劫持了， vm._data也被劫持
  // vm._data 是为了外面可以拿到
  data = vm._data = isFunction(data) ? data.call(vm) : data;

  // 需要将 data 变成响应式的 Object.defineProperty 重写data中的所有属性
  observe(data); //观测数据

  // vm.message = vm._data.message  _data就是一个字符串
  for (let key in data) {
    proxy(vm, key, "_data"); //代理vm上的取值和设置值 和 vm._data没关系了
  }

  data.arr.push(100);
}
