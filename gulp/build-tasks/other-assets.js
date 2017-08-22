module.exports = function (gulp, plugins, config, es, dest) {
  let extLibJSTarget = config.extLib.js.map(function (s) { return `${config.basepath.src}/assets/_project/lib/ext/` + s + '.js'; });
  return function (cb) {
    return es.merge([
      // Images
      gulp.src(`${config.basepath.src}/assets/_project/images/**/*`).pipe(
        gulp.dest(`${config.basepath.build}/${dest}/${config.versionName}/latest/images/`)
      ),
      // Libraries
        //TODO just handle non js and css (all the js and css to be minified and combined)
      gulp.src(`${config.basepath.src}/assets/_project/lib/**`).pipe(
        gulp.dest(`${config.basepath.build}/${dest}/${config.versionName}/latest/lib/`)
      ),
      // concat external js libraries
      gulp.src(extLibJSTarget)
          // .pipe(plugins.debug({title: 'External js:'}))
          .pipe(plugins.concat('all-ext-min.js'))
          .pipe(plugins.uglify())
          .pipe(gulp.dest(`${config.basepath.build}/${dest}/${config.versionName}/latest/lib/`)),

      // Fonts
      gulp.src(`${config.basepath.node_modules}/bootstrap-sass/assets/fonts/**`).pipe(
        gulp.dest(`${config.basepath.build}/${dest}/${config.versionName}/latest/fonts`)
      ),
      gulp.src(`${config.basepath.node_modules}/font-awesome/fonts/**`).pipe(
        gulp.dest(`${config.basepath.build}/${dest}/${config.versionName}/latest/fonts`)
      ),
      gulp.src([`${config.basepath.src}/docs/**/*.js`, `${config.basepath.src}/docs/**/*.png`, `${config.basepath.src}/docs/**/*.css`])
        .pipe(plugins.if(dest === 'docs/assets', gulp.dest(`${config.basepath.build}/docs/`)))
    ]);
    // config.projects.map(function (element) {
    // });
  };
};
