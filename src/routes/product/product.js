const Router = require('koa-router');
const product = new Router();
const productCtrl = require('./product.controller');

product.get('/', productCtrl.list);

module.exports = product;
