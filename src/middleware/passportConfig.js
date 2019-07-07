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
      (token, tokenSecret, profile, done) => {
        console.log('profile: ');
        console.log(profile);
        return done(null, profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    console.log('serialized user: ');
    console.log(user);
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    console.log('deserialized user: ');
    console.log(user);

    try {
      const data = await customer.findOne({ where: { customer_id: user } });
      done(null, data);
    } catch (err) {
      done(err, null);
    }
  });
};

module.exports = passportConfig;
