"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./base");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HOST = "localhost";
const PORT = 3005;

module.exports = merge(baseConfig, {
  mode: "development",
  target:"web",
  devServer: {
    compress: true,
    host: HOST,
    port: PORT,
    open: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash:4].css",
    }),
  ],
});
