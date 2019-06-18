const { category, department, product } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getCategories = async ctx => {
  const pageSize = 10;
  const page = ctx.request.query.page ? Number(ctx.request.query.page) : 1;
  const offset = (page - 1) * pageSize;
  const limit = ctx.request.query.limit
    ? Number(ctx.request.query.limit)
    : pageSize;
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
    const query = await product.findOne({
      where: { product_id: id },
      include: {
        model: category,
        attributes: ['category_id', 'name', 'department_id'],
        through: { attributes: [] }
      },
      attributes: []
    });
    const data = query.categories[0];
    ctx.body = successMessage('category', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getCategoriesOfDepartment = async ctx => {
  let { id } = ctx.params;
  try {
    const data = await department.findOne({
      where: { department_id: id },
      include: {
        model: category
      },
      attributes: []
    });
    ctx.body = successMessage('category', data);
  } catch (err) {
    ctx.body = errorMessage(err.message);
  }
};
