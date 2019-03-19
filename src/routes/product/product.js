const Router = require('koa-router');
const product = new Router();
const productCtrl = require('./product.controller');

product.get('/', productCtrl.allLists);
product.get('/list', productCtrl.list);
product.get('/search', productCtrl.search);
module.exports = product;
