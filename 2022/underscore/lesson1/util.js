(function(){
  // var root = this
  /* 兼容浏览器和node和环境以及web worker 和 小程序 */
  var root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this || {}


  // var _ = {}
  /* 因为可以使用对象风格，所以 _ 应该不是一个对象，而是一个函数 */
  // var _  = function(){}  

  /* 这个对象，如何调用挂在 _函数上的方法呢？ */
  var _ = function (){
    
  }

  root._ = _
  _.reverse = function(string){
    return string.split('').reverse().join('')
  }
})()


let res = _.reverse('abc')
console.log(res)



// console.log(window.window)
// console.log(window.self)