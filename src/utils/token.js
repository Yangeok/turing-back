const crypto = require('crypto');

exports.token = (size = 50) => {
  const buffer = crypto.randomBytes(size);
  const token = buffer.toString('hex');
  return token;
};
