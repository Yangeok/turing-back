const Router = require('koa-router');
const product = new Router();
const productCtrl = require('./product.controller');
const { authenticated } = require('../../utils/jwt');

product.get('/', productCtrl.getProducts);
product.get('/search', productCtrl.searchProducts);
product.get('/:id', productCtrl.getProductById);
product.get('/category/:id', productCtrl.getProductsOfCategories);
product.get('/department/:id', productCtrl.getProductsOfDepartment);
product.get('/:id/detail', productCtrl.getProductDetails);
product.get('/:id/location', productCtrl.getProductLocations);
product.get('/:id/review', productCtrl.getProductReviews);
product.post('/:id/review', authenticated, productCtrl.postProductReviews);

module.exports = product;
