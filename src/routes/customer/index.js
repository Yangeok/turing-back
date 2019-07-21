const Router = require('koa-router');
const customer = new Router();
const customerCtrl = require('./customer.controller');
const { authenticated } = require('../../utils/jwt');
const { authFacebook, authFacebookCallback } = require('../../utils/facebook');

customer.put('/', authenticated, customerCtrl.updateCustomer);
customer.get('/', authenticated, customerCtrl.getCustomerById);
customer.post('/', customerCtrl.registerCustomer);
customer.post('/login', customerCtrl.signinCustomer);
customer.get('/facebook', authFacebook);
customer.get(
  '/facebook/callback',
  authFacebookCallback,
  customerCtrl.signinCustomerWithFacebookCallback
);
customer.put('/address', authenticated, customerCtrl.updateAddressFromCustomer);
customer.put(
  '/credit-card',
  authenticated,
  customerCtrl.updateCreditCardFromCustomer
);

customer.delete('/', customerCtrl.deleteCustomer);

module.exports = customer;
