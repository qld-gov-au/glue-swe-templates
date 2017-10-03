'use strict';

module.exports = function (gulp, plugins, config) {
  return function (cb) {
    config.projects.map((element) => {
      const target = [
        `${config.basepath.src}/**/*.html`,
        '!**/_project/**/*',
      ].concat(config.build.excludes);

      let projectAssets = new RegExp('="(/)?assets/_project/', 'g');
      return gulp.src(target, { dot: true })
        .pipe(plugins.include({ hardFail: true }))
        // Replace /assets/_project/ with /assets/v3/
        .pipe(plugins.replace(projectAssets, `="$1assets/${config.versionName}/latest/`))
        .on('error', console.log)
        .pipe(gulp.dest(config.basepath.build))
        .on('end', cb);
    });
  };
};
