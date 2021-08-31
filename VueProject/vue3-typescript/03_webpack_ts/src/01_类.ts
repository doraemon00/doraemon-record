// 类：可以理解为模板，通过模板可以实例化对象

(() => {
  class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    sayHi(str: string) {
      console.log(`大家好我是扫地僧`, str);
    }
  }

  const person = new Person('chu',18);
  person.sayHi("你叫啥");
})();
