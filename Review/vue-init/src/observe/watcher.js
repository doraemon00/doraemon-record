import Dep from "./dep";
import { queueWatcher } from "./scheduler";
let id = 0;
class Watcher {
  constructor(vm, fn, cb, options) {
    this.vm = vm;
    this.fn = fn;
    this.cb = cb;
    this.options = options;
    this.id = id++;
    this.depsId = new Set();
    this.deps = [];
    /**
     * 因为fn就是vm._update(vm._render()) ,所以就是页面渲染。下面代码意思赋值并调用
     */
    this.getter = fn; // fn就是页面渲染逻辑
    this.get(); //表示上来后就做一次初始化
  }

  addDep(dep) {
    let did = dep.id;
    if (!this.depsId.has(did)) {
      this.depsId.add(did);
      this.deps.push(dep); //做了保存id的功能，并且让watcher记住dep
      dep.addSub(this);
    }
  }

  get() {
    Dep.target = this;
    this.getter();
    Dep.target = null;
  }

  // 每次更新数据都会同步调用这个 update 方法，我可以将更新的逻辑缓存起来，等同步更新数据的逻辑执行完毕后，依次调用（去重的逻辑）
  update() {
      console.log("缓存更新")
      queueWatcher(this)
    // console.log("update");
    // this.get();
  }

  run(){
      console.log("真正执行更新")
      this.get()
  }
}

export default Watcher;
