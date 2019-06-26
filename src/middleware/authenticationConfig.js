require('dotenv').config();
const env = process.env;
const session = require('koa-session');
const passport = require('koa-passport');

const authenticationConfig = app => {
  app.keys = [env.SESSION_SECRET];
  app.use(session({}, app));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = authenticationConfig;
