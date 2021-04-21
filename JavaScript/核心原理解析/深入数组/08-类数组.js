// function foo(name,age,sex){
//     console.log(arguments)
// }
// foo('jack')

// var elem1, elem2;
// // document.forms 是一个 HTMLCollection
// elem1 = document.forms[0];
// elem2 = document.forms.item(0);
// console.log(elem1);
// console.log(elem2);
// console.log(typeof elem1);
// console.log(Object.prototype.toString.call(elem1));

// var list = document.querySelectorAll('input[type=checkbox]');
// for (var checkbox of list) {
//   checkbox.checked = true;
// }
// console.log(list);
// console.log(typeof list);
// console.log(Object.prototype.toString.call(list));

// function add() {
//   var sum = 0;
//   len = arguments.length;
//   for (var i = 0; i < len; i++) {
//     sum += arguments[i];
//   }
//   return sum;
// }

// add(1, 2, 3);

// var arr = [1,2,3,4]
// var res = Array.prototype.slice.call(arr,1)
// console.log(res)

// function myConcat(separa) {
//   var args = Array.prototype.slice.call(arguments, 1);
//   return args.join(separa);
// }


// myConcat(", ", "red", "orange", "blue");  //red, orange, blue 

function foo(){
    bar.apply(this,arguments)
}
function bar(a,b,c){
    console.log(a,b,c)
}

foo(1,2,3)   //1 2 3








