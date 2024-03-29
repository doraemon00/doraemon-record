export function isFunction(val) {
  return typeof val == "function";
}

export function isObject(val) {
  return typeof val == "object" && val !== null;
}

export let isArray = Array.isArray;

let callbacks = [];
let waiting = false;
function flushCallbacks() {
  callbacks.forEach((fn) => fn());
  callbacks = [];
  waiting = false;
}
export function nextTick(fn) {
  callbacks.push(fn);
  if (!waiting) {
    Promise.resolve().then(flushCallbacks);
    waiting = true;
  }
}

// export function nextTick(fn) {
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

// 创建各生命周期的合并策略
lifeCycle.forEach((hook) => {
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
});

// parentVal 为函数，childVal 为对象
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
export function mergeOptions(parentVal, childVal) {
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

  // 合并当前key
  function mergeFiled(key) {
    // 设计模式 策略模式:获取当前key的合并策略 
    let strat = strats[key];
    // debugger
    if (strat) {
      // 合并两个值
      options[key] = strat(parentVal[key], childVal[key]);
    } else {
      // 默认合并方法，优先使用新值覆盖老值
      options[key] = childVal[key] || parentVal[key];
    }
  }
  return options;
}

// console.log(mergeOptions({a:1},{b:1,a:2}))

function makeMap(str) {
  let tagList = str.split(",");
  return function (tagName) {
    return tagList.includes(tagName);
  };
}

export const isReservedTag = makeMap(
  "template,script,style,element,content,slot,link,meta,svg,view,button," +
    "a,div,img,image,text,span,input,switch,textarea,spinner,select," +
    "slider,slider-neighbor,indicator,canvas," +
    "list,cell,header,loading,loading-indicator,refresh,scrollable,scroller," +
    "video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown"
);
