const Router = require('koa-router');
const customer = new Router();
const customerCtrl = require('./customer.controller');

customer.put('/', customerCtrl.updateCustomer);
customer.get('/', customerCtrl.getCustomerById);
customer.post('/', customerCtrl.registerCustomer);
customer.post('/login', customerCtrl.signinCustomer);
customer.post('/facebook', customerCtrl.signinCustomerWithFacebook);
customer.put('/address', customerCtrl.updateAddressFromCustomer);
customer.put('/credit', customerCtrl.updateCreditCardFromCustomer);

module.exports = customer;
