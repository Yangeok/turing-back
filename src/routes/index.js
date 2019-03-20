const Router = require('koa-router');
const router = new Router();

const cart = require('./cart/cart');
const category = require('./category/category');
const customer = require('./customer/customer');
const department = require('./department/department');
const home = require('./home/home');
const payment = require('./payment/payment');
const product = require('./product/product');
const profile = require('./profile/profile');

router.use('/', home.routes());
router.use('/cart', cart.routes());
router.use('/category', category.routes());
router.use('/customer', customer.routes());
router.use('/department', department.routes());
router.use('/payment', payment.routes());
router.use('/product', product.routes());
router.use('/profile', profile.routes());

module.exports = router;
