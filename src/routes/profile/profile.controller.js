const { customer } = require('../../db/models');
const { successMessage, errorMessage } = require('../../utils/response');
const { removeKeys } = require('../../utils/validation');

exports.list = async ctx => {
  const id = 1;
  const profile = await customer.findByPk(decodeURI(id));
  if (profile) {
    const newProfile = removeKeys(profile, ['password', 'credit_card']);
    ctx.body = successMessage('profile', newProfile);
  } else {
    ctx.body = errorMessage('Something wrong with you');
  }
};
