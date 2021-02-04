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
