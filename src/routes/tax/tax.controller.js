const { tax } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.getTaxes = async ctx => {
  try {
    const data = await tax.findAll();
    ctx.body = successMessage('tax', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getTaxById = async ctx => {
  const { id } = ctx.params;
  try {
    const data = await tax.findOne({
      where: { tax_id: id }
    });
    ctx.body = successMessage('tax', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
