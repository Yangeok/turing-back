const Router = require('koa-router');
const router = new Router();

const attribute = require('./attribute/attribute');
const cart = require('./cart/cart');
const category = require('./category/category');
const customer = require('./customer/customer');
const department = require('./department/department');
const home = require('./home/home');
const order = require('./order/order');
const payment = require('./payment/payment');
const product = require('./product/product');
const profile = require('./profile/profile');
const shipping = require('./shipping/shipping');
const tax = require('./tax/tax');

const { verifyJwt, authenticated } = require('../utils/jwt');

// router.use(verifyJwt);
router.use('/', home.routes());
router.use('/attribute', attribute.routes());
router.use('/cart', cart.routes());
router.use('/category', category.routes());
router.use('/customer', customer.routes());
router.use('/department', department.routes());
router.use('/order', order.routes());
router.use('/payment', payment.routes());
router.use('/product', product.routes());
router.use('/profile', profile.routes());
router.use('/shipping', shipping.routes());
router.use('/tax', tax.routes());

module.exports = router;
