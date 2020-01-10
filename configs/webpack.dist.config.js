const TerserPlugin = require('terser-webpack-plugin');
const webackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const { resolve } = require('path');

module.exports = webackMerge(commonConfig, {
  mode: 'production',

  watch: false,

  output: {
    filename: 'app.[hash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        terserOptions: {
          ecma: 5,
          warnings: false,
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: {
            ascii_only: true,
            comments: false,
            webkit: true
          },
          safari10: true
        }
      })
    ]
  }
});
