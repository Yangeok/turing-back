const { customer } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { removeKeys } = require('../../utils/validation');

exports.list = async ctx => {
  const { id } = ctx.request.body;
  try {
    const profile = await customer.findByPk(id);
    if (profile) {
      const newProfile = removeKeys(profile, [
        'password',
        'credit_card'
      ]).toJSON();
      ctx.body = successMessage('profile', newProfile);
    }
  } catch (err) {
    ctx.body = errorMessage(err.message);
  }
};

exports.update = async ctx => {
  const {
    id,
    email,
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
  try {
    const singleCustomer = await customer.findByPk(id);
    if (!customer) {
      ctx.status = 400;
      ctx.body = errorMessage('Customer with this id does not exist');
    }
    const profile = customer.update(
      {
        email: email || singleCustomer.email,
        password: password || singleCustomer.password,
        credit_card: credit_card || singleCustomer.credit_card,
        address_1: address_1 || singleCustomer.address_1,
        address_2: address_2 || singleCustomer.address_2,
        city: city || singleCustomer.city,
        region: region || singleCustomer.region,
        postal_code: postal_code || singleCustomer.postal_code,
        country: country || singleCustomer.country,
        shipping_region_id:
          shipping_region_id || singleCustomer.shipping_region_id,
        day_phone: day_phone || singleCustomer.day_phone,
        eve_phone: eve_phone || singleCustomer.eve_phone,
        mob_phone: mob_phone || singleCustomer.mob_phone
      },
      {
        returning: true,
        where: { customer_id: id }
      }
    );
    ctx.body = successMessage('profile', profile);
  } catch (err) {
    ctx.status = 400;
    ctx.body = errorMessage(err.message);
  }
};
