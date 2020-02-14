'use-strict';

/*const UglifyJSPlugin = require('uglifyjs-webpack-plugin');*/
/*const CopyWebpackPlugin = require('copy-webpack-plugin');*/
module.exports = function (gulp, plugins, config, webpack, destFolder, type = 'build') {
  return function (cb) {
    let src = [
      `${config.basepath.src}/assets/_project/_blocks/qg-main.js`,
    ];
    //.concat(config.build.excludes); remove excludes
    let dest = {
      base: `${config.basepath.build}`,
      ext: `${config.versionName}/latest/js`,
    };
    // if (type === 'release') {
    //   dest.base = `${config.basepath.release}`; // ${destFolder}/${config.versionName}/js/
    // }

    if (!Array.isArray(destFolder)) {
      destFolder = [destFolder];
    }

    let webpackSettings = {
      output: {
        filename: 'qg-main.js',
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              query: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'webpack-replace',
            options: {
              query: {
                search: '{{CDN}}',
                replace: process.env.NODE_ENV === 'prod' ? `https://static.qgov.net.au/assets/${config.versionName}` : `/assets/${config.versionName}`,
              },
            },
          },
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'webpack-replace',
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'webpack-replace',
        },
        ],
      },
      devtool: 'source-map',
      /*plugins: [
       new CopyWebpackPlugin([
       {from: `${config.basepath.src}/assets/_project/_blocks/qg-env.js`},
       ]),
       ],*/
    };

    // if (type === 'build') {
    //   webpackSettings.devtool = 'source-map';
    // } else if (type === 'release') {
    //   webpackSettings.plugins = [
    //     //new UglifyJSPlugin()
    //   ];
    // }

    return gulp.src(src)
      .pipe(webpack(webpackSettings))
      .pipe(plugins.if(typeof destFolder[0] !== 'undefined', gulp.dest(`${dest.base}/${destFolder[0]}/${dest.ext}`)))
      .pipe(plugins.if(typeof destFolder[1] !== 'undefined', gulp.dest(`${dest.base}/${destFolder[1]}/${dest.ext}`)))
      .pipe(plugins.if(typeof destFolder[2] !== 'undefined', gulp.dest(`${dest.base}/${destFolder[2]}/${dest.ext}`)))
      .pipe(plugins.if(typeof destFolder[3] !== 'undefined', gulp.dest(`${dest.base}/${destFolder[3]}/${dest.ext}`)))
      .pipe(plugins.if(typeof destFolder[4] !== 'undefined', gulp.dest(`${dest.base}/${destFolder[4]}/${dest.ext}`)));
  };
};
