const { successMessage } = require('./response');

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
exports.checkoutQuery = (
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
  stripe.customers
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
      customer
        .findOne({
          where: {
            id: customerId
          }
        })
        .then(user => {
          orders.create({
            total_amount: finalPrice / 100,
            status: 1,
            comments: description,
            customer_id: user.id,
            auth_code: ctx.request.body.stripeToken || null,
            reference: payment.balance_transaction,
            shipping_id: shippingId
          });
        })
        .then(() => {
          clearShoppingCart(ctx, next);
          ctx.body = successMessage('message', 'Payment Successful');
        })
        .catch(next);
    })
    .catch(next);
};

exports.clearShoppingCart = async (ctx, next) => {
  const { id } = ctx.request.body;
  await shopping_cart.destroy({
    where: { customer_id: id }
  });
};
