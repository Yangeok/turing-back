const Router = require('koa-router');
const category = new Router();
const cateogryCtrl = require('./category.controller');

category.get('/', cateogryCtrl.list);

module.exports = category;
