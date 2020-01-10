const webackMerge = require('webpack-merge');
const { NamedModulesPlugin, HotModuleReplacementPlugin } = require('webpack');
const commonConfig = require('./webpack.common.config');

module.exports = webackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',

  devServer: {
    open: true,
    port: 9000
  },

  entry: ['webpack-dev-server/client?http://localhost:9000', './index.ts'],

  watch: true,

  plugins: [new HotModuleReplacementPlugin(), new NamedModulesPlugin()]
});
