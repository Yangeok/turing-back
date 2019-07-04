require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { shipping, shopping_cart, product } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { checkoutQuery } = require('../../utils/checkout');

exports.createCharge = async ctx => {
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
  const query = await product.findAll({
    plain: true,
    include: {
      model: shopping_cart,
      where: {
        customer_id: customerId
      }
    }
  });
  const price = [];
  const discount = [];
  ctx.body = query;

  // query.forEach(item => {
  //   const currentprice = Number(item.product.price * item.quantity);
  //   price.push(currentprice);
  //   const currentDiscount = Number(item.product.discounted_price);
  //   discount.push(currentDiscount);
  // });

  // const totalPrice = price.reduce((prev, curr) => prev + curr);
  // const totalDiscount = discount.reduce((prev, curr) => prev + curr);
  // const finalPrice = Math.round(
  //   (totalPrice + shippingCost - totalDiscount) * 100
  // );
  // const description = 'Payment for your order on tshirt shop';
  // checkoutQuery(
  //   ctx,
  //   finalPrice,
  //   description,
  //   shippingId,
  //   shippingCost,
  //   shippingType,
  //   customerId,
  //   stripeToken,
  //   stripeEmail
  // );
};

exports.provideSync = async ctx => {
  ctx.body = 'webhooks';
};
