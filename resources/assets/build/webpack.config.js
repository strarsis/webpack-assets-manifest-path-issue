'use strict'; // eslint-disable-line

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const rootPath = process.cwd();

let webpackConfig = {
  context: path.join(rootPath, 'resources/assets'),
  entry: {
  },
  output: {
    path: path.join(rootPath, 'dist'),
    publicPath: 'dist/',
    filename: `scripts/[name]_[contenthash].js`,
  },
  module: {
    rules: [
      
    ],
  },
  plugins: [
	new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(rootPath, 'dist')],
      verbose: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'images/**/*',
          noErrorOnMissing: true,
          to: '[path][name]_[contenthash].[ext]',
        },
      ],
    }),
	new WebpackAssetsManifest({
      output: 'assets.json',
      space: 2,
      writeToDisk: false,
      assets: {},
      replacer: require('./assetManifestFormatter'),
    }),
  ],
};

module.exports = webpackConfig;
