const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    client: './client.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2'],
          },
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json-loader',
        }],
      },
    ],
  },
};
