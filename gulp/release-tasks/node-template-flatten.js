'use strict';

// Node.js task to convert SSI includes to inline html

const path = require('path');
const ssiToStatic = require('../build-tasks/ssi-to-static.js');

// needs ASIF resolve SSI in build folder , this is required on deploying to S3 bucket
ssiToStatic(path.join('release', 'template-cdn-ssi'), path.join('release', 'template-cdn-ssi'), path.join('release', 'template-cdn'), []);
ssiToStatic(path.join('release', 'template-local-ssi'), path.join('release', 'template-local-ssi'), path.join('release', 'template-local'), []);
