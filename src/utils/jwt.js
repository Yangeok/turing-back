require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorMessage } = require('./response');
const env = process.env;

/**
 *
 * @param {object} payload
 * @returns {function}
 */
const generateJwtToken = payload => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '24h' });
};

/**
 *
 * @param {string} token
 * @returns {function}
 */
const verifyJwtToken = token => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 *
 * @param {object} ctx
 * @param {function} next
 */
const authenticated = async (ctx, next) => {
  if (ctx.request.user.authenticated) {
    await next();
  } else {
    ctx.status = 400;
    ctx.body = errorMessage('Login and try again');
  }
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
  authenticated
};
