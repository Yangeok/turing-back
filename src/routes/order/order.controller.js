const { orders, order_detail } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.createOrder = async ctx => {
  const { shipping_id, tax_id } = ctx.request.body;
  const { customer_id } = ctx.request.user;
  try {
    const data = await orders.create({
      shipping_id,
      tax_id,
      customer_id
    });
    ctx.body = successMessage('order', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getOrder = async ctx => {
  const { id } = ctx.params;
  try {
    const data = await order_detail.findOne({
      where: { order_id: id }
    });
    ctx.body = successMessage('order', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getOrdersByCustomer = async ctx => {
  const id = ctx.request.user.id;
  try {
    const data = await orders.findOne({
      where: { order_id: id }
    });
    ctx.body = successMessage('order', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};

exports.getOrderDetail = async ctx => {
  const { id } = ctx.params;

  try {
    const data = await orders.findOne({
      where: { order_id: id }
    });
    ctx.body = successMessage('order', data);
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
