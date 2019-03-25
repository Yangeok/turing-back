const { category, department } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.allLists = async ctx => {
  try {
    const categories = await category.findAll();
    ctx.body = successMessage('categories', categories);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.list = async ctx => {
  let { id } = ctx.params;
  try {
    const singleCategory = await category.findByPk(id, {
      include: [
        {
          model: department
        }
      ]
    });
    ctx.body = successMessage('category', singleCategory);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.create = async ctx => {
  try {
    const singleCategory = await category.create(ctx.request.body);
    ctx.body = successMessage('category', singleCategory);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.update = async ctx => {
  let { id } = ctx.params;
  try {
    const updateCategory = await category.update(ctx.request.body, {
      returning: true,
      where: { category_id: id }
    });
    const singleCategory = await category.findOne({
      where: { category_id: id }
    });
    ctx.body = successMessage('category', [updateCategory, singleCategory]);
  } catch (err) {
    ctx.body = errorMessage(err.message);
  }
};

exports.delete = async ctx => {
  let { id } = ctx.params;
  try {
    const singleCategory = await category.destroy({
      where: { category_id: id }
    });
    if (singleCategory == 1) {
      ctx.body = successMessage('message', `Category id ${id} is deleted`);
    } else {
      ctx.body = 400;
      ctx.body = errorMessage(`Category id ${id} is already deleted`);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
