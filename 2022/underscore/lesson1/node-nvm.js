var vm = require('vm')
var util = require('util')

var window = {
  p:2,
  vm:vm,
  console:console,
  require : require,
}

var p = 5
global.p = 11

vm.createContext(window)

// global is not defined
vm.runInContext('p = 3;console.log(global);', window)






