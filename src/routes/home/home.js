const Router = require('koa-router');
const home = new Router();
const homeCtrl = require('./home.controller');

home.get('/', homeCtrl.list);

module.exports = home;
