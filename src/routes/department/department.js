const Router = require('koa-router');
const department = new Router();
const departmentCtrl = require('./department.controller');

department.get('/', departmentCtrl.allLists);
department.get('/:id', departmentCtrl.list);
department.post('/new', departmentCtrl.create);
department.put('/:id', departmentCtrl.update);
department.delete('/:id', departmentCtrl.delete);

module.exports = department;
