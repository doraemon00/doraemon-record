//类 类型  类的类型，可以通过接口来实现
(() => {
  // 定义一个接口
  interface IFly {
    fly();
  }
  class Person implements IFly {
    fly() {
      console.log("我会飞");
    }
  }
  const person = new Person();
  person.fly();

  //   定义一个接口
  interface ISwim {
    swim();
  }

  // 定义一个类 ，多个接口，这个类的类型就是 IFly 和 ISwim
  class Person2 implements IFly, ISwim {
    fly() {
      console.log("fly2");
    }
    swim() {
      console.log("swim2");
    }
  }

  // 实例化对象
  const person2 = new Person2();
  person2.fly();
  person2.swim();



// 定义了一个接口，继承其他的多个接口
interface IMyFlyAndSwim extends IFly,ISwim {
    
}

   
})();
