const Router = require('koa-router');
const profile = new Router();
const profileCtrl = require('./profile.controller');
const { authenticated, verifyJwt } = require('../../utils/jwt');

profile.get('/test', verifyJwt, authenticated, profileCtrl.list);

module.exports = profile;
