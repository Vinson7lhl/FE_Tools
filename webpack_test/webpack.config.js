/**
 *  src内部采用es6的模块方式，所以一定是import 、 export
 *  但是webpack配置采用的是commonJs模块方式所以，是require/module.export
 *  development模式下只是编译了代码并未压缩代码，还保留着注释等冗余，但是production则是压缩后的线上代码
 */


// 或者利用es6的解构
// const { resolve } = require('path');
let path = require('path')
let webpack = require('webpack')
// 处理css中的图片url,需要两个包，url-loader（和file-loader很相似，但可以返回一个当小于某个大小的文件时的data64格式的字符串），file-loader


/**
 * 插件必须new 
 * */
// 压缩打包html文件
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css到独立文件
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 每次build清空dist目录
let { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 多个入口，每个页面都有自己的独立js模块，后面HtmlWebpackPlugin插件会指定对应的html装载哪个js
  entry: {
    index: './src/js/index.js',
    list : './src/js/list.js'
  },
  // 出口，最终打包后的js、等文件的出口，注意：只有一个出口
  output: {
    // bundle名
    filename: 'js/[name].js',
    // path.resolve方法会返回一个路径字符串，__dirname 得到的就是webpack.comfig.js所在项目根目录=>webpack_test
    // 所以返回的就应该是'webpack_test/dist/……'
    path: path.resolve(__dirname, 'dist'),
    // html-loader转换后的图片等资源会默认为./即当前路径，但是这样是不对的。src/ 中的相对路径也希望和在dist/ 中保持一致，此配置就是为了html中的统一src而存在的。
    publicPath: '../'
  },
  // loader：处理所有非js、json文件
  module: {
    rules: [
      {
        test: /\.scss$/,
        // use中的数组中的执行顺序从右到左，即'sass-loader'=>'css-loader'=>'style-loader',
        use: [
          // 将js中的style插入到html中,在html中生成style标签
          // 'style-loader',

          // MiniCssExtractPlugin 将js里面的css提取到独立的css文件中，
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 关键在于打包后的css文件中引入的图片必须基于 '../' 这个相对上级的image文件夹内的文件，否则路径会发生错误
              publicPath: '../',
            },
          },
          // 将css导入到js中可识别的模块
          'css-loader',
          // 将sass转换为css
          'sass-loader'
        ]
      },
      // 处理css文件中通过url引入的图片文件全部放在image中以路径引入，但处理不了html中引入的<img />，此loader用的是es6模块方式引入
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options:{
          // 小于8k以base-64的img来展示，否则放在image中
          limit: 8*1024,
          name: 'image/[name].[ext]',
          // esModule: false
        }
      },
      // 模块化html，在js中 import html时处理，也可以处理html中的有src的属性的标签：比如图片，视频。此loader用的是commonJs模块方式引入
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  // plugins：处理loader无法处理和特殊功能的
  plugins: [
    // html-webpack-plugin配置，用来找到当做模板的html文件
    new HtmlWebpackPlugin(
      {
        // 打包后的目录：基于dist
        filename: 'pages/index.html',
        // 找到要复制的模板文件然后放入打包后的目录中
        template: './src/pages/index.html',
        chunks: ['index'],
        minify: false
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'pages/list.html',
      template: './src/pages/list.html',
      chunks: ['list']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    // 每次build清空dist目录
    new CleanWebpackPlugin(),
    // 开启HMR
    new webpack.HotModuleReplacementPlugin({
    })
    
  ],
  devServer: {
    hot: true
  },
  // 模式 development || production
  mode: 'development'
};
