const {
  attribute,
  attribute_value,
  product_attribute
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getAttributes = async ctx => {
  try {
    const data = await attribute.findAll();
    ctx.body = successMessage('attributes', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getAttribute = async ctx => {
  let { id } = ctx.params;

  try {
    const data = await attribute.findOne({
      where: { attribute_id: id }
    });
    ctx.body = successMessage('attribute', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
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
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getAttributesWithProductId = async ctx => {
  let { id } = ctx.params;

  try {
    const data = await product_attribute.findAll({
      where: { product_id: id }
    });
    ctx.body = successMessage('attributes', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
