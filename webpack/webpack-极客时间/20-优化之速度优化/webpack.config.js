module.exports = {
  resolve: {
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
    // 减少耗时的递归解析操作
    alias: {
      react: path.resolve(__dirname, "./node_modules/react/dist/react.min.js"),
      "@lib": path.resolve(__dirname, "./src/lib/"),
    },
  },
  module: {
    noParse: /node_modules\/(jquery\.js)/,
  },
  //   rules: [
  //     {
  //       //test 正则
  //       test: /\.js$/,
  //       loader: "babel-loader",
  //       //排除路径使用数组
  //       exclude: [path.resolve(__dirname, "./node_modules")],
  //       include: [path.resolve(__dirname, "./src")],
  //     },
  //   ],

  rules: [
    {
      test: /\.js$/,
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
      },
      //排除路径
      exclude: /node_modules/,
      //查找路径
      include: [path.resolve("./src")],
    },
  ],
};
