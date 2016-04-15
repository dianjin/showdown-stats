var webpack = require('webpack')
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'app/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [node_modules_dir], loader: 'babel' },
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};

module.exports = config;
