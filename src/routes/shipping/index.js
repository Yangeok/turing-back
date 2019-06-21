const Router = require('koa-router');
const shipping = new Router();
const shippingCtrl = require('./shipping.controller');

shipping.get('/', shippingCtrl.getShippingRegions);
shipping.get('/:id', shippingCtrl.getShippingRegionById);

module.exports = shipping;
