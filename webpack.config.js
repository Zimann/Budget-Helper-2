
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['env']
      }
    }, {
      test: /\.css$/,

      use: [{
        loader: 'style-loader',

        options: {
          sourceMap: true
        }
      }, {
        loader: 'css-loader',
        
        options: {
          minimize: true
        }
      }]
    }]
  },

  plugins: [
    new UglifyJSPlugin(),
  ],

  entry: {
    script: './src/js/script.js'
  },

  output: {
    filename: 'all.js',
    path: path.resolve(__dirname, 'dist/js')
  },

  mode: 'development'
}