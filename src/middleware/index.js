const json = require('koa-json');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const bodyParser = require('koa-body');

// Middlewares
const cacheConfig = require('./cacheConfig');
const authenticationConfig = require('./authenticationConfig');
const imageConfig = require('./imageConfig');
const verifyJwtConfig = require('./verifyJwtConfig');

const middlewares = app => {
  app.use(cors());
  app.use(helmet());
  app.use(json());
  cacheConfig(app);
  app.use(bodyParser());
  process.env.NODE_ENV === 'test' || app.use(logger());
  verifyJwtConfig(app);
  authenticationConfig(app);
  imageConfig(app);
};

module.exports = middlewares;
