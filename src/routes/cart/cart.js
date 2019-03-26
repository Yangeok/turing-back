const Router = require('koa-router');
const cart = new Router();
const cartCtrl = require('./cart.controller');
const { authenticated } = require('../../utils/jwt');

cart.get('/', authenticated, cartCtrl.list);

module.exports = cart;
