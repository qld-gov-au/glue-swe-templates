'use strict';
const path        = require('path');

module.exports = function (gulp, plugins, config, argv) {
  return function () {
    let releaseTypes = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'];
    return gulp.src(`${config.basepath.release}/**/*`, { dot: true })
      .pipe(plugins.prompt.prompt([{
         type: 'input',
         name: 'confirmation',
         message: 'Please confirm that you have cloned npm package Github repo(https://github.com/qld-gov-au/web-template-release.git) as a sibling dir to qg-web-template? (y or n)',
        }, {
        type: 'input',
        name: 'confirmation',
        message: 'Please confirm that you want to publish this package on NPM? (y or n)',
      }, {
        type: 'input',
        name: 'logged',
        message: 'Are you logged into the NPM as the correct user (Run \'npm whoami\' to check you logged in as qld gov user)? (y or n)',
      }, {
        type: 'input',
        name: 'releaseType',
        message: 'Select a release type? Ex ' + releaseTypes,
      }],
        function (res) {
          let checkInput = releaseTypes.filter(e => e.match(new RegExp('\\b' + res.releaseType + '\\b')));
          if (/^yes|y$/.test(res.confirmation.toLowerCase()) && /^yes|y$/.test(res.logged.toLowerCase()) && checkInput.length > 0) {
            plugins.shell.task([
              'echo release type "' + res.releaseType + '"',
              process.chdir(path.join('..', 'web-template-release')),
              'sudo cp -a ../qg-web-template/release/. ../web-template-release/',
              'ls',
              'git checkout master',
              'git clean --force -d -q',
              'git pull origin master',
              'git add --all',
              'git commit -m "' + argv.msg + '"',
              'npm version ' + res.releaseType,
              'git push origin master --tags',
              'npm publish'
            ])();
          } else {
            console.log('Please make sure you are logged into the NPM and you have selected a release type');
          }
        }));
  };
};
