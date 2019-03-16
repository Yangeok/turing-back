const Router = require('koa-router');
const cart = new Router();
const cartCtrl = require('./cart.controller');

cart.get('/', cartCtrl.list);

module.exports = cart;
