const json = require('koa-json');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const passport = require('koa-passport');

// Utils
const { verifyJwt } = require('../utils/jwt');

// Middlewares
const ignoreRequest = require('./ignoreRequest');
const authenticationConfig = require('./authenticationConfig');
const passportConfig = require('./passportConfig');
const cacheConfig = require('./cacheConfig');
const imageConfig = require('./imageConfig');

const middlewares = app => {
  app.use(cors());
  app.use(helmet());
  app.use(json());
  cacheConfig(app);
  app.use(bodyParser());
  app.use(logger());
  app.use(verifyJwt);
  passportConfig(passport);
  authenticationConfig(app);
  ignoreRequest(app);
  imageConfig(app);
};

module.exports = middlewares;
