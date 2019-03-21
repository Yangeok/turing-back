const Router = require('koa-router');
const product = new Router();
const productCtrl = require('./product.controller');

product.get('/', productCtrl.allLists);
product.get('/:id', productCtrl.list);
product.get('/search', productCtrl.search);
product.post('/new', productCtrl.create);
product.put('/:id', productCtrl.update);
product.delete('/:id', productCtrl.delete);

module.exports = product;
