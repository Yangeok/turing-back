const {
  category,
  product_category,
  product,
  department,
  Sequelize
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

/**
 * [Example: http://localhost/product/all?page=1&limit=10&offset=0&category_name=Animal&department_name=Nature]
 */
exports.allLists = async ctx => {
  const pageSize = 10;
  const page = ctx.request.query.page ? Number(ctx.request.query.page) : 1;
  const offset = ctx.request.query.offset
    ? Number(ctx.request.query.offset) + (page - 1)
    : (page - 1) * pageSize;
  const limit = Number(ctx.request.query.limit) || pageSize;
  const category_name = ctx.request.query.category_name
    ? { name: decodeURI(ctx.request.query.category_name) }
    : null;
  const department_name = ctx.request.query.department_name
    ? { name: decodeURI(ctx.request.query.department_name) }
    : null;
  try {
    const products = await product_category.findAndCountAll({
      limit,
      offset,
      include: [
        { model: product },
        {
          model: category,
          where: category_name,
          include: [
            {
              model: department,
              where: department_name
            }
          ]
        }
      ]
    });

    const { count } = products;
    const pageLimit = ctx.request.query.limit
      ? Number(ctx.request.query.limit)
      : 10;
    const pageOffset = ctx.request.query.offset
      ? Number(ctx.request.query.offset)
      : 0;
    const totalCurrent = page * pageSize - pageSize + pageOffset + pageLimit;
    const hasNext = totalCurrent < count ? true : false;
    ctx.body = successMessage('data', {
      products: products,
      hasNext
    });
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

/**
 * [Example: http://localhost/product/each/1]
 */
exports.list = async ctx => {
  let id = ctx.params.id;
  try {
    const singleProduct = await product.findByPk(decodeURI(id), {
      include: [
        {
          model: category,
          include: [
            {
              model: department
            }
          ]
        }
      ]
    });
    ctx.body = successMessage('product', singleProduct);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

/**
 * [Example: http://localhost/product/search?term=love]
 */
exports.search = async ctx => {
  let term = ctx.request.query.term;
  try {
    const result = await product.findAll(
      {
        where: Sequelize.literal(
          `MATCH (name, description) AGAINST('${decodeURI(
            term
          )}' IN NATURAL LANGUAGE MODE)`
        )
      }
      // { include: [{ model: category }] }
    );
    ctx.body = successMessage('product', result);
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
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
