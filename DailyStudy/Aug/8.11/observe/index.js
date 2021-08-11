class Observer {
  constructor(value) {
    if (Array.isArray(value)) {
      //数组处理...
    } else {
      this.walk(value);
    }
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      // 要使用defineProperty重新定义
      defineReactive(data, key, data[key]);
    });
  }
}

// 使一个对象转化为可观测对象
function defineReactive(obj, key, value) {
  // 递归观测数据
  observe(value);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`${key}属性被读取了`);
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      observe(newVal);
      console.log(`${key}属性被修改了`);
      value = newVal;
    },
  });
}

function observe(value) {
  // debugger
  // 如果不是对象 直接return
  if (!isObject(value)) return;

  return new Observer(value);
}

function isObject(val) {
  return typeof val == "object" && val !== null;
}
