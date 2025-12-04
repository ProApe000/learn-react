const path = require("path");
const base = require("./webpack.base");
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: "development",
  // module: {
  //   rules: [
  //     {
  //       test: /\.less$/,
  //       exclude: /node_modules/,
  //       use: [
  //         "style-loader",
  //         {
  //           loader: "css-loader",
  //           options: {
  //             modules: {
  //               LocalsConvention: "camelCase", //
  //             },
  //           },
  //         },
  //         {
  //           loader: "postcss-loader",
  //           options: {
  //             postcssOptions: {
  //               plugins: [["postcss-preset-env", {}]],
  //             },
  //           },
  //         },
  //         "less-loader",
  //       ],
  //     },
  //   ],
  // },
  stats: {
    // 表示要获取所有的统计信息 (包括编译过程中生成的静态资源以及动态资源)
    all: false,
    // 获取webpack 打包生成的所有静态资源清单
    assets: true,
    // 获取webpack 打包生成的各个chunk相关的信息
    chunks: true,
    // 获取webpack module相关的信息
    modules: false,
    // 获取webpack 编译和打包过程中的性能数据
    performance: false,
    // 表示是否显示源代码
    source: true,
    // 显示chunk之间的关系
    chunkRelations: true,
    // 显示模块被包含的原因
    reasons: true,
  },
  plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    open: true,
    port: 8080,
  },
});
