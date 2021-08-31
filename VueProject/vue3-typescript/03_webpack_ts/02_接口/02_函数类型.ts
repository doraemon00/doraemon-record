(() => {
  //函数类型:通过接口的方式作为函数的类型来使用

  interface ISearchFunc {
    //定义一个调用签名
    (source: string, subString: string): boolean;
  }

  const searchString: ISearchFunc = function (
    source: string,
    subString: string
  ): boolean {
    //   在 source 字符串中查找 subString 这个字符串
    return source.search(subString) > -1;
  };

  //   调用
  console.log(searchString("chu", "h"));
})();
