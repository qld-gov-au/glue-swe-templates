'use strict';

// Node.js task to convert SSI includes to inline html
// const path = require('path');

module.exports = function (includeSrc, src, dest, exclude) {
  const SSI  = require('node-ssi');
  const fsPath = require('fs-path');
  // const path = require('path');
  const ssi    = new SSI({
    encoding: 'utf-8',
    baseDir: includeSrc, // Source of includes
  });

  const folder = {
    src: src, // Source path, use path.join
    exclude: exclude,
    build: dest, // Destination path, use path.join
  };

  fsPath.find(folder.src, function (filepath, stats, filename) {
    // filters only html files and excludes folders assigned to folder.exclude
    if ((stats === 'file' && /\.html$/.test(filename)) || (stats === 'directory' && folder.exclude.indexOf(filename) < 0)) {
      return true;
    }
    return false;
  }, function (err, list) {
    if (err) return;
    list.files.forEach(function (file) {
      //iterates through list of filtered files
      ssi.compileFile(file, function (err, content) {
        if (err) {
          console.error(err);
          return;
        }
        //builds destination filepath
        var buildFile = file.replace(folder.src, folder.build);
        fsPath.writeFile(buildFile, content, function (err) {
          if (err) {
            console.error(err);
          } else {
            // console.log(buildFile + ' - Done');
          }
        });
      });
    });
  });
};

// fromDir(folder.src);
