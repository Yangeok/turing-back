const { department } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getDepartsments = async ctx => {
  try {
    const departments = await department.findAll({});
    ctx.body = successMessage('departments', departments);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getDepartmentById = async ctx => {
  const { id } = ctx.params;
  try {
    const singleDepartment = await department.findOne({
      id
    });
    ctx.body = successMessage('department', singleDepartment);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
