const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    path: `${__dirname}/../../origo/plugins/mvl`,
    publicPath: '/build/js',
    filename: 'mvl.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'Mapviewlist'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    static: './',
    port: 9008,
    devMiddleware: {
      writeToDisk: true
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'resources/svg/material-icons.svg', to: 'material-icons.svg' }
      ]
    })
  ]
});
