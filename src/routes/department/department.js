const Router = require('koa-router');
const department = new Router();
const departmentCtrl = require('./department.controller');

department.get('/', departmentCtrl.list);

module.exports = department;
