const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          // 1. 最后一个 loader，作用是:  将 CSS 提取到单独的文件中
          MiniCssExtractPlugin.loader,
          // 2. 第2个，作用是:  将 CSS 转换为 CommonJS 模块
          "css-loader",
          // 3. 第3个，作用是:  将 CSS 转换为 RTL
          {
            loader: path.resolve(__dirname, "loaders/rtl-language-loader.js"),
            // 用户手动传入的配置
            options: {
              languages: ["he", "ar"],
              exclude: /node_modules/,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[hash]",
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new VueLoaderPlugin(),
  ],
  // resolve: {
  //   alias: {
  //     vue$: "vue/dist/vue.esm.js",
  //   },
  //   extensions: [".js", ".vue", ".json"],
  // },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  mode: "development",
};
