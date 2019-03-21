const Router = require('koa-router');
const attribute = new Router();
const attributeCtrl = require('./attribute.controller');

attribute.get('/', attributeCtrl.allLists);
attribute.get('/:id', attributeCtrl.list);
attribute.post('/new', attributeCtrl.create);
attribute.put('/:id', attributeCtrl.update);
attribute.delete('/:id', attributeCtrl.delete);

module.exports = attribute;
