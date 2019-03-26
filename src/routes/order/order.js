const Router = require('koa-router');
const order = new Router();
const orderCtrl = require('./order.controller');
const { authenticated } = require('../../utils/jwt');

order.get('/', authenticated, orderCtrl.allLists);
order.get('/:id', authenticated, orderCtrl.list);
order.post('/new', authenticated, orderCtrl.create);
order.put('/:id', authenticated, orderCtrl.update);
order.delete('/:id', authenticated, orderCtrl.delete);

module.exports = order;
