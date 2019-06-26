const cache = require('koa-redis-cache');

const options = {
  expire: 1,
  routes: '/category'
};

const cacheConfig = app => {
  app.use(cache(options));
};

module.exports = cacheConfig;
