import { inBrowser } from './env'

export let mark
export let measure

/**
 * 首先判断环境，如果不是生产环境，则继续，否则什么都不做
 * 如果是生产环境，那么这个文件导出的两个变量，都是 undefined
 */


if (process.env.NODE_ENV !== 'production') {
  //确定 performance 的接口可以用（需要浏览器支持）
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    //mark函数作用使用给定的tag通过 performance.mark()方法打上一个标记
    //mark 函数与 measure函数就是对performance.mark() 和 performance.measure() 的封装
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      // perf.clearMeasures(name)
    }
  }
}
