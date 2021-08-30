//基础类型
(function () {
    //   // 布尔类型
    //   let flag: boolean = true;
    //   console.log(flag);
    //   //数字类型
    //   let a1: number = 3;
    //   console.log(a1);
    //   //字符串类型
    //   let name: string = "chu";
    //   console.log(name);
    //   //undefined null 都可以作为其他类型的子类型，
    //   let und: undefined = undefined;
    //   let num2: number = undefined;
    //   //数组类型
    //   // 定义1 数据类型[]
    //   let arr1: number[] = [10, 20, 30, 40];
    //   console.log(arr1);
    //   // 定义2 泛型的写法
    //   let arr2: Array<number> = [100, 200, 300];
    //   console.log(arr2);
    //   //元祖类型
    //   let arr3: [string, number, boolean] = ["1", 1, true];
    //   console.log(arr3);
    //   //   枚举
    //   enum Color {
    //     red,
    //     green,
    //     blue,
    //   }
    //   let color: Color = Color.red;
    //   console.log(color);
    //   console.log(Color.red, Color.green, Color.blue);
    //   //any
    //   let notSure: any = 4;
    //   notSure = "maybe a string";
    //   console.log(notSure);
    //   let list: any[] = [1, true, "free"];
    //   list[1] = 100;
    //   console.log(list);
    // object
    // function fn2(obj:object):object{
    //     console.log('fn2()',obj)
    //     return {}
    // }
    // console.log(fn2(new String('abc')))
    // 联合类型
    // 得到一个数字或字符串值的字符串形式值
    //   function toString2(x: number | string): string {
    //     return x.toString();
    //   }
    //   function getLength(x: number | string) {
    //     // return x.length // error
    //     if (x.length) {
    //       // error
    //       return x.length;
    //     } else {
    //       return x.toString().length;
    //     }
    //   }
    // function getLength(x:number | string){
    //     if((string)x).length{
    //         return (x as string).length
    //     }else{
    //         return x.toString().length
    //     }
    // }
    // console.log(getLength('abcd'),getLength(1234))
})();
