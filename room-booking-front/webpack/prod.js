"use strict";

const merge = require("webpack-merge");
const baseConfig = require("./base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

let pathsToClean = ["dist"];

let cleanOptions = {
  root: __dirname,
  verbose: false,
  dry: false,
};

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  performance: {
    hints: "warning",
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash:4].css",
    }),
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
  ],
});
