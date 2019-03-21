const Router = require('koa-router');
const shipping = new Router();
const shippingCtrl = require('./shipping.controller');

shipping.get('/', shippingCtrl.allLists);
shipping.get('/:id', shippingCtrl.list);
shipping.post('/new', shippingCtrl.create);
shipping.put('/:id', shippingCtrl.update);
shipping.delete('/:id', shippingCtrl.delete);

module.exports = shipping;
