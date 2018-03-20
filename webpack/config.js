const path = require('path');

module.exports = (config) => {
  const webpackConfigPath =
    path.resolve(__dirname, `${config.environment}.config.js`);

  const webpackConfig = require(webpackConfigPath)(config);

  return webpackConfig;
};
