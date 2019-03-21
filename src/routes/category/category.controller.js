const { category } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.allLists = async ctx => {
  // ctx.body = ctx.request.user;
  try {
    const categories = await category.findAll();
    ctx.body = categories;
    // ctx.body = successMessage('categories', categories);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.list = async ctx => {
  let id = ctx.params.id;
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
