const {
  category,
  department,
  product_category,
  product
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getCategories = async ctx => {
  const pageSize = 10;
  const page = ctx.request.query.page ? Number(ctx.request.query.page) : 1;
  const offset = (page - 1) * pageSize;
  const limit = Number(ctx.request.query.limit) || pageSize;
  try {
    const data = await category.findAll({
      offset,
      limit
    });
    ctx.body = successMessage('categories', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getCategoryById = async ctx => {
  let { id } = ctx.params;
  try {
    const data = await category.findByPk(id);
    ctx.body = successMessage('category', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getCategoriesOfProduct = async ctx => {
  const { id } = ctx.params;
  try {
    const data = await product.findOne({
      where: { product_id: id },
      include: [
        {
          model: product_category
        }
      ]
    });
    // const data = await product_category.findAll({
    //   include: [{ model: product }, { model: category }]
    // });
    ctx.body = successMessage('category', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getCategoriesOfDepartment = async ctx => {
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
