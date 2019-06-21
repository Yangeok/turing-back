const Router = require('koa-router');
const tax = new Router();
const taxCtrl = require('./tax.controller');

tax.get('/', taxCtrl.getTaxes);
tax.get('/:id', taxCtrl.getTaxById);

module.exports = tax;
