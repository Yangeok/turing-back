const { customer } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { removeKeys } = require('../../utils/validation');

exports.list = async ctx => {
  // ctx.body = ctx.request.user;
  const id = ctx.request.user.id;
  try {
    // const profile = await customer.findAll();
    const profile = await customer.findByPk(id);
    // console.log(profile);
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
