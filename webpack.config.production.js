const path = require('path')
const webpack = require('webpack')
const Stats = require('webpack-stats-plugin').StatsWriterPlugin

module.exports = {
  entry: {
    settings: ['./src/settings/App.js'],
    widget: ['./src/widget/App.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new Stats('./dist/stats.json', {
      chunkModules: true,
      exclude: [
        /node_modules/,
      ],
      source: false,
    }),
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
