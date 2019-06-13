const Router = require('koa-router');
const category = new Router();
const cateogryCtrl = require('./category.controller');

category.get('/', cateogryCtrl.getCategories);
category.get('/:id', cateogryCtrl.getCategoryById);
category.get('/product/:id', cateogryCtrl.getCategoriesOfProduct);
category.get('/department/:id', cateogryCtrl.getCategoriesOfDepartment);

module.exports = category;
