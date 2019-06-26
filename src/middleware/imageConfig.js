const serve = require('koa-static');

const imageConfig = app => {
  app.use(serve('src/images/product_images'));
};

module.exports = imageConfig;
