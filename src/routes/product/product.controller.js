const {
  category,
  product_category,
  product,
  department,
  Sequelize,
  sequelize
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getProducts = async ctx => {
  const pageSize = 20;
  const page = ctx.request.query.page ? Number(ctx.request.query.page) : 1;
  const limit = ctx.request.query.limit
    ? Number(ctx.request.query.limit)
    : pageSize;
  const description_length = ctx.request.query.description_length
    ? Number(ctx.request.query.description_length)
    : 200;

  const offset = ctx.request.query.offset
    ? Number(ctx.request.query.offset) + (page - 1)
    : (page - 1) * pageSize;

  try {
    const data = await product.findAndCountAll({
      limit,
      offset,
      attributes: [
        'product_id',
        'name',
        [
          sequelize.fn(
            'substring',
            sequelize.col('description'),
            1,
            description_length
          ),
          'description'
        ],
        'price',
        'discounted_price',
        'thumbnail'
      ]
    });

    const { count } = data;
    const pageLimit = ctx.request.query.limit
      ? Number(ctx.request.query.limit)
      : 20;
    const pageOffset = ctx.request.query.offset
      ? Number(ctx.request.query.offset)
      : 0;
    const totalCurrent = page * pageSize - pageSize + pageOffset + pageLimit;
    const hasNext = totalCurrent < count ? true : false;
    ctx.body = successMessage(
      'data',
      data
      // {
      //   products: data,
      //   hasNext
      // }
    );
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

// exports.s = async ctx => {
//   const pageSize = 20;
//   const page = ctx.request.query.page ? Number(ctx.request.query.page) : 1;
//   const offset = ctx.request.query.offset
//     ? Number(ctx.request.query.offset) + (page - 1)
//     : (page - 1) * pageSize;
//   const limit = Number(ctx.request.query.limit) || pageSize;
//   const category_name = ctx.request.query.category_name
//     ? { name: decodeURI(ctx.request.query.category_name) }
//     : null;
//   const department_name = ctx.request.query.department_name
//     ? { name: decodeURI(ctx.request.query.department_name) }
//     : null;

//   try {
//     const products = await product_category.findAndCountAll({
//       limit,
//       offset,
//       include: [
//         { model: product },
//         {
//           model: category,
//           where: category_name,
//           include: [
//             {
//               model: department,
//               where: department_name
//             }
//           ]
//         }
//       ]
//     });

//     const { count } = products;
//     const pageLimit = ctx.request.query.limit
//       ? Number(ctx.request.query.limit)
//       : 10;
//     const pageOffset = ctx.request.query.offset
//       ? Number(ctx.request.query.offset)
//       : 0;
//     const totalCurrent = page * pageSize - pageSize + pageOffset + pageLimit;
//     const hasNext = totalCurrent < count ? true : false;
//     ctx.body = successMessage('data', {
//       products: products,
//       hasNext
//     });
//   } catch (err) {
//     ctx.status = 400;
//     ctx.body = errorMessage(err.message);
//   }
// };

exports.searchProducts = async ctx => {
  let { term } = ctx.request.query;
  try {
    const result = await product.findAll(
      {
        where: Sequelize.literal(
          `MATCH (name, description) AGAINST('${decodeURI(
            term
          )}' IN NATURAL LANGUAGE MODE)`
        )
      },
      { include: [{ model: category }] }
    );
    ctx.body = successMessage('product', result);
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductById = async ctx => {
  let { id } = ctx.params;
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

exports.getProductsOfCategories = async ctx => {
  try {
    const singleProduct = await product.create(ctx.request.body);
    const createProductCategory = await product_category.create({
      product_id: singleProduct.product_id,
      category_id: ctx.request.body.category_id
    });
    ctx.body = successMessage('product', [
      singleProduct,
      { category_id: createProductCategory.category_id }
    ]);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductsOfDepartment = async ctx => {
  let { id } = ctx.params;
  try {
    const updateProduct = await product.update(ctx.request.body, {
      returning: true,
      where: { product_id: id }
    });
    const singleProduct = await product.findOne({
      where: { product_id: id }
    });
    ctx.body = successMessage('product', [updateProduct, singleProduct]);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductDetails = async ctx => {
  let { id } = ctx.params;
  try {
    const singleProduct = await product.destroy({ where: { product_id: id } });
    if (singleProduct == 1) {
      ctx.body = successMessage('message', `Product id ${id} is deleted`);
    } else {
      ctx.status = 400;
      ctx.body = errorMessage(`Product id ${id} is already deleted`);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductLocations = async ctx => {
  let { id } = ctx.params;
  try {
    const singleProduct = await product.destroy({ where: { product_id: id } });
    if (singleProduct == 1) {
      ctx.body = successMessage('message', `Product id ${id} is deleted`);
    } else {
      ctx.status = 400;
      ctx.body = errorMessage(`Product id ${id} is already deleted`);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductReviews = async ctx => {
  let { id } = ctx.params;
  try {
    const singleProduct = await product.destroy({ where: { product_id: id } });
    if (singleProduct == 1) {
      ctx.body = successMessage('message', `Product id ${id} is deleted`);
    } else {
      ctx.status = 400;
      ctx.body = errorMessage(`Product id ${id} is already deleted`);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.postProductReviews = async ctx => {
  let { id } = ctx.params;
  try {
    const singleProduct = await product.destroy({ where: { product_id: id } });
    if (singleProduct == 1) {
      ctx.body = successMessage('message', `Product id ${id} is deleted`);
    } else {
      ctx.status = 400;
      ctx.body = errorMessage(`Product id ${id} is already deleted`);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
