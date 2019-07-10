const conditional = require('koa-conditional-get');
const etag = require('koa-etag');

const cacheConfig = app => {
  app.use(conditional());
  app.use(etag());
};

module.exports = cacheConfig;
