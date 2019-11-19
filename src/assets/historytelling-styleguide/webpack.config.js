const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractSass = new ExtractTextPlugin({filename: "styles.css"});

// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function() { // post css plugins, can be exported to postcss.config.js
                  return [require('precss'), require('autoprefixer')];
                }
              }
            }, {
              loader: 'sass-loader' // compiles Sass to CSS
            }
          ]
        })
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(pathsToClean), extractSass]
}
