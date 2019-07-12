const sendOrderConfirmation = require('./mailer');

/**
 *
 * @param {*} ctx
 * @param {*} finalPrice
 * @param {*} description
 * @param {*} shippingId
 * @param {*} shippingCost
 * @param {*} shippingType
 * @param {*} customerId
 * @param {*} stripeToken
 * @param {*} stripeEmail
 * @param {*} currency
 * @param {*} customer
 * @param {*} orders
 * @param {*} stripe
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
  currency,
  customer,
  orders,
  stripe,
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
        currency,
        customer: customer.id
      })
    )
    .then(async payment => {
      sendOrderConfirmation(customerId, shippingCost, shippingType);
      await customer
        .findOne({
          where: {
            customer_id: customerId
          }
        })
        .then(async user => {
          await orders.create({
            total_amount: finalPrice / 100,
            status: 1,
            comments: description,
            customer_id: user.customer_id,
            auth_code: ctx.request.body.stripeToken || null,
            reference: payment.balance_transaction,
            shipping_id: shippingId
          });
        });
      // .then(() => clearShoppingCart(ctx, next));
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
