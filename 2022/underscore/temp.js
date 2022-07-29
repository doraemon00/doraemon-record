/* 函数也是一种对象 可以添加属性 */

// var _ = function(){}
//   _.value = 1;
//   _.log = function(){
//     return this.value + 1
//   }

//   console.log(_.value)
//   console.log(_.log())


// //instanceof
// function C(){}
// function D(){}

// var o = new C()
// console.log(o instanceof C) //true
// console.log(o instanceof D) //false



(function(){
  var root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this || {}

  var _ = function(obj) {
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
}

root._ = _;

_.log = function(){
  console.log(1)
}


})()








