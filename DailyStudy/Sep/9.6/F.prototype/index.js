// let animal = {
//   eats: true,
// };

// function Rabbit(name) {
//   this.name = name;
// }

// Rabbit.prototype = animal; //rabbit.__proto__ == animal

// let rabbit = new Rabbit("chu");
// console.log(rabbit.eats);

// 每个函数都有 prototype 属性
// 默认的 prototype 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身
// function Rabbit() {}
// console.log(Rabbit.prototype.constructor == Rabbit); //true

// //通常，如果我们什么都不做，constructor 属性可以通过 [[Prototype]] 给所有 rabbits 使用：
// let rabbit = new Rabbit();
// console.log(rabbit.constructor == Rabbit); //true

// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };

// let rabbit = new Rabbit();

// Rabbit.prototype = {};
// console.log(Rabbit.prototype)
// alert( rabbit.eats ); // ?

function Rabbit() {}
Rabbit.prototype = {
  eats: true,
};

let rabbit1 = new Rabbit(); // 引用了上面的prototype

Rabbit.prototype = {
  eats: false,
};

let rabbit2 = new Rabbit(); // 引用了新定义的的prototype
delete Rabbit.prototype.eats; // 删除新定义的prototype的eats
console.log(rabbit1.eats); // 从之前引用的prototype取值 true
console.log(rabbit2.eats); // 从新的prototype取值 undefined


