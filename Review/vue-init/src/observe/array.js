let oldArrayPrototype = Array.prototype;
//让arrayMethods可以通过__proto__ 获取到数组的方法
export let arrayMethods = Object.create(oldArrayPrototype);

//只有这7个方法可以导致数组发生变化
let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    console.log("数组的方法进行重写操作");
    //数组 新增的属性 要看一下是不是对象，如果是对象，继续进行劫持
    oldArrayPrototype[method].call(this, ...args);

    // 通过__ob__ 进行标识这个对象被监控过  （在vue中被监控的对象身上都有一个__ob__ 这个属性）

    let inserted = null;
    let ob = this.__ob__;
    switch (method) {
      case "splice":
        inserted = args.slice(2);
        break;
      case "push":
      case "unshift":
        inserted = args;
        break;
    }
    // 看一下新增的属性是不是对象， 看是否需要进行劫持
    if (inserted) ob.observeArray(inserted);
  };
});
