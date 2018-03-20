const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');

const publicPath = path.resolve(rootPath, 'public');
const indexHtmlPath = path.resolve(publicPath, 'index.html');

const antdPath = path.resolve(rootPath, 'node_modules/antd/');
const nodeModulesPath = path.resolve(rootPath, 'node_modules');

module.exports = {
  distPath,
  indexHtmlPath,
  publicPath,
  rootPath,
  srcPath,
  antdPath,
  nodeModulesPath,
};
