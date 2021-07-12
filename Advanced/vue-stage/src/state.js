import { observe } from "./observe"; //rollup-plugin-node-resolve
import { isFunction } from "./utils";

export function initState(vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }
}

// 数据的初始化
function initData(vm) {
  // 用户传入的数据
  let data = vm.$options.data;

  // 如果用户传递的是一个函数，则取函数的返回值作为对象，如果就是对象那就直接使用这个对象
  data = isFunction(data) ? data.call(vm) : data;

  // 需要将 data 变成响应式的 Object.defineProperty 重写data中的所有属性
  observe(data); //观测数据
  
  console.log(data);
}
