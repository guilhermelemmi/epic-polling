const loaders = require('./loaders.config.js');

module.exports = (paths) => ({
  babel: {
    test: /\.jsx?$/,
    exclude: paths.nodeModulesPath,
    loader: 'babel-loader',
  },
  file: {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    loader: 'file-loader',
    options: {
      name: 'static/media/[name][hash].[ext]',
    },
  },
  css: {
    test: /\.css$/,
    exclude: paths.antdPath,
    use: [
      'style-loader',
      loaders.cssLoader,
      loaders.postCssLoader
    ],
  },
  antd: {
    test: /\.css$/,
    include: paths.antdPath,
    use: [
      'style-loader',
      loaders.postCssLoader,
    ],
  },
  cssExtract: (extractTextPlugin) => ({
    test: /\.css$/,
    exclude: paths.nodeModulesPath,
    use: extractTextPlugin.extract({
      use: [
        loaders.cssLoader,
        loaders.postCssLoader,
      ],
      fallback: 'style-loader',
    }),
  }),
});
