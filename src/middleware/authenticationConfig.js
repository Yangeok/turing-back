const session = require('koa-session');
const passport = require('koa-passport');

const authenticationConfig = app => {
  app.keys = ['super-secret-key'];
  app.use(session({}, app));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = authenticationConfig;
