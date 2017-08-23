const path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
      ],
    },
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      './src/assets/_project/_blocks/utils/qg-env.js',
      'tests.webpack.js',
      {pattern: 'src/assets/modules/**/**/fixtures/*.*', watched: true, served: true, included: false},
    ],
    frameworks: ['jasmine-ajax', 'jasmine-jquery', 'jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /-test\.js$/,
            include: /src/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ],
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ['sass-loader'],
          },
        ],
        loaders: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src'),
            exclude: /(bower_components|node_modules|__tests__)/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
            },
          },
        ],
      },
    },
  });
};
