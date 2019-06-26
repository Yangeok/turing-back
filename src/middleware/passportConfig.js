require('dotenv').config();
const env = process.env;
const FacebookStrategy = require('passport-facebook').Strategy;
const { hostname, port } = require('../utils/env');

const passportConfig = passport => {
  passport.serializeUser((user, done) => {
    console.log(`serialized user: ${user}`);
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log(`deserialized user: ${user}`);
    done(null, user);
  });
  passport.use(
    new FacebookStrategy(
      {
        clientID: env.FACEBOOK_APP_ID,
        clientSecret: env.FACEBOOK_APP_SECRET,
        callbackURL: `${hostname}:${port}/customer/facebook/callback`
      },
      (token, tokenSecret, profile, done) => {
        console.log(`profile: ${profile}`);
        done(null, profile);
      }
    )
  );
};

module.exports = passportConfig;
