const { department, category } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.allLists = async ctx => {
  try {
    const departments = await department.findAll({
      include: [
        {
          model: category
        }
      ]
    });
    ctx.body = successMessage('departments', departments);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.list = async ctx => {
  ctx.body = 'list';
};

exports.create = async ctx => {
  ctx.body = 'create';
};

exports.update = async ctx => {
  let id = ctx.params.id;
  ctx.body = 'update';
};

exports.delete = async ctx => {
  let id = ctx.params.id;
  ctx.body = 'delete';
};
