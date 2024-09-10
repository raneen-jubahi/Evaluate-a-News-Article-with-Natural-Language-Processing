const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development", // وضع التطوير
  devtool: 'source-map', // خرائط المصدر لتطوير أفضل
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true, // تنظيف المخرجات السابقة
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] // استخراج CSS إلى ملف منفصل (يمكن استبداله بـ style-loader)
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css' // استخدام contenthash لملفات CSS
    }),
    new CleanWebpackPlugin({
      dry: true, // تجريبي، لا ينفذ التنظيف الفعلي
      verbose: false, // عدم عرض السجلات في وحدة التحكم
      cleanStaleWebpackAssets: true, // تنظيف الملفات غير المستخدمة
      protectWebpackAssets: false, // عدم حماية الملفات من التنظيف
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // تقليل CSS
    ],
    minimize: true,
  },
};
