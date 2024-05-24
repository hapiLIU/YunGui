const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "static/[name][hash][ext].js",
    path: path.resolve(__dirname, "dist"), // 输出目录
    asyncChunks: true, // 创建按需加载的异步 chunk。
    assetModuleFilename: "images/[hash][ext][query]", // 图片打包到images下
    clean: true, // 清空上次打包内容
  },
  // 别名配置
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "src:": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "static/img/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: ["esbuild-loader"],
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
            options: {
              /* your options here */
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板路徑
      template: "public/index.html",
      //配置minify，进行html文件的压缩
      minify: {
        collapseWhitespace: true,
      },
    }),
    // 清理上次打包缓存
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      publicPath: "public",
    },
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
