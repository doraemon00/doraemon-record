import { observe } from "./observe"; // rollup-plugin-node-resolve
import { isFunction } from "./utils.js";

export function initState(vm) {
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
    },
  });
}

function initData(vm) {
  let data = vm.$options.data;

  // 这一步 把 data 也放在vm 上了
  data = vm._data = isFunction(data) ? data.call(vm) : data;

  //   需要将 data 变成响应式的
  observe(data);

  for(let key in data){
    proxy(vm,key,'_data')
  }

  // console.log(data)
  // data.arr.push(100);
}
