const json = require('koa-json');
const cors = require('koa2-cors');
const serve = require('koa-static');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const cache = require('koa-redis-cache');
const { verifyJwt } = require('../utils/jwt');

const middlewares = app => {
  app.use(cors());
  app.use(helmet());
  app.use(json());
  app.use(bodyParser());
  app.use(logger());
  app.use(verifyJwt);
  app.use(serve('src/images/product_images'));
};

module.exports = middlewares;
