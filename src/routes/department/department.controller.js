const { department } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.list = async ctx => {
  try {
    const departments = await department.findAll();
    ctx.body = successMessage('departments', departments);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
