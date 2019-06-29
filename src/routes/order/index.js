const Router = require('koa-router');
const order = new Router();
const orderCtrl = require('./order.controller');
const { authenticated } = require('../../utils/jwt');

order.post('/', authenticated, orderCtrl.createOrder);
order.get('/:id', authenticated, orderCtrl.getOrder);
order.get('/customer', authenticated, orderCtrl.getOrdersByCustomer);
order.get('/detail/:id', authenticated, orderCtrl.getOrderDetail);

module.exports = order;
