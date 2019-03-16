const Router = require('koa-router');
const payment = new Router();
const paymentCtrl = require('./payment.controller');

payment.get('/', paymentCtrl.list);

module.exports = payment;
