const cssnano = require('cssnano');
module.exports = function (gulp, plugins, config, es, webpack, path, banner) {
  return function (done) {
    const target = [
      `${config.basepath.build}/**/*`,
      `!${config.basepath.build}/assets/**/*`,
      `!${config.basepath.build}/template-pages/**/*`,
      `!${config.basepath.build}/*`,
      `!**/${config.versionName}/*.js`, // handled by JS task that minifies
      `!**/${config.versionName}/*.css`, // handled by SCSS -> CSS task that minifies
    ].concat(config.release.excludes);
    const versionAssetsTarget = [
      `${config.basepath.build}/assets/${config.versionName}/**/*`,
      `!**/${config.versionName}/**/*.js`, // handled by JS task that minifies
      `!**/${config.versionName}/**/*.css`, // handled by SCSS -> CSS task that minifies
    ].concat(config.release.excludes);
    let includesLink = {
      cdnRegex: new RegExp('="(/)?assets/includes-cdn/', 'g'),
      localRegex: new RegExp('="(/)?assets/includes-local/', 'g'),
      cdnReplacement: '="$1assets/includes-cdn/',
      localReplacement: '="$1assets/includes-local/',
    };

    gulp.src(target, { dot: true })
      .on('error', console.log)
      .pipe(gulp.dest(`${config.basepath.release}`));

    //template with include-cdn links
    gulp.src(`${config.basepath.build}/template-pages/**/*`, { dot: true })
      .on('error', console.log)
      .pipe(plugins.replace(includesLink.localRegex, includesLink.cdnReplacement)) //checks for local includes and replaces with cdn includes
      .pipe(gulp.dest(`${config.basepath.release}/template-cdn-ssi`));
    //template with include-local links
    gulp.src(`${config.basepath.build}/template-pages/**/*`, { dot: true })
      .on('error', console.log)
      .pipe(plugins.replace(includesLink.cdnRegex, includesLink.localReplacement)) //checks for cdn includes and replaces with local includes
      .pipe(gulp.dest(`${config.basepath.release}/template-local-ssi`));

    //assets with cdn assets links
    gulp.src(`${config.basepath.build}/assets/includes-cdn/**/*`, { dot: true })
      .pipe(gulp.dest(`${config.basepath.release}/template-cdn-ssi/assets/includes-cdn/`));
    //assets with local assets links
    gulp.src(`${config.basepath.build}/assets/includes-local/**/*`, { dot: true })
      .pipe(gulp.dest(`${config.basepath.release}/template-local-ssi/assets/includes-local/`));

    //JS task
    gulp.src([`${config.basepath.build}/assets/${config.versionName}/**/*.js`, `!${config.basepath.build}/assets/${config.versionName}/**/lib/*.js`], { dot: true })
      .pipe(plugins.foreach(function (stream, file) {
        let filename = path.basename(file.path);
        let destPath = file.path.split(file.base)[1].split(filename)[0];
        return stream
          .pipe(plugins.webpack({
            output: {
              filename: filename,
            },
            plugins: [new webpack.optimize.UglifyJsPlugin()],
          }, webpack))
          .pipe(plugins.insert.prepend(banner))
          .pipe(gulp.dest(`${config.basepath.release}/template-local-ssi/assets/${config.versionName}/${destPath}`))
          .pipe(gulp.dest(`${config.basepath.release}/template-local/assets/${config.versionName}/${destPath}`))
          .pipe(gulp.dest(`${config.basepath.static}/assets/${config.versionName}/${destPath}`));
      }));

    gulp.src(`${config.basepath.build}/assets/${config.versionName}/latest/lib/all-ext-min.js`)
      .pipe(plugins.insert.prepend(banner))
      .pipe(gulp.dest(`${config.basepath.release}/template-local-ssi/assets/${config.versionName}/latest/lib/`))
      .pipe(gulp.dest(`${config.basepath.release}/template-local/assets/${config.versionName}/latest/lib/`))
      .pipe(gulp.dest(`${config.basepath.static}/assets/${config.versionName}/latest/lib/`));

    //CSS task
    gulp.src(`${config.basepath.build}/assets/${config.versionName}/**/*.css`, { dot: true })
      .pipe(plugins.postcss([cssnano({
        discardComments: {removeAll: true},
      })]))
      .on('error', console.log)
      .pipe(plugins.insert.prepend(banner))
      .pipe(gulp.dest(`${config.basepath.release}/template-local-ssi/assets/${config.versionName}/`))
      .pipe(gulp.dest(`${config.basepath.release}/template-local/assets/${config.versionName}/`))
      .pipe(gulp.dest(`${config.basepath.static}/assets/${config.versionName}/`));

    //other version assets
    gulp.src(versionAssetsTarget, { dot: true })
      .pipe(gulp.dest(`${config.basepath.release}/template-local-ssi/assets/${config.versionName}/`))
      .pipe(gulp.dest(`${config.basepath.release}/template-local/assets/${config.versionName}/`))
      .pipe(gulp.dest(`${config.basepath.static}/assets/${config.versionName}/`));

    done();
  };
};
