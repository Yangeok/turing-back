const Router = require('koa-router');
const cart = new Router();
const cartCtrl = require('./cart.controller');

cart.get('/gen-id', cartCtrl.genereateUniqueCartId);
cart.post('/add', cartCtrl.addProductInCart);
cart.get('/:id', cartCtrl.getProductsInCart);
cart.put('/update/:id', cartCtrl.updateCartByItem);
cart.delete('/delete/:id', cartCtrl.deleteCart);
cart.get('/move-to-cart/:id', cartCtrl.moveProductToCart);
cart.get('/total-amount/:id', cartCtrl.returnTotalAmountFromCart);
cart.get('/save-for-later/:id', cartCtrl.saveProductForLater);
cart.get('/get-saved/:id', cartCtrl.getProductsForLater);
cart.delete('/remove-product/:id', cartCtrl.deleteProductInCart);

module.exports = cart;
