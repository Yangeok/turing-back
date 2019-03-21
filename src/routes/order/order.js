const Router = require('koa-router');
const order = new Router();
const orderCtrl = require('./order.controller');

order.get('/', orderCtrl.allLists);
order.get('/:id', orderCtrl.list);
order.post('/new', orderCtrl.create);
order.put('/:id', orderCtrl.update);
order.delete('/:id', orderCtrl.delete);

module.exports = order;
