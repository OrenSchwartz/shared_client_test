/* eslint-disable */

var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
      ],
    },
    files: [
      'tests.webpack.js',
    ],
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /-test\.js$/,
            include: /client/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.js?$/,
            include: /client/,
            exclude: /(node_modules|bower_components|__tests__)/,
            loader: 'babel-istanbul',
            query: {
              cacheDirectory: true,
            },
          },
        ],
        loaders: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../client'),
            exclude: /(bower_components|node_modules|__tests__)/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['airbnb']
            },
          },
          {
            test: /\.css$/,
            include: /client/,
            loaders: [
              'style-loader',
              'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
              'postcss-loader'
            ]
          },
          {
            test: /\.scss$/,
            include: /client/,
            loaders: [
              'style-loader',
              'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
              'sass'
            ]
          },
          {
            test: /\.json$/,
            include: /client/,
            exclude: /translations/,
            loader: 'json'
          },
        ],
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
          sharedComponents: path.join(__dirname, './client/') + "/sharedComponents" ,
          translations: path.join(__dirname, './client/') + "/translations",
          features: path.join(__dirname, './client/') + "/features",
          infra:path.join(__dirname, './client/') + "infra",
          constants: path.join(__dirname, './client/') + "/constants"
        }
      }
    },
  });
};
