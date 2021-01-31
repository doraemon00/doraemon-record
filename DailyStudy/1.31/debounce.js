/**
 * 描述：防抖 在事件触发n秒后执行，如果在这n秒内又被触发，则重新计时
 */

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}


