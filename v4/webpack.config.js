const compiler = require('@riotjs/compiler')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

compiler.registerPreprocessor('css', 'plain', (code) => {
  return {
    code: postcss([autoprefixer]).process(code).css,
    map: null
  }
})

module.exports = (env, options) => {
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: 'dist/'
    },
    devServer: {
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.riot$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: '@riotjs/webpack-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin([
        {
          from: 'src/assets/**/*.{png,jpg}',
          to: 'img',
          flatten: true
        }
      ]),
      new MiniCssExtractPlugin({
        filename: 'main.css'
      })
    ]
  }
  
}
