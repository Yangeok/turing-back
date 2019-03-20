const Router = require('koa-router');
const customer = new Router();
const customerCtrl = require('./customer.controller');

customer.post('/login', customerCtrl.login);
customer.post('/signup', customerCtrl.signup);
module.exports = customer;
