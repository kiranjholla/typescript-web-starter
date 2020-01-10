const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { NoEmitOnErrorsPlugin } = require('webpack');

const { resolve } = require('path');

const SOURCE_DIR = resolve(__dirname, '../src');

module.exports = {
  mode: 'production',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['./node_modules']
  },

  resolveLoader: {
    modules: ['./node_modules']
  },

  context: SOURCE_DIR,

  entry: './index.ts',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/\/node_modules\//]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
        ]
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({ template: 'index.html' }), new ProgressPlugin()],

  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
