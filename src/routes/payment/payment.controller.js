require('dotenv').config();
const env = process.env;

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const {
  shipping,
  shopping_cart,
  product,
  customer
} = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { checkoutQuery } = require('../../utils/checkout');
const webhook = require('../../utils/webhook');

exports.createCharge = async (ctx, next) => {
  const { shippingId, stripeToken, stripeEmail, currency } = ctx.request.body;
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
  const hasCart = await shopping_cart.findAll({
    raw: true,
    where: { customer_id: customerId },
    include: { model: product }
  });
  if (!hasCart) {
    ctx.status = 400;
    ctx.body = errorMessage('The cart is empty, please check again');
  }
  const price = [];
  const discountedPrice = [];
  hasCart.forEach(item => {
    const currentprice = Number(item['product.price'] * item.quantity);
    price.push(currentprice);
    const currentDiscountedPrice = Number(
      item['product.discounted_price'] * item.quantity
    );
    discountedPrice.push(currentDiscountedPrice);
  });
  const totalDiscountedPrice = discountedPrice.reduce(
    (prev, curr) => prev + curr
  );
  const finalPrice = Math.round(totalDiscountedPrice + shippingCost);
  const description = 'Payment for your order';
  await checkoutQuery(
    ctx,
    finalPrice,
    description,
    shippingId,
    shippingCost,
    shippingType,
    customerId,
    stripeToken,
    stripeEmail,
    currency,
    next
  );
  ctx.body = successMessage('message', 'successfully completed payment');
};

exports.provideSync = async ctx => {
  const ngrokHostname = '3cdeee07';
  try {
    webhook(ngrokHostname);
    ctx.body = successMessage('webhook', 'successfully webhooks received');
  } catch (e) {
    ctx.status = 400;
    ctx.body = errorMessage(e.message);
  }
};
