const Router = require('koa-router');
const customer = new Router();
const customerCtrl = require('./customer.controller');

customer.get('/', customerCtrl.list);

module.exports = customer;
