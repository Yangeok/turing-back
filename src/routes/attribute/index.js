const Router = require('koa-router');
const attribute = new Router();
const attributeCtrl = require('./attribute.controller');

attribute.get('/', attributeCtrl.getAttributes);
attribute.get('/:id', attributeCtrl.getAttribute);
attribute.get('/value/:id', attributeCtrl.getValuesFromAttribute);
attribute.get('/product/:id', attributeCtrl.getAttributesWithProductId);

module.exports = attribute;
