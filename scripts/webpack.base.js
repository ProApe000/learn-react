const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'], //指定当文件没有书写后缀时 以什么样的后缀去查找
    alias: {
      '@/*': path.resolve(__dirname, '../src/*'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets:
                    'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead',
                  useBuiltIns: false,
                  corejs: 3,
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
              ['@babel/preset-typescript'],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  // 使用corejs 3的polyfill
                  corejs: 3,
                  // 提取helper函数
                  helpers: true,
                  // 使用regenerator runtime 用于async await 替换
                  regenerator: true,
                  // 不实用es模块 保持 commonjs
                  useESModules: false,
                  // 是否使用绝对路径引入runtime
                  absoluteRuntime: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(jpe?g|png|svg|webp|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'assets/images/[name]-[contenthash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(jpg|png|jpeg|gif|svg|webp)$/i,
      //   type: "asset",
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 10 * 1024, // 10kb
      //     },
      //   },
      //   generator: {
      //     filename: "assets/images/[name].[hash:8][ext]", // 将图片单独提取出来放在assets/images目录下
      //   },
      // },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]--[contenthash:base64:5]', // 用于配置css Module中的类名生成规则 在css module中类名将会自动转换 以避免全局作用域的命名冲突 name时样式表文件名称 local是样式类名 然后加上基于内容生成的hash值
              },
              esModule: false,
            },
          },
          {
            loader: 'postcss-loader',
            // 他可以帮助将css的一些新特性转成成大多浏览器都认识的css 并且会根据目标浏览器或者运行时的环境添加polyfill
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {}],
                  ['postcss-preset-env', {}],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              additionalData: `@import "${path.resolve(__dirname, '../src/variables.less')}";`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      // filename: "index.html",
      // publicPath: "/",
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[contenthash:8].css', // 将css单独提测出来放在assets/css目录下
    }),
    // 内联所有匹配的runtime文件
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime.*.js$/,
    }),
  ],
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        // 默认开启
        // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 启用模块复用
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      // name: 'runtime',
      name: (entrypoint) => `runtime.${entrypoint.name}`,
    },
    // 开启tree shaking
    usedExports: true,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    clean: true, // 每次构建前清理dist目录
  },
};
