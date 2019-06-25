const Router = require('koa-router');
const customer = new Router();
const customerCtrl = require('./customer.controller');
const { authenticated } = require('../../utils/jwt');

customer.put('/', authenticated, customerCtrl.updateCustomer);
customer.get('/', authenticated, customerCtrl.getCustomerById);
customer.post('/', customerCtrl.registerCustomer);
customer.post('/login', customerCtrl.signinCustomer);
customer.post('/facebook', customerCtrl.signinCustomerWithFacebook);
customer.put('/address', authenticated, customerCtrl.updateAddressFromCustomer);
customer.put(
  '/credit-card',
  authenticated,
  customerCtrl.updateCreditCardFromCustomer
);

module.exports = customer;
