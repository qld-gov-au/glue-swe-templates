module.exports = function (gulp, plugins, connect, connectssi, argv, path, randomPort) {
  'use strict';
  return () => {
    let root = argv.root ? path.resolve(argv.root) : path.resolve('build');
    let connectServer = (root, subpath, port) => {
      connect.server({
        root: subpath ? `${root}/${subpath}` : `${root}`,
        port: port || argv.port || 8086,
        livereload: true,
        middleware: function () {
          return [connectssi({
            baseDir: root,
            ext: '.html',
            onlineEncoding: 'utf8',
            localEncoding: 'utf8',
          })];
        },
      });
    };
    if (argv.root === 'release') {
      connectServer(root, 'docs', argv.port);
    } else {
      connectServer(root);
    }
  };
};
