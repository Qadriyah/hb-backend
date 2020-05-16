const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './bin/app.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
