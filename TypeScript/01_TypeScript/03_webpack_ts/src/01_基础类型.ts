(()=>{
    //布尔类型
    let flag:boolean = true
    console.log(flag)

    //数字类型
    let a1:number = 10

    //字符串类型
    // let str:string = 'string'

    //undefined 和 null 都可以作为其他类型的子类型

    //数组类型
    let arr1 :number[] = [10,20,30]
    //泛型的写法
    let arr2 :Array<number> = [10,20,30]

    //元祖类型
    let arr3 :[string,number,boolean] = ['xx',100,true]


    //枚举类型
    enum Color {
        red,
        green,
        blue
    }

    //any 类型
    let str :any = 100
    str = 'chu'
    console.log(str)


    //void 类型 在函数声明的时候 小括号的后面使用 :void 代表的是该函数没有任何返回值
    function showMsg():void{
        console.log("xxx")
        return null
    }










    





})()