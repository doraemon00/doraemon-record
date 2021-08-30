(() => {
  interface IPerson {
    //只读
    readonly id: number;
    name: string;
    age: number;
    //可有可无
    sex?: string;
  }

  // 定义一个对象，该对象的类型就是我定义的接口 IPerson
  const person: IPerson = {
    id: 1,
    name: "chu",
    age: 18,
    sex: "女",
  };

  console.log(person);
  // person.id = 100 //只读
})();
