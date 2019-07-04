const Router = require('koa-router');
const payment = new Router();
const paymentCtrl = require('./payment.controller');
const {}

payment.post('/charge', paymentCtrl.createCharge);
payment.post('/webhooks', paymentCtrl.provideSync);

module.exports = payment;
