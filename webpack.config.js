const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')

module.exports = (env, options) => {
  
  return {
    entry: './src/App.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'build.js',
      publicPath: 'dist/'
    },
    devServer: {
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.tag$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: 'riot-tag-new-loader',
              options: {
                parsers: {
                  css: {
                    plain: function(tag, css) {
                      return postcss([ autoprefixer({ browsers: ['last 15 versions'] }) ]).process(css).css
                    }
                  }
                }
              }
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
          test: /\.scss$/,
          use: [
            options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
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
        filename: 'build.css'
      })
    ]
  }
  
}