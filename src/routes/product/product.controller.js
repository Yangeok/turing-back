const {
  category,
  product_category,
  product,
  department,
  Sequelize
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.allLists = async ctx => {
  ctx.body = 'allLists';
};
exports.list = async ctx => {
  ctx.body = 'list';
};
exports.search = async ctx => {
  console.log(ctx.request.query.term);
  try {
    const result = await product.find({
      where: Sequelize.literal(
        `MATCH (name, description) AGAINST('${decodeURI(
          ctx.request.query.term
        )}' IN NATURAL LANGUAGE MODE)`
      ),
      include: [{ model: category }]
    });

    console.log(result);
    ctx.body = successMessage('product', result);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage('no product found');
  }
};
