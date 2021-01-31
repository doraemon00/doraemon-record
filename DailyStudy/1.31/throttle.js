/**
 * 描述：节流 如果你持续触发事件，每隔一段时间，只执行一次事件
 */

function throttle(fn, delay) {
  let flag = true;
  return function (...args) {
    let context = this;
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, delay);
  };
}
