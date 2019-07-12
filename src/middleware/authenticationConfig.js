require('dotenv').config();
const env = process.env;
const session = require('koa-session');
const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { hostname, port } = require('../utils/env');
const { customer } = require('../db/models');

const callbackURL = `${hostname}:${port}/customer/facebook/callback`;
const profileFields = ['displayName', 'email'];

const facebook = new FacebookStrategy(
  {
    clientID: env.FACEBOOK_APP_ID,
    clientSecret: env.FACEBOOK_APP_SECRET,
    callbackURL,
    profileFields,
    enableProof: true
  },
  async (token, tokenSecret, profile, done) => {
    const user = await customer.findOne({
      where: { email: profile.emails[0].value },
      plain: true
    });
    if (user) {
      return done(null, user);
    } else if (!user) {
      const data = await customer.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: ''
      });
      return done(null, data);
    }
  }
);

const authenticationConfig = app => {
  app.keys = [env.SESSION_SECRET];
  app.use(session({}, app));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(facebook);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = authenticationConfig;
