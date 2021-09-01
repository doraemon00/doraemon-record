import { isArray, isObject } from "../utils";
import { arrayMethods } from "./array";
import Dep from "./dep";

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
      this.observeArray(value);
    } else {
      //对象的情况
      // 核心就是循环对象
      this.walk(value);
    }
  }

  observeArray(data) {
    //递归遍历数组 对数组内部的对象再次重写  [[]]  [{}]
    data.forEach((item) => observe(item));
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

//让数组里的引用类型都收集依赖   //[[[]],{}]
function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let current = value[i];
    //current 上如果有__ob__，说明是对象，就让dep收集依赖，（只有对象上才有__ob__）
    current.__ob__ && current.__ob__.dep.depend();
    //如果内部还是数组继续递归处理
    if (Array.isArray(current)) {
      dependArray(current);
    }
  }
}

function defineReactive(obj, key, value) {
  // 递归进行观测数据
  let childOb = observe(value);
  //childOb 如果有值 那么就是数组或者对象

  //每个属性都增加一个dep 闭包
  let dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        // 对象属性的依赖收集
        dep.depend();
        // 取属性的时候 会对对应的值（对象本身和数组）进行依赖收集
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
      observe(newValue);
      // console.log("修改");
      value = newValue;
      // 拿到当前的dep里面的watcher依次执行
      dep.notify();
    },
  });
}

export function observe(value) {
  // 如果不是对象就不用观测 写的有问题
  if (!isObject(value)) {
    return;
  }

  if (value.__ob__) {
    return; //一个对象不需要重新被观测
  }

  return new Observer(value);
}
