var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
const vuxLoader = require('vux-loader')
// let autoprefixer = require('autoprefixer')
// let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var webpackConfig = {
  entry: {
    goodsDetailData: './src/page/goodsDetail/js/goods_detail_data.js',
    goodsDetail: './src/page/goodsDetail/js/goods_detail.js',
    noFindGoods: './src/page/goodsDetail/js/nofind_goods.js',
    home: './source/javascript/home.config.js',
    cartConfirm: './source/javascript/cartConfirm.config.js',
    vSchool: './source/javascript/vSchool.config.js',
    allSchool: './source/javascript/allSchool.config.js',
    seriesCourse: './source/javascript/series.config.js',
    seriesActivity: './source/javascript/seriesActivity.config.js',
    learn: './source/javascript/learn.config.js',
    vClassroomPopList: './source/javascript/v_classroom_pop_list.config.js',
    vClassroomTeacher: './source/javascript/v_classroom_teacher.config.js',
    vClassroomPopularityList: './source/javascript/v_classroom_popularity_list.config.js',
    introduce: './source/javascript/introduce.config.js',
    classroom: './source/javascript/classroom.config.js',
    social: './source/javascript/social.config.js',
    commonList: './source/javascript/commonList.config.js',
    index: './source/page/index.config.js',
    new_category: './source/javascript/new_category.config.js',
    cart: './page/cart.config.js',
    index_fe: './source/javascript/index_fe.config.js',
    detail: './source/javascript/detail.config.js',
    category: './source/javascript/category.config.js',
    user: './source/javascript/user.config.js',
    overtime: "./source/javascript/overtime.config.js",
    // orderList: "./source/javascript/orderList.config.js",
    vList: "./source/javascript/vList.config.js",
    search_page: "./source/javascript/search_page.config.js",
    vSchool_search: "./source/javascript/vSchool_search.config.js",
    paySuccess: "./source/javascript/paySuccess.config.js",
    vClassroomLogin: "./source/javascript/vClassroomLogin.config.js",
    seckill_more_discount: "./source/javascript/seckill_more_discount.config.js",
    orderList_comment_list: "./source/javascript/orderList_comment_list.config.js",
    best_sellers: "./source/javascript/best_sellers.config.js",
    everyday_up_new: "./source/javascript/everyday_up_new.config.js",
    idcardList: "./source/javascript/idcardList.config.js",
    idcardAdd: "./source/javascript/idcardAdd.config.js",
    activity: "./source/javascript/activity.config.js",
    activity_uploadpic: "./source/javascript/activity_uploadpic.config.js",
    orderArriveList: "./source/javascript/orderArriveList.config.js",
    commentList: "./source/javascript/commentList.config.js",
    commentDetail: "./source/javascript/commentDetail.config.js",
    // 取消订单
    orderList: "./src/page/orderList/js/orderList.js",

    // 新版专题
    topic:"./src/page/new_topic/js/topic.js",
    // 组团
    group_list: "./src/page/group_list/js/group_list.js",
    group_goods: "./src/page/group_goods/js/group_goods.js",
    group_detail: "./src/page/group_detail/js/group_detail.js",
    group_detail_all: "./src/page/group_detail_all/js/group_detail_all.js",
    // 绘本节答题
    huibenjie_pass: "./src/page/huibenjie_pass/js/huibenjie_pass.js",
    huibenjie_answer: "./src/page/huibenjie_answer/js/huibenjie_answer.js",
    // 绘本节支付结果页刮奖区域
    pay_result_scratch: "./src/page/pay_result_scratch/js/pay_result_scratch.js",
    old_topic:"./src/page/old_topic/js/old_topic.js",

    // 活动红包领取
    redpack_receive: "./src/page/redpack_receive/js/redpack_receive.js",
    setting: "./source/javascript/setting.config.js",
    bind_phone: "./source/javascript/bind_phone.config.js",
    new_search2: "./source/javascript/new_search2.config.js",
    //评论区页面
    discuss:"./source/javascript/discuss.config.js",
    dvkcomment:'./source/javascript/dvkcomment.config.js',
    //儿童节
    childrens:"./source/javascript/childrens.config.js",
    //新版开店页面
    setShop: "./src/page/setShop/js/setShop.js",
    privilege: "./src/page/setShop/js/privilege.js",
    guide: "./src/page/setShop/js/guide.js",
    //支付成功页面
    paySuccess: "./src/page/paySuccess/js/paySuccess.js",
    //城市合伙人
    partner: "./src/page/partner/js/partner.js",
    partnerManage: "./src/page/partner_manage/js/partner_manage.js",
    guide_redpacket: "./src/page/partner_redpacket/js/partner_redpacket.js",
  },
  output: {
    path: 'dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')//?modules!postcss 添加对样式表的处理 postcss为CSS代码自动添加适应不同浏览器的CSS前缀。
      },
      {
        test: /\.es6$/,
        loader: "babel-loader?optional=runtime"
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
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: {removeAll: true } },
    //   canPrint: true
    // }),
  ],
  externals: {
    "jquery": "$",
    'Vue': true,
    'Swiper': true,
    "IScroll": true,
    'VueLazyload': true,
    'VueRouter': true,
    '$': true,
  },
  // postcss: [autoprefixer()],
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    alias: {
      vue: __dirname + '/src/common/js/lib/vue/vue.min.js'
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
