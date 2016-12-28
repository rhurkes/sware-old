const path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './src/index.jsx'],
  devtool: 'source-map',
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [require.resolve('babel-plugin-transform-object-rest-spread')],
          presets: [['es2015', { modules: false }], 'react'],
        },
      },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
