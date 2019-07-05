require('dotenv').config();
const env = process.env;
const { shipping, shopping_cart, product } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { checkoutQuery } = require('../../utils/checkout');
const webhook = require('../../utils/webhook');

exports.createCharge = async (ctx, next) => {
  // const data = await customer.findOne({
  //   where: { customer_id: ctx.request.user.id }
  // });

  // ctx.body = data;
  const { shippingId, stripeToken, stripeEmail } = ctx.request.body;

  const hasShipping = await shipping.findOne({
    plain: true,
    where: { shipping_id: shippingId }
  });
  if (!hasShipping) {
    ctx.status = 400;
    ctx.body = errorMessage(
      'The shipping id provided is invalid, please check again'
    );
  }

  const shippingCost = hasShipping.shipping_cost;
  const shippingType = hasShipping.shipping_type;
  const customerId = ctx.request.user.id;
  const query = await shopping_cart.findAll({
    raw: true,
    where: { customer_id: customerId },
    include: { model: product }
  });
  const price = [];
  const discountedPrice = [];
  query.forEach(item => {
    const currentprice = Number(item['product.price'] * item.quantity);
    price.push(currentprice);
    const currentDiscountedPrice = Number(
      item['product.discounted_price'] * item.quantity
    );
    discountedPrice.push(currentDiscountedPrice);
  });

  const totalPrice = price.reduce((prev, curr) => prev + curr);
  const totalDiscountedPrice = discountedPrice.reduce(
    (prev, curr) => prev + curr
  );
  const finalPrice = Math.round(totalDiscountedPrice + shippingCost);
  const description = 'Payment for your order on tshirt shop';
  checkoutQuery(
    ctx,
    finalPrice,
    description,
    shippingId,
    shippingCost,
    shippingType,
    customerId,
    stripeToken,
    stripeEmail,
    next
  );

  ctx.body = successMessage('message', 'Payment Successful');
};

exports.provideSync = async ctx => {
  try {
    ctx.body = successMesage('webhook', webhook(ctx));
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
