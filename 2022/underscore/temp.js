/* 函数也是一种对象 可以添加属性 */

var _ = function(){}
  _.value = 1;
  _.log = function(){
    return this.value + 1
  }

  console.log(_.value)
  console.log(_.log())



