'use strict';

module.exports = function (gulp, plugins, config, type) {
  return function (cb) {
    let src = 'template-pages';
    let dest = 'template-cdn';
    if (type === 'local') {
      dest = 'template-local';
    } else if (type === 'docs') {
      src = 'docs';
      dest = 'docs';
    }

    const target = [
      `${config.basepath.src}/${src}/**/*.html`,
    ].concat(config.build.excludes);

    let projectAssets = new RegExp('="(/)?assets/_project/', 'g');
    let cdnIncludes = new RegExp('="(/)?assets/includes-cdn/', 'g');
    return gulp.src(target, { dot: true })
      .pipe(plugins.include({
        hardFail: true,
        // includePaths: ['/', '/src'],
      }))
      // Replace /assets/_project/ with /assets/v3/
      .pipe(plugins.replace(projectAssets, `="$1assets/${config.versionName}/`))
      .pipe(plugins.if(type === 'local', plugins.replace(cdnIncludes, `="$1assets/includes-local/`))) // Replace cdn assets with local assets
      .on('error', console.log)
      .pipe(gulp.dest(`${config.basepath.build}/${dest}/`));
  };
};
