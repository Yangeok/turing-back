const Router = require('koa-router');
const category = new Router();
const cateogryCtrl = require('./category.controller');

category.get('/', cateogryCtrl.allLists);
category.get('/:id', cateogryCtrl.list);
category.post('/new', cateogryCtrl.create);
category.put('/:id', cateogryCtrl.update);
category.delete('/:id', cateogryCtrl.delete);

module.exports = category;
