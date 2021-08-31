// 静态成员 在类中通过static修饰的属性或者方法 那么就是静态的属性或者静态的方法 也称之为 静态成员
// 静态成员在使用的时候是通过 类名. 的种种语法来调用的
(() => {
  class Person {
    //   类中默认有一个内置的name属性，所以写 name 会提示错误信息
    //  static 静态属性
    static name1: string = "chu";
    constructor(name: string) {
      //   this.name1 = name;
    }
    static sayHi() {
      console.log("hello");
    }
  }

  //实例化对象
  //   const person: Person = new Person("chu");
  //   console.log(person.name);
  //   person.sayHi();

  // 通过类名
  Person.name1 = "hello";
  Person.sayHi();
})();
