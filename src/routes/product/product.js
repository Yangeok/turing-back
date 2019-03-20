const Router = require('koa-router');
const product = new Router();
const productCtrl = require('./product.controller');

product.get('/all', productCtrl.allLists);
product.get('/each/:id', productCtrl.list);
product.get('/search', productCtrl.search);
module.exports = product;
