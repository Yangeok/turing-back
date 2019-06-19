const {
  attribute,
  attribute_value,
  product,
  product_attribute
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getAttributes = async ctx => {
  try {
    const data = await attribute.findAll();

    ctx.body = successMessage('attributes', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getAttribute = async ctx => {
  let { id } = ctx.params;
  try {
    const data = await attribute.findOne({
      where: { attribute_id: id }
    });
    ctx.body = successMessage('attribute', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getValuesFromAttribute = async ctx => {
  let { id } = ctx.params;
  try {
    const query = await attribute.findOne({
      where: { attribute_id: id },
      include: { model: attribute_value }
    });
    const data = query.attribute_values;
    ctx.body = successMessage('attribute_values', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getAttributesWithProductId = async ctx => {
  let { id } = ctx.params;
  try {
    const data = await product_attribute.findAll({
      where: { product_id: id }
    });
    ctx.body = successMessage('attributes', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
