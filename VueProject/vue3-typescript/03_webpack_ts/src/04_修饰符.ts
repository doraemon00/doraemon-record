// 修饰符 主要是描述类中的成员（属性 构造函数 方法）的可访问性
// 类中的成员都有自己的默认的访问修饰符 public
// public--公共的  修饰符，类中成员默认的修饰符，代表的是公共的，任何位置都可以访问类中的成员
// private--私有的 修饰符，类中的成员如果使用 private 来修饰,那么外部是无法访问这个成员数据的，子类也无法
// protected--受保护的  修饰符，那么外部是无法访问这个成员数据的，子类可以访问

(() => {
  class Person {
    // 属性
    //  public name: string;
    // private name: string;
    public name: string; // 构造函数
    constructor(name: string) {
      // 更新属性
      this.name = name;
    }
    eat() {
      console.log("好吃");
    }
  }

  const per = new Person("chu");
  console.log(per.name);
})();
