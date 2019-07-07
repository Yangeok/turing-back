const passport = require('koa-passport');

const authFacebook = passport.authenticate('facebook', { scope: ['email'] });

const authFacebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/login'
});

module.exports = {
  authFacebook,
  authFacebookCallback
};
