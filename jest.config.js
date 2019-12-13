module.exports = {
  globalSetup: './e2e/config/setup.js',
  globalTeardown: './e2e/config/teardown.js',
  testEnvironment: './e2e/config/puppeteer_environment.js',
  'reporters': [ 'default', 'jest-junit' ],
};

