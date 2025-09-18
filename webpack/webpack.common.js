'use strict';

require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, '../app'),
  output: {
    path: path.resolve(__dirname, '../tempDist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
    new ESLintPlugin(),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    //   Buffer: ['buffer', 'Buffer'],
    // }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {},
    alias: {
      '@': path.resolve(__dirname, '../app/'),
    },
  },
  devServer: {
    open: true,
    static: path.resolve(__dirname, '../public'),
    compress: true,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
  },
};
