const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const generateHtmlPlugins = () => glob.sync('./src/**/index.html').map(
  (item) => new HtmlWebpackPlugin({
    template: item,
    filename: `./${item.replace('/src', '').replace('./', '')}`,
    inject: false,
    templateParameters: {
      ppp: 'hello',
      path: `.${item.replace('/src', '').replace('.html', '.js')}`,
    },
  }),
)

module.exports = {
  entry: glob.sync('./src/**/index.js').reduce((acc, filePath) => {
    const entry = filePath.replace('/index.js', '').replace('/src', '')
    acc[entry] = filePath
    return acc
  }, {}),
  output: {
    filename: './[name]/index.js',
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
  plugins: [...generateHtmlPlugins()],
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', 'mjs'],
  },
  devServer: {
    contentBase: './demo',
    open: true,
  },
}
