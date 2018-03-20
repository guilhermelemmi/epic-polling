const autoprefixer = require('autoprefixer');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    camelCase: true,
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  },
};

const postCssLoader = {
  loader: 'postcss-loader',
  ident: 'postcss',
  options: {
    plugins: () => [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      }),
    ],
  },
};

module.exports = {
  cssLoader,
  postCssLoader,
};
