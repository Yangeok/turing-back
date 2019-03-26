require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { checkoutQuery } = require('../../utils/checkout');
const { shipping, shopping_cart, product } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');

exports.shippingRegion = async ctx => {
  const customer = await stripe.customers.create({
    email: 'wooky92@naver.com'
  });
  ctx.body = customer;
};

exports.checkout = async ctx => {
  const { shippingId, stripeToken, stripeEmail } = req.body;

  Shipping.findByPk(shippingId)
    .then(shipping => {
      if (!shipping) {
        return res.status(400).json({
          message: 'The shipping id provided is invalid, please check again'
        });
      }
      const shippingCost = parseFloat(shipping.shipping_cost);
      const shippingType = shipping.shipping_type;
      ShoppingCart.findAll({
        include: [
          {
            model: Product,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ],
        where: {
          customer_id: ctx.request.user.customerId
        }
      })
        .then(response => {
          const price = [];
          const discount = [];
          const { customerId } = ctx.request.user.customerId;
          response.forEach(item => {
            const currentprice = parseFloat(item.Product.price * item.quantity);
            price.push(currentprice);
            const currentDiscount = parseFloat(item.Product.discounted_price);
            discount.push(currentDiscount);
          });
          const totalPrice = price.reduce((prev, curr) => prev + curr);
          const totalDiscount = discount.reduce((prev, curr) => prev + curr);
          const finalPrice = Math.round(
            (totalPrice + shippingCost - totalDiscount) * 100
          );
          const description = 'Payment for your order on tshirt shop';
          return CheckoutController.checkoutQuery(
            ctx,
            finalPrice,
            description,
            shippingId,
            shippingCost,
            shippingType,
            customerId,
            stripeToken,
            stripeEmail
          );
        })
        .catch(next);
    })
    .catch(next);
};
