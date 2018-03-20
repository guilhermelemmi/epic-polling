const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const paths = require('./paths.js');
const rules = require('./rules.config.js')(paths);

module.exports = function(config) {
  return {
    entry: {
      index: paths.srcPath,
    },
    output: {
      path: paths.distPath,
      filename: 'static/js/[name].js',
    },
    module: {
      rules: [
        rules.antd,
        rules.babel,
        rules.css,
        rules.file,
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.indexHtmlPath,
        filename: 'index.html',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => /node_modules/.test(resource),
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [paths.srcPath, 'node_modules'],
    },
    devServer: {
      stats: 'errors-only',
      historyApiFallback: true,
      open: true,
    },
    devtool: 'cheap-eval-source-map',
  }
};
