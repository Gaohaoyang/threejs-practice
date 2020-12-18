const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: glob.sync('./src/**/index.js').reduce((acc, path) => {
    const entry = path.replace('/index.js', '').replace('/src', '')
    acc[entry] = path
    return acc
  }, {}),
  output: {
    filename: './[name]/main.js',
    path: path.resolve(__dirname, 'demo'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: 'style-loader', // creates style nodes from JS strings
      //     },
      //     {
      //       loader: 'css-loader', // translates CSS into CommonJS
      //     },
      //     {
      //       loader: 'sass-loader', // compiles Sass to CSS
      //     },
      //   ],
      // },
    ],
  },
  // plugins: [new HtmlWebpackPlugin()],
}
