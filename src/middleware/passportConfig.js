require('dotenv').config();
const env = process.env;
const FacebookStrategy = require('passport-facebook').Strategy;
const { hostname, port } = require('../utils/env');
const { customer } = require('../db/models');

const callbackURL = `${hostname}:${port}/customer/facebook/callback`;
const profileFields = ['displayName', 'email'];

const passportConfig = passport => {
  passport.use(
    new FacebookStrategy(
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
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });
};

module.exports = passportConfig;
