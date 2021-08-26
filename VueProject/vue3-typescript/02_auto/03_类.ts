(() => {
  interface IPerson {
    firstName: string;
    lastName: string;
  }
  //定义一个类型
  class Person {
    firstName: string;
    lastName: string;
    fullName: string;

    // 定义一个构造器函数
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = this.firstName + this.lastName;
    }
  }

  function showFullName(person: IPerson) {
    return person.firstName + person.lastName;
  }

  const person = new Person("chu", "chuchu");
  console.log(showFullName(person));
})();
