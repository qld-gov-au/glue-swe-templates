var gulpif = require('gulp-if');
module.exports = function (gulp, plugins, config, fsPath, eslintReporter) {
  return () => {
    return gulp.src(config.test.lint)
      .once('data', function () { console.log('\x1b[1m', '   \n---linting tests---\n   '); })
      .pipe(plugins.eslint({
        configFile: '.eslintrc',
        fix: 'true',
      }))
      .pipe(plugins.eslint.format())
      .pipe(gulpif(process.env.NODE_ENV === 'prod', plugins.eslint.failAfterError()))
      .pipe(plugins.eslint.format(eslintReporter, function (results) {
        fsPath.writeFile('tests/reports/eslint/report.html', results);
      }));
  };
};
