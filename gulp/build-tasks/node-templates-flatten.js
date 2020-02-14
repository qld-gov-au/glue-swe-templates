'use strict';

// Node.js task to convert SSI includes to inline html

const path = require('path');
const ssiToStatic = require('./ssi-to-static.js');

let includeSrc = path.join('build');
let src = path.join('build', 'docs');
let dest = path.join('build', 'docs');
let exclude = [];

ssiToStatic(includeSrc, src, dest, exclude);

ssiToStatic(path.join('build'), path.join('build', 'template-pages'), path.join('build', 'template-pages'), []);
