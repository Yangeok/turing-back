const Router = require('koa-router');
const department = new Router();
const departmentCtrl = require('./department.controller');

department.get('/', departmentCtrl.getDepartsments);
department.get('/:id', departmentCtrl.getDepartmentById);

module.exports = department;
