const { customer } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { validateEmail, validatePassword } = require('../../utils/validation');
const { generateJwtToken } = require('../../utils/jwt');

exports.updateCustomer = async ctx => {
  const {
    email,
    name,
    password,
    credit_card,
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id,
    day_phone,
    eve_phone,
    mob_phone
  } = ctx.request.body;
  const { id } = ctx.request.user;
  try {
    const hasCustomer = await customer.findOne({ where: { customer_id: id } });
    if (!hasCustomer) {
      ctx.status = 400;
      ctx.body = errorMessage('Customer with this id does not exist');
    }
    const query = await customer.update(
      {
        email: email || hasCustomer.email,
        name: name || hasCustomer.name,
        password: password || hasCustomer.password,
        credit_card: credit_card || hasCustomer.credit_card,
        address_1: address_1 || hasCustomer.address_1,
        address_2: address_2 || hasCustomer.address_2,
        city: city || hasCustomer.city,
        region: region || hasCustomer.region,
        postal_code: postal_code || hasCustomer.postal_code,
        country: country || hasCustomer.country,
        shipping_region_id:
          shipping_region_id || hasCustomer.shipping_region_id,
        day_phone: day_phone || hasCustomer.day_phone,
        eve_phone: eve_phone || hasCustomer.eve_phone,
        mob_phone: mob_phone || hasCustomer.mob_phone
      },
      {
        where: { customer_id: id }
      }
    );
    const data = await customer.findOne({ where: { customer_id: id } });
    ctx.body = successMessage('customer', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.getCustomerById = async ctx => {
  const { email } = ctx.request.user;
  try {
    const data = await customer.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });
    ctx.body = successMessage('customer', data);
  } catch (err) {
    ctx.body = errorMessage(err.message);
  }
};

exports.registerCustomer = async ctx => {
  const name = ctx.request.body.name ? ctx.request.body.name.trim() : null;
  const email = ctx.request.body.email ? ctx.request.body.email.trim() : null;
  const password = ctx.request.body.password
    ? ctx.request.body.password.trim()
    : null;

  if (!name || !email || !password) {
    ctx.status = 400;
    ctx.body = errorMessage('All input required');
  }

  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    ctx.status = 400;
    ctx.body = errorMessage(`email error: ${emailValidationError}`);
  }

  const passwordValidationError = validatePassword(password);
  if (passwordValidationError.length > 0) {
    ctx.status = 400;
    ctx.body = errorMessage(`password error: ${passwordValidationError}`);
  }

  const query = await customer.findAll({ where: { email } });
  if (query && query.length > 0) {
    ctx.status = 400;
    ctx.body = errorMessage('The email is already registered');
  } else {
    try {
      const data = await customer.create({ name, email, password });
      ctx.status = 201;
      ctx.body = successMessage('customer', {
        customer_id: data.customer_id,
        name: data.name,
        email: data.email
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = errorMessage(err.message);
    }
  }
};

exports.signinCustomer = async ctx => {
  const email = ctx.request.body.email ? ctx.request.body.email.trim() : null;
  const password = ctx.request.body.password
    ? ctx.request.body.password.trim()
    : null;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = errorMessage('All input required');
  }
  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    ctx.status = 400;
    ctx.body = errorMessage(`email error: ${emailValidationError}`);
  }

  const data = await customer.findOne({ where: { email } });
  if (data && validatePassword(data.password)) {
    const payload = {
      id: data.customer_id,
      email: data.email
    };

    const token = generateJwtToken(payload);
    ctx.status = 200;
    ctx.body = successMessage('customer', {
      token: `Bearer ${token}`
    });
  } else {
    ctx.status = 400;
    ctx.body = errorMessage('No user exist with desired email address');
  }
};

exports.signinCustomerWithFacebookCallback = async ctx => {
  ctx.redirect('/');
};

exports.updateAddressFromCustomer = async ctx => {
  const {
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id
  } = ctx.request.body;
  const { id } = ctx.request.user;

  try {
    const data = await customer.update(
      {
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id
      },
      { where: { customer_id: id } }
    );
    ctx.body = successMessage('customer', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};

exports.updateCreditCardFromCustomer = async ctx => {
  const { credit_card } = ctx.request.body;
  const { id } = ctx.request.user;

  try {
    const data = await customer.update(
      { credit_card },
      { where: { customer_id: id } }
    );
    ctx.body = successMessage('customer', data);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
