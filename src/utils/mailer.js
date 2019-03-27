require('dotenv').config();
const nodemailer = require('nodemailer');
const env = process.env;
const { shipping_cart, product, customer } = require('../db/models');

let transport = nodemailer.createTransport({
  service: env.EMAIL_PROVIDER,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  }
});

/**
 *
 * @param {String} emailAddress Email address of the customer
 * @param {String} mailSubject Subject of the email
 * @param {String} mailBody body of the email
 *
 * @returns {*} Sends email
 */
const emailSender = async (emailAddress, mailSubject, mailBody) => {
  let emailOption = {
    from: 'Turing Store',
    to: emailAddress,
    subject: mailSubject,
    html: `
    <h3 style="padding: .5em;">
      Turing Store
    </h3>
    <div style="padding: .5em;">
      ${mailBody}
    </div>
    <p style="padding: .5em;">
      Note if you didn't place this order, please reply to this email with your complaint
    </p>
    `
  };

  return transport.sendMail(emailOption, (err, info) => {
    if (err) {
      console.log('nodemailer error: ' + err);
    } else {
      console.log('nodemailer info: ' + info);
    }
  });
};

/**
 *
 * @param {*} customerId Id of the customer placing the order
 * @param {*} shippingCost
 * @param {*} shippingType
 *
 * @returns {*} Sends order confirmation email
 */
exports.sendOrderConfirmation = (customerId, shippingCost, shippingType) => {
  const cart = shopping_cart.findAll({
    include: [
      {
        model: product
      },
      {
        model: customer,
        attributes: {
          exclude: ['password', 'credit_card', 'createdAt', 'updatedAt']
        }
      }
    ],
    where: {
      customer_id: customerId
    }
  });
  const { name, email, city, country } = cart[0].customer;
  const address = cart[0].customer.address_1;
  const postalCode = cart[0].customer.postal_code;
  const priceArray = [];
  const discountArray = [];
  cart.forEach(item => {
    priceArray.push(parseFloat(item.product.price * item.quantity));
    discountArray.push(parseFloat(item.product.discounted_price));
  });
  const orderTableColumn = cart.reduce(
    (a, b) => `
    ${a}<tr>
      <td style="border: 1px solid #ddd; padding: 8px;">
        ${b.product.name}
      </td>
      <td style="border: 1px solid #ddd; padding: 8px;">
        ${b.quantity}
      </td>
      <td style="border: 1px solid #ddd; padding: 8px;">
        ${Math.round((b.product.price * b.quantity * 100) / 100).toFixed(2)}
      </td>
    </tr>
  `
  );
  const totalPrice = priceArray.reduce((prev, curr) => prev + curr);
  const totalDiscount = discountArray.reduce((prev, curr) => prev + curr);
  const finalPrice = Math.round(
    ((totalPrice - totalDiscount + shippingCost) * 100) / 100
  ).toFixed(2);
  const subject = 'Order Confirmation';
  const message = `
    <p>Dear ${name}, below is the summary of your order including shipping charges</p>
    <table style="border-collapse: collapse;">
      <thead style="background-color: #6EB2FB; color:white;">
        <th style="border: 1px solid #ddd; padding: 8px;">Item Name</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
      </thead>
      ${orderTableColumn}
    </table>

    <p>
      <b>Shipping:</b> ${shippingType} 
        <span><b>Cost: </b> ${shippingCost}</span>
    </p>
    <p>
      <b>Item Total:</b> ${Math.round((totalPrice * 100) / 100).toFixed(2)}
        <span><b>Discount:</b> ${Math.round(
          (totalDiscount * 100) / 100
        ).toFixed(2)}</span>
        <span><b>Final Charge:</b> ${finalPrice}</span>
    </p>
    <p>
      <b>Shipping Address:</b> ${address}, ${city}, ${country}, ${postalCode}
    </p>  
  `;
  emailSender(email, subject, message);
};
