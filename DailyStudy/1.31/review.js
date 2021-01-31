//防抖 ：在事件触发n秒后执行，如果在这n秒内又被触发，则重新计时
//节流 ：如果你持续触发事件，每隔一段时间，只执行一次

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
