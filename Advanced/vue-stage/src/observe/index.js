import { isArray, isObject } from "../utils";
import { arrayMethods } from "./array";

// 1. 每个对象都有一个 __proto__ 属性，它指向所属类的原型 fn.__proto__ = Function.prototype
// 2. 每个原型上都有一个constructor属性指向函数本身 Function.prototype.constructor = Function



class Observe {
  constructor(value) {
    if (isArray(value)) {
        // 更改数组原型方法
        value.__proto__ = arrayMethods; //重写数组的方法
    } else {
      this.walk(value); //核心就是循环对象
    }
  }

  walk(data) {
    // 要使用 definePrototype 重新定义
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

// vue2 应用了defineProperty 需要一加载的时候就进行递归操作，所以耗性能，如果层次过深，也会浪费性能
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
    },
  });
}

export function observe(value) {
  // 如果value不是对象，则不用观测了
  if (!isObject(value)) {
    return;
  }

  // 需要对对象进行观测，最外层必须是一个 { } 不能是数组

  // 如果一个数据已经被观测过了，就不要在进行观测了，用类来实现，我观测过就增加一个标识， 说明观测过了，在观测的时候可以先检测是否观测过，如果观测过了就跳过检测

  return new Observe(value);
}
