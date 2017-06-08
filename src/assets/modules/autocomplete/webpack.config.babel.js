const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: resolve('src'),
  entry: './index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'autocomplete.js',
    publicPath: '/build/',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },

    ],
  },
  plugins: [
    new ExtractTextPlugin(`styles/autocomplete.css`),
    new HtmlWebpackPlugin({
      title: 'build template',
      inject: false,
      template: './examples/index.html',
    }),
  ],
};
