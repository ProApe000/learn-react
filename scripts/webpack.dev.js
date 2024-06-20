const path = require("path");
const base = require("./webpack.base");
const { merge } = require("webpack-merge");

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
  devServer: {
    open: true,
    port: 8080,
  },
});
