// const person = {
//     isHuman:false,
//     print(){
//         console.log(this.isHuman)
//     }
// }
// const me = Object.create(person)
// me.name = "chu"
// me.isHuman = true
// me.print()

/**
 * Object.create 实现类式继承
 */

function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.log("shape moved");
};

// 子类
function Rectangle() {
  Shape.call(this);
}

// 子类继承父类
Rectangle.prototype = Object.create(Shape.prototype);
// Rectangle.prototype.constructor = Rectangle  //如果不加上这个会导致子类 constructor 指向错误

var rect = new Rectangle();

console.log(Rectangle.prototype.constructor === Shape); //true
