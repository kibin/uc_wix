var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    settings: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?overlay=false&reload=true',
      './src/settings/App.js',
    ],
    widget: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?overlay=false&reload=true',
      './src/widget/App.js',
    ],
  },

  output: {
    filename: '[name].js',

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/static/'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader',
      ],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            function: 'selector-parse',
            root: path.resolve('./js'),
          }
        }
      ],
      exclude: /node_modules/,
    }],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
    jquery: '$',
    Wix: 'Wix',
    'editor-ui-lib': 'UI'
  },
}
