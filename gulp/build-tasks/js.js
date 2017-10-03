'use-strict';

module.exports = function (gulp, plugins, config, webpack) {
  return function (cb) {
    config.projects.map((element) => {
      return gulp.src(`${config.basepath.src}/assets/_project/_blocks/qg-main.js`)
        .pipe(webpack({
          output: {
            filename: 'qg-main.js',
          },
          devtool: 'source-map',
          module: {
            loaders: [{
              test: /\.js$/,
              exclude: /(node_modules)/,
              loader: 'babel',
              query: {
                presets: ['es2015'],
              },
            }],
          },
        }))
        .pipe(gulp.dest(`${config.basepath.build}/assets/${config.versionName}/latest/js/`))
        .on('end', cb);
    });
  };
};
