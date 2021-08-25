import { nextTick } from "../utils";

let queue = []; //这里存放要更新的watcher
let has = {}; //用来存储已有的watcher的id

function flushScheduleQueue() {
  queue.forEach((watcher) => watcher.run());
  queue = [];
  has = {};
  pending = false;
}

let pending = false;
export function queueWatcher(watcher) {
  // 一般情况下 写去重 可以采用这种方式
  let id = watcher.id;
//   debugger
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
    if (!pending) {
      //防抖
      nextTick(flushScheduleQueue);
      pending = true;
    }
  }
}
