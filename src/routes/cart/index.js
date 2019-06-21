const Router = require('koa-router');
const cart = new Router();
const cartCtrl = require('./cart.controller');
const { authenticated } = require('../../utils/jwt');

cart.get('/generate-unique-id', cartCtrl.genereateUniqueCartId);
cart.post('/add', cartCtrl.addProductInCart);
cart.get('/:cartId', cartCtrl.getProductsInCart);
cart.put('/update/:itemId', cartCtrl.updateCartByItem);
cart.delete('/delete/:cartId', cartCtrl.deleteCart);
cart.get('/move-to-cart/:ItemId', cartCtrl.moveProductToCart);
cart.get('/total-amount/:id', cartCtrl.returnTotalAmountFromCart);
cart.get('/save-for-later/:id', cartCtrl.saveProductForLater);
cart.get('/get-saved/:id', cartCtrl.getProductsForLater);
cart.delete('/remove-product/:id', cartCtrl.deleteProductInCart);

module.exports = cart;
