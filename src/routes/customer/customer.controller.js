const { customer } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { validateEmail, validatePassword } = require('../../utils/validation');
const { generateJwtToken } = require('../../utils/jwt');

exports.updateCustomer = async ctx => {
  ctx.body = '';
};
exports.getCustomerById = async ctx => {
  ctx.body = '';
};
exports.registerCustomer = async ctx => {
  ctx.body = '';
};
exports.signinCustomer = async ctx => {
  ctx.body = '';
};
exports.signinCustomerWithFacebook = async ctx => {
  ctx.body = '';
};
exports.updateAddressFromCustomer = async ctx => {
  ctx.body = '';
};
exports.updateCreditCardFromCustomer = async ctx => {
  ctx.body = '';
};

// exports.login = async ctx => {
//   const email = ctx.request.body.email ? ctx.request.body.email.trim() : null;
//   const password = ctx.request.body.password
//     ? ctx.request.body.password.trim()
//     : null;

//   if (!email || !password) {
//     ctx.status = 400;
//     ctx.body = errorMessage('All input required');
//   }
//   const emailValidationError = validateEmail(email);
//   if (emailValidationError.length > 0) {
//     ctx.status = 400;
//     ctx.body = errorMessage(`email error: ${emailValidationError}`);
//   }

//   const user = await customer.findOne({ where: { email } });
//   if (user && validatePassword(user.password)) {
//     const payload = {
//       id: user.customer_id,
//       email: user.email
//     };

//     const token = generateJwtToken(payload);
//     ctx.status = 200;
//     ctx.body = successMessage('customer', {
//       token: `Bearer ${token}`
//     });
//   } else {
//     ctx.status = 400;
//     ctx.body = errorMessage('No user exist with desired email address');
//   }
// };

// exports.signup = async ctx => {
//   const name = ctx.request.body.name ? ctx.request.body.name.trim() : null;
//   const email = ctx.request.body.email ? ctx.request.body.email.trim() : null;
//   const password = ctx.request.body.password
//     ? ctx.request.body.password.trim()
//     : null;

//   if (!name || !email || !password) {
//     ctx.status = 400;
//     ctx.body = errorMessage('All input required');
//   }

//   const emailValidationError = validateEmail(email);
//   if (emailValidationError.length > 0) {
//     ctx.status = 400;
//     ctx.body = errorMessage(`email error: ${emailValidationError}`);
//   }

//   const passwordValidationError = validatePassword(password);
//   if (passwordValidationError.length > 0) {
//     ctx.status = 400;
//     ctx.body = errorMessage(`password error: ${passwordValidationError}`);
//   }

//   const user = await customer.findAll({ where: { email } });
//   if (user && user.length > 0) {
//     ctx.status = 400;
//     ctx.body = errorMessage('The email is already registered');
//   } else {
//     try {
//       const newUser = await customer.create({ name, email, password });
//       ctx.status = 201;
//       ctx.body = successMessage('customer', {
//         customer_id: newUser.customer_id,
//         name: newUser.name,
//         email: newUser.email
//       });
//     } catch (err) {
//       ctx.status = 400;
//       ctx.body = errorMessage(err.message);
//     }
//   }
// };
