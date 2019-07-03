const { shipping, shipping_region } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getShippingRegions = async ctx => {
  try {
    const data = await shipping_region.findAll();
    ctx.body = successMessage('shipping', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getShippingRegionById = async ctx => {
  const { id } = ctx.params;
  try {
    const data = await shipping_region.findOne({
      where: { shipping_region_id: id }
    });
    ctx.body = successMessage('shipping', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
