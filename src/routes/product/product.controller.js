const {
  category,
  product_category,
  product,
  department,
  Sequelize,
  sequelize
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const Op = Sequelize.Op;

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
    ctx.body = successMessage('products', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.searchProducts = async ctx => {
  const pageSize = 20;
  const query_string = ctx.request.query.query_string;
  const all_words = ctx.request.query.all_words
    ? Boolean(ctx.request.query.all_words)
    : on;
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
      where: {
        [Op.or]: [
          { description: { [Op.like]: `%${query_string}%` } },
          { name: { [Op.like]: `%${query_string}%` } }
        ]
      },
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
    ctx.body = successMessage('products', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductById = async ctx => {
  let { id } = ctx.params;
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
    const data = await product.findOne({
      where: { product_id: id }
    });
    ctx.body = successMessage('products', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductsOfCategories = async ctx => {
  const pageSize = 20;
  const { id } = ctx.params;
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
            sequelize.col('product.description'),
            1,
            description_length
          ),
          'description'
        ],
        'price',
        'discounted_price',
        'thumbnail'
      ],
      include: {
        model: category,
        where: { category_id: id },
        attributes: []
      }
    });
    ctx.body = successMessage('products', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductsOfDepartment = async ctx => {
  let { id } = ctx.params;
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
            sequelize.col('product.description'),
            1,
            description_length
          ),
          'description'
        ],
        'price',
        'discounted_price',
        'thumbnail'
      ],
      include: [
        {
          model: category,
          attributes: [],
          include: { model: department, where: { department_id: id } }
        }
      ]
    });
    ctx.body = successMessage('product', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductDetails = async ctx => {
  let { id } = ctx.params;

  try {
    const data = await product.findOne({
      attributes: [
        'product_id',
        'name',
        'description',
        'price',
        'discounted_price',
        'image',
        'image_2'
      ],
      where: { product_id: id }
    });
    ctx.body = successMessage('product', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getProductLocations = async ctx => {
  const concat = (x, y) => x.concat(y);

  const flatMap = (f, xs) => xs.map(f).reduce(concat, []);

  Array.prototype.flatMap = function(f) {
    return flatMap(f, this);
  };

  let { id } = ctx.params;
  try {
    const query = await product.findOne({
      where: { product_id: id },
      include: {
        model: category,
        attributes: ['category_id', ['name', 'category_name']],
        include: {
          model: department,
          attributes: ['department_id', ['name', 'department_name']]
        }
      },
      attributes: []
    });
    const data = query.categories;
    ctx.body = successMessage('product', data);
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
