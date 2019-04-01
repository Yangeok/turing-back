const Router = require('koa-router');
const payment = new Router();
const paymentCtrl = require('./payment.controller');
const { authenticated } = require('../../utils/jwt');

payment.get('/region', authenticated, paymentCtrl.shippingRegion);
payment.post('/checkout', authenticated, paymentCtrl.checkout);
payment.post('/test', authenticated, paymentCtrl.test);

module.exports = payment;
