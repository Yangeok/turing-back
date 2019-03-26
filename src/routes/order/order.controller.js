const { orders, order_detail } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.allLists = async ctx => {
  try {
    const allOrders = await orders.findAll();
    ctx.body = successMessage('orders', allOrders);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.list = async ctx => {
  let { id } = ctx.params;
  try {
    const singleOrder = await orders.findOne({
      where: { order_id: id }
    });
    ctx.body = successMessage('order', singleOrder);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.create = async ctx => {
  let { cart, user } = ctx.request.body;
  let total = parseFloat(ctx.request.body.totalAmount.toFixed(2));
  try {
    const singleOrder = await orders.cerate({
      total_amount: total,
      created_on: new Date(),
      customer_id: user.customer_id
    });
    ctx.body = successMessage('order', singleOrder);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.update = async ctx => {
  let { id } = ctx.params;
  try {
    const updateOrder = await orders.update(ctx.request.body, {
      returning: true,
      where: { order_id: id }
    });
    const singleOrder = await orders.findOne({
      where: { order_id: id }
    });
    ctx.body = successMessage('order', [updateOrder, singleOrder]);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.delete = async ctx => {
  let { id } = ctx.params;
  try {
    const singleOrder = await orders.destroy({
      where: { order_id: id }
    });
    if (singleOrder == 1) {
      ctx.body = successMessage('message', `Order id ${id} is deleted`);
    } else {
      ctx.status = 400;
      ctx.body = errorMessage(`Order id ${id} is already deleted`);
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
