const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "production", // وضع الإنتاج
  devtool: 'hidden-source-map', // خرائط المصدر المخفية للإنتاج

  output: {
    filename: "bundle.[contenthash].js", // استخدام contenthash لملفات الإنتاج
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] // استخراج CSS إلى ملف منفصل
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
    new CleanWebpackPlugin() // تنظيف الملفات غير المستخدمة
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // تقليل CSS
      new TerserPlugin() // تقليل JavaScript
    ],
    minimize: true,
  },
};
