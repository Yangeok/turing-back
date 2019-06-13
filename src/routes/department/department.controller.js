const { department } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getDepartsments = async ctx => {
  try {
    const data = await department.findAll({});
    ctx.body = successMessage('departments', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getDepartmentById = async ctx => {
  const { id } = ctx.params;
  try {
    const da = await department.findByPk(id);
    ctx.body = successMessage('department', da);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
