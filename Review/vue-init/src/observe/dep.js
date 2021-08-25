let id = 0;

class Dep {
  constructor() {
    //要把watcher放到dep中
    this.subs = [];
    this.id = id++;
  }

  depend() {
    Dep.target.addDep(this); //在watcher中调用dep的addSub方法
  }
  //addSub为每个数据依赖收集器添加需要被监听的watcher
  addSub(watcher) {
      //将当前watcher添加到数据依赖收集器中
    this.subs.push(watcher); //让dep记住watcher
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

Dep.target = null;
export default Dep;
