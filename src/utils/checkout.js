require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { successMessage } = require('./response');
const { customer, orders, shopping_cart } = require('../db/models');

/**
 * @param {*} ctx
 * @param {*} finalPrice
 * @param {*} description
 * @param {*} shippingId
 * @param {*} shippingCost
 * @param {*} shippingType
 * @param {*} customerId
 * @param {*} stripeToken
 * @param {*} stripeEmail
 * @param {*} next
 */
exports.checkoutQuery = async (
  ctx,
  finalPrice,
  description = null,
  shippingId,
  shippingCost,
  shippingType,
  customerId,
  stripeToken,
  stripeEmail,
  next
) => {
  await stripe.customers
    .create({
      email: stripeEmail,
      source: stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount: finalPrice,
        currency: 'usd',
        customer: customer.id
      })
    )
    .then(payment => {
      // Mailer.sendOrderConfirmation(customerId, shippingCost, shippingType);
      return customer
        .findOne({
          where: {
            customer_id: customerId
          }
        })
        .then(user =>
          orders.create({
            total_amount: finalPrice / 100,
            status: 1,
            comments: description,
            customer_id: user.customer_id,
            auth_code: ctx.request.body.stripeToken || null,
            reference: payment.balance_transaction,
            shipping_id: shippingId
          })
        )
        .then(() => clearShoppingCart(ctx, next));
    })
    .catch(next);
};

const clearShoppingCart = async (ctx, next) => {
  const { id } = ctx.request.user;
  await shopping_cart.destroy({
    where: { customer_id: id }
  });

  next();
};
