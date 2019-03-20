const { category } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.list = async ctx => {
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
