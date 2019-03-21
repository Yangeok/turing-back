const Router = require('koa-router');
const tax = new Router();
const taxCtrl = require('./tax.controller');

tax.get('/', taxCtrl.allLists);
tax.get('/:id', taxCtrl.list);
tax.post('/new', taxCtrl.create);
tax.put('/:id', taxCtrl.update);
tax.delete('/:id', taxCtrl.delete);

module.exports = tax;
