import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifeCycle";
import { renderMixin } from "./render";

function Vue(options) {
  //这里调用原型上挂载的方法
  this._init(options);
}

//只是把方法挂载到原型上去了 此处并没有执行
initMixin(Vue);
renderMixin(Vue)
lifeCycleMixin(Vue)



// 导出Vue
export default Vue;
