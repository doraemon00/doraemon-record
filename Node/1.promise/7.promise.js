// 1.then 方法中 成功的回调或者失败的回调返回的是一个promise，那么会采用返回的promise的状态，走外层下一次then中的成功或失败，同时将promise处理后的结果向下传递
// 2.then方法中 成功的回调或者失败的回调返回的是一个普通值（不是promise）,这里会将返回的结果传递到下一次then的成功中去
