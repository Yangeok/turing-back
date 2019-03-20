const Router = require('koa-router');
const cart = new Router();
const cartCtrl = require('./cart.controller');
const { authenticated, verifyJwt } = require('../../utils/jwt');

cart.get('/', verifyJwt, authenticated, cartCtrl.list);

module.exports = cart;
