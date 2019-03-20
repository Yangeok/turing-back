const Router = require('koa-router');
const profile = new Router();
const profileCtrl = require('./profile.controller');

profile.get('/', profileCtrl.list);

module.exports = profile;
