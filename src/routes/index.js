const Router = require('koa-router');
const router = new Router();

const attribute = require('./attribute');
const cart = require('./cart');
const category = require('./category');
const customer = require('./customer');
const department = require('./department');
const home = require('./home');
const order = require('./order');
const payment = require('./payment');
const product = require('./product');
const shipping = require('./shipping');
const tax = require('./tax');

router.use('/attribute', attribute.routes());
router.use('/cart', cart.routes());
router.use('/category', category.routes());
router.use('/customer', customer.routes());
router.use('/department', department.routes());
router.use('/', home.routes());
router.use('/order', order.routes());
router.use('/payment', payment.routes());
router.use('/product', product.routes());
router.use('/shipping', shipping.routes());
router.use('/tax', tax.routes());

const rotuers = app => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};

module.exports = rotuers;
