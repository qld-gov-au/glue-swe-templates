'use strict';

const pjson = require('../../package.json');

module.exports = function (gulp, plugins, config, dest, local = false, relpath = false) {
  return function (cb) {
    let src = [
      `${config.basepath.src}/assets/_project/_blocks/layout/**/*.html`,
    ];
      //.concat(config.build.excludes); //remove concat excludes, remove from gulp-config.json also
    let cdnLink = {
      regex: new RegExp(`="/assets/${config.versionName}/latest`, 'g'),
      replacement: `="https://static.qgov.net.au/assets/${config.versionName}/${pjson.version}`,
    };
    let folderNameChange = {
      regex: new RegExp(`="/assets/includes-local`, 'g'),
      replacement: `="/assets/includes-cdn`,
    };

    // if (!Array.isArray(dest)) {
    //   dest = [dest];
    // }

    const projectAssets = new RegExp('="(/)?assets/_project/', 'g');

    // Test if the element is set to deploy this component
    return gulp.src(src, { dot: true })
      .pipe(plugins.include({ hardFail: true }))
      .on('error', console.log)
      .pipe(plugins.replace(projectAssets, `="$1assets/${config.versionName}/`)) // Replace '_project' with 'v4'
      .pipe(plugins.if(local !== true, plugins.replace(cdnLink.regex, cdnLink.replacement)))
      .pipe(plugins.if(local !== true, plugins.replace(folderNameChange.regex, folderNameChange.replacement)))
      .pipe(gulp.dest(`${config.basepath.build}/${dest}/`));
  };
};
