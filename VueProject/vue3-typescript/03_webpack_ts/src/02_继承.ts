//继承 ：类与类之间的关系
// A类继承了B这个类，那么此时A类叫子类，B类叫基类
// 子类 --- 派生类
// 基类 --- 超类（父类）
(() => {
  class Person {
    name: string;
    age: number;
    gender: string;
    constructor(name: string, age: number, gender: string) {
      this.name = name;
      this.age = age;
      this.gender = this.gender;
    }

    sayHi(str: string) {
      console.log(`我是${this.name},${str}`);
    }
  }

  //   定义一个类 继承自 Person
  class Student extends Person {
    constructor(name: string, age: number, gender: string) {
      // 调用的是父类中的构造函数 使用super
      super(name, age, gender);
    }

    //可以调用父类中的方法
    sayHi() {
      console.log("我是学生类中的sayHi");
      super.sayHi("chu");
    }
  }

  //   实例化 Person
  const person = new Person("大明明", 89, "男");
  person.sayHi("嘎嘎");

  const stu = new Student("小甜甜", 16, "女");
  stu.sayHi();

  //总结 类和类之间如果有继承关系，需要使用 extends 关键字
  //子类中可以调用父类中的构造函数，使用的是super关键字
  //子类中可以重写父类的方法
})();
