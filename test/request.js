const { port } = require('../src/utils/env');
const app = require('../src/app').listen(port);

module.exports = app;
