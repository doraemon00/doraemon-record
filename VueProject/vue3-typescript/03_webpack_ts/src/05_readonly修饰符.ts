// 首先是一个关键字，对类中的属性成员进行修饰，修饰符后，该属性成员就不能在外部被随意修改
// 构造函数中 可以对只读的属性成员的数据进行修改
(() => {
  class Person {
    readonly name: string;
    constructor(name: string) {
      this.name = name;
    }
    sayHi() {
      console.log(this.name);
      //   类中的普通方法中 也是不能修改 readonly
    //   this.name = "change";
    }
  }
  // 实例化对象
  const person: Person = new Person("小甜甜");
  console.log(person.name);
  //   name 是只读的
  //   person.name = "change";
  //   console.log(person.name);
})();
