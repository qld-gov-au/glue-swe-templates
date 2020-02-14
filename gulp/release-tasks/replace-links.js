'use strict';

module.exports = function (gulp, plugins, es, config) {
  return function (done) {
    gulp.src(`${config.basepath.release}/docs/*.html`)
      .pipe(plugins.replace(/\/assets\/v3.1\//g, 'https://static.qgov.net.au/assets/v3.1/'))
      .pipe(gulp.dest(`${config.basepath.release}/docs/`));

    gulp.src(`${config.basepath.release}/docs/pagemodels/*.html`)
      .pipe(plugins.replace(/\/assets\/v3.1\//g, 'https://static.qgov.net.au/assets/v3.1/'))
      .pipe(gulp.dest(`${config.basepath.release}/docs/pagemodels/`));

    done();
  };
};
