// 存取器 让我们可以有效的控制 对象中的成员的访问 通过 getters 和 setters 来进行操作

(() => {
  class Person {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    // 读取器
    get fullName() {
      return this.firstName + this.lastName;
    }

    // 设置器
    set fullName(val) {
      console.log("set 中");
      let names = val.split("_");
      this.firstName = names[0];
      this.lastName = names[1];
    }
  }

  const person: Person = new Person("chu", "chu");
  console.log(person);
})();
