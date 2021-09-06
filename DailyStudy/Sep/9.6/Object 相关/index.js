var obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

// es6解构
// var {a, d, e} = obj
// var obj2 = {a, d, e}
// console.log(obj2)

// const pick = (obj, arr) =>
//   //   arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
//   arr.reduce((iter, val) => {
//     if (val in obj) {
//       iter[val] = obj[val];
//     }
//     return iter;
//   }, {});

// let obj2 = pick(obj, ["a", "d", "e"]);
// console.log(obj2);


function extend(obj){
    var o = {}
    var attr = Array.prototype.slice.call(arguments).slice(1)

    attr.forEach((val,index)=>{
        if(val in obj){
            o[val] = obj[val]
        }
    })
    return o
}
console.log(extend(obj, 'c', 'b'));

