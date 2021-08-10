import { isArray, isObject } from "../utils";
import { arrayMethods } from "./array";

class Observer {
  constructor(value) {
    //可以调用 __ob__ 是因为这里进行了设置
    // 不让__ob__ 被遍历到
    // value.__ob__ = this; // 我给对象和数组添加一个自定义属性
    Object.defineProperty(value, "__ob__", {
      value: this,
      enumerable: false, // 标识这个属性不能被列举出来，不能被循环到
    });

    // 数组的情况  改写数组的原型链
    if (isArray(value)) {
      value.__proto__ = arrayMethods; //重写数组的方法
    } else {
      //对象的情况
      // 核心就是循环对象
      this.walk(value);
    }
  }

  observeArray(data) {
    //递归遍历数组
    data.forEach((item) => observe(item));
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
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
    },
  });
}

export function observe(value) {
  // 如果不是对象就不用观测 写的有问题
  if (!isObject(value)) {
    return;
  }

  return new Observer(value);
}
