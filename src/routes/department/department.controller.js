const { department } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getDepartsments = async ctx => {
  try {
    const data = await department.findAll({});
    ctx.body = successMessage('departments', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getDepartmentById = async ctx => {
  const { id } = ctx.params;
  try {
    const data = await department.findByPk(id);
    ctx.body = successMessage('department', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
