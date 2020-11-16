const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});


module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    filename: "assets/js/[name].js",
    chunkFilename: 'assets/js/[name].chunk.js',
  },
  resolve: {
    extensions: [".js",".jsx",".ts",".tsx"]
  },
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.tsx(\?.*)?$/i,
    })],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "node_vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.prod.json",
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.join(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "import.meta.env": JSON.stringify({
        ...dotenv.parsed,
        NODE_ENV: "production",
        MODE: "production",
      }),
    }),
  ],
};
