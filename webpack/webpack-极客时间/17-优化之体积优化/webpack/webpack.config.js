const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        //使用 cache 加快二次构建速度
        cache: true,
        //开启多线程
        parallel: true,
        terserOptions: {
          comments: false,
          compress: {
            //删除无用代码
            unused: true,
            //删除debugger
            drop_debugger: true,
            //移除console
            drop_console: true,
            //移除无用代码
            dead_code: true,
          },
        },
      }),
    ],
    concatenateModules: true,
  },
};
