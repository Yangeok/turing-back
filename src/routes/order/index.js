const Router = require('koa-router');
const order = new Router();
const orderCtrl = require('./order.controller');

order.post('/', orderCtrl.createOrder);
order.get('/:id', orderCtrl.getOrder);
order.get('/customer', orderCtrl.getOrdersByCustomer);
order.get('/detail/:id', orderCtrl.getOrderDetail);
module.exports = order;
