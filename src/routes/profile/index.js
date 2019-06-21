const Router = require('koa-router');
const profile = new Router();
const profileCtrl = require('./profile.controller');
const { authenticated } = require('../../utils/jwt');

profile.get('/', authenticated, profileCtrl.list);
profile.put('/', authenticated, profileCtrl.update);

module.exports = profile;
