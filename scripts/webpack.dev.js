const base = require('./webpack.base');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: 'development',
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
    // 显示警告信息
    warnings: true,
    // 显示错误信息
    errors: true,
    // 显示错误的详细信息
    errorDetails: true,
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    port: 8080,
    hot: true,
    liveReload: false,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true, // 在浏览器中显示编译进度
      reconnect: true, //在断开链接时尝试重连
    },
    devMiddleware: {
      writeToDisk: true, // 本地运行编译时将产物写入磁盘
    },
    //
    historyApiFallback: {
      rewrites: [
        // Api 请求不重写
        { from: /^\/api\/./, to: (context) => context.parsedUrl.pathname },
        { from: /./, to: '/index.html' }, // 指向内存中编译后的index.html文件 本地运行时 webpack-dev-server的工作方式时 默认将文件保存在内存中 即使设置了writeToDisk 不会直接读取dist目录
      ],
    },
  },
});
