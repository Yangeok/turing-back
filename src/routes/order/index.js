const Router = require('koa-router');
const order = new Router();
const orderCtrl = require('./order.controller');
const { authenticated } = require('../../utils/jwt');

order.post('/', authenticated, orderCtrl.createOrder);
order.get('/customer', authenticated, orderCtrl.getOrdersByCustomer);
order.get('/detail/:id', authenticated, orderCtrl.getOrderDetail);
order.get('/:id', authenticated, orderCtrl.getOrder);

module.exports = order;
