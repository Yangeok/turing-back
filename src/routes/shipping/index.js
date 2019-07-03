const Router = require('koa-router');
const shipping = new Router();
const shippingCtrl = require('./shipping.controller');

shipping.get('/region/', shippingCtrl.getShippingRegions);
shipping.get('/region/:id', shippingCtrl.getShippingRegionById);

module.exports = shipping;
