const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    managerInterface: './src/manager-interface.js',
    customerInterface: './src/customer-interface.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                  publicPath: 'images/'
                }
              }
            ]
      }
    ],
  },
  // Below is needed for webpack-dev-server
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/manager-interface.html',
      inject: true,
      chunks: ['managerInterface'],
      filename: 'manager-interface.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/customer-interface.html',
      inject: true,
      chunks: ['customerInterface'],
      filename: 'customer-interface.html'
    })
  ],
  devServer: {
         contentBase: './dist'
  }
};