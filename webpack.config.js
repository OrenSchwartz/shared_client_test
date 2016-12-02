/* eslint-disable */

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var rucksack = require('rucksack-css')
var precss = require('precss')
var lost = require('lost')
var webpack = require('webpack')
var path = require('path')
var initialreset = require('postcss-initial')

var plugins = [
  new LodashModuleReplacementPlugin,
  new webpack.optimize.CommonsChunkPlugin('vendor', 'b2b.vendor.bundle.js'),
  new ExtractTextPlugin('b2b.css'),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
  }),
  new webpack.ProvidePlugin({
    'Promise': 'bluebird'
  }),
]

var cssLoader = 'css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]'
var env = process.env.NODE_ENV

if(env === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true }
    })
  )
}

if(env === 'production' || env === 'stage' ) {
  stylesLoader = ExtractTextPlugin.extract(cssLoader + '!sass')
} else {
  stylesLoader = 'style!' + cssLoader + '!sass'
}

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: path.join(__dirname, './app/assets/javascripts'),
    filename: 'b2b.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.s?css$/,
        include: /client/,
        loader: stylesLoader
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      sharedComponents: path.join(__dirname, './client/') + "/sharedComponents",
      translations: path.join(__dirname, './client/') + "/translations",
      features: path.join(__dirname, './client/') + "/features",
      infra:path.join(__dirname, './client/') + "/infra",
      constants: path.join(__dirname, './client/') + "/constants"
    }
  },
  postcss: [
    precss({
      /* options */
    }),
    lost({
      /* options */
    }),
    initialreset({
      /* options */
    }),
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: plugins,
  devServer: {
    contentBase: './client',
    hot: true
  }
}
