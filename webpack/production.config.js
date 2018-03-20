const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const paths = require('./paths.js');
const rules = require('./rules.config.js')(paths);

const extractTextPlugin = new ExtractTextPlugin({
  allChunks: true,
  filename: 'static/css/[name].[hash:8].css',
});

module.exports = function(config) {
  return {
    entry: {
      index: paths.srcPath,
    },
    output: {
      path: paths.distPath,
      filename: 'static/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        rules.babel,
        rules.cssExtract(extractTextPlugin),
        rules.antd,
        rules.file,
      ],
    },
    plugins: [
      extractTextPlugin,
      new HtmlWebpackPlugin({
        template: paths.indexHtmlPath,
        filename: 'index.html',
      }),
      new CopyWebpackPlugin([
        { from: paths.publicPath, to: paths.distPath, ignore: ['index.html'] },
      ]),
      new CleanWebpackPlugin(['dist'], {
        root: paths.rootPath,
        verbose: true,
      }),
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => /node_modules/.test(resource),
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [paths.srcPath, 'node_modules'],
    },
    devtool: 'source-map',
  }
};
