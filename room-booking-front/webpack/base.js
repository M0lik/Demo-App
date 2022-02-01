"use strict";
const path = require("path");
const fs = require("fs");

const publicPath = "/";
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: ["./src/index.js"],
  },
  output: {
    path: resolveApp("dist"),
    filename: "assets/js/[name].[hash:4].js",
    chunkFilename: "assets/js/[name].[hash:4].chunk.js",
    publicPath: publicPath,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      Components: path.resolve(__dirname, "../src/components/"),
      Containers: path.resolve(__dirname, "../src/containers/"),
      Assets: path.resolve(__dirname, "../src/assets/"),
      Routes: path.resolve(__dirname, "../src/routes/"),
      Redux: path.resolve(__dirname, "../src/redux/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/img", to: "assets/img" },
        { from: "src/assets/fonts", to: "assets/fonts" },
      ],
    }),

    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};
