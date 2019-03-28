const jwt = require('jsonwebtoken');
const { errorMessage } = require('./response');
const env = process.env;

exports.generateJwtToken = payload => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '30d' });
};

/**
 *
 * @param {*} token
 *
 * @returns {*}
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
 * @param {*} ctx
 * @param {*} next
 *
 * @returns {*}
 */
exports.verifyJwt = async (ctx, next) => {
  const token =
    ctx.request.header.authorization &&
    ctx.request.header.authorization.split(' ')[0] === 'Bearer'
      ? ctx.request.header.authorization.split(' ')[1]
      : '';

  if (token) {
    const payload = verifyJwtToken(token);
    if (payload !== null || payload !== undefined) {
      ctx.status = 200;
      ctx.request.user = payload;
      ctx.request.user.authenticated = true;
    } else {
      ctx.status = 200;
      ctx.reuqest.user.authenticated = {};
    }
  }
  await next();
};

/**
 *
 * @param {*} ctx
 * @param {*} next
 *
 * @returns {*}
 */
exports.authenticated = async (ctx, next) => {
  if (ctx.request.user.authenticated) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = errorMessage('Login and try again');
  }
};
