var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const vuxLoader = require('vux-loader')

var webpackConfig = {
  entry: {
    // 组团begin 12346
    group_list: "./src/page/group_list/js/group_list.js",
    group_detail: "./src/page/group_detail/js/group_detail.js",
    // 组团end
  },
  output: {
    path: 'dist/',
    filename: '[name].js'
  },
  devServer:{
    contentBase:'./dist/view'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')//?modules!postcss 添加对样式表的处理 postcss为CSS代码自动添加适应不同浏览器的CSS前缀。
      },
      {
        test: /\.es6$/,
        loader: "babel-loader"
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?-autoprefixer")},
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.json$/, loader: "json-loader", include: path.resolve(__dirname, "src")},
      {test: /\.js$/, loader: 'babel-loader', include: path.resolve(__dirname, "src")},
      {test: /\.(png|jpg|jpeg)$/, loader: "url-loader?limit=102400", include: path.resolve(__dirname, "src")}
    ]
  },
  babel: {
    presets: [
      "es2015",
      "stage-0",
      "stage-1",
      "stage-2",
      "stage-3",
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      filename:'./view/group_list.html',    //生成的html存放路径，相对于 path
      template:'./src/page/group_list/group_list.html',    //html模板路径
      inject:true,    //允许插件修改哪些内容，包括head与body
      hash:true,    //为静态资源生成hash值
      chunks:['group_list'],
      minify:{    //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      filename:'./view/group_detail.html',    //生成的html存放路径，相对于 path
      template:'./src/page/group_detail/group_detail.html',    //html模板路径
      inject:true,    //允许插件修改哪些内容，包括head与body
      hash:true,    //为静态资源生成hash值
      chunks:['group_detail'],
      minify:{    //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      }
    }),
  ],
  externals: {
    "jquery": "$",
    'Vue': true,
    'Swiper': true,
    "IScroll": "IScroll"
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    alias: {
      vue: __dirname + '/src/common/js/lib/vue/vue.min.js',
      jq: __dirname + '/src/common/js/lib/jquery.min.js'
    }
  }
};

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [
    {
      name: 'vux-ui'
    }
  ]
});
