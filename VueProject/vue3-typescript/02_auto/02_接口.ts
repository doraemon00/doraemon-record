//接口

(() => {
  interface IPerson {
    firstName: string;
    lastName: string;
  }

  function showFullName(person: IPerson) {
    return person.firstName + person.lastName;
  }

  // 定义一个对象
  const person = {
    firstName: "东方",
    lastName: "不败",
  };
  console.log(showFullName(person));
})();
