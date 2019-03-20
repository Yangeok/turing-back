const jwt = require('jsonwebtoken');
const { successMessage, errorMessage } = require('./response');
const env = process.env;

exports.generateJwtToken = payload => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '30d' });
};

const verifyJwtToken = token => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (e) {
    throw new Error(e);
  }
};

exports.verifyJwt = async (ctx, next) => {
  // console.log(ctx.request.header.authorization);
  const token =
    ctx.request.header.authorization &&
    ctx.request.header.authorization.split(' ')[0] === 'Bearer'
      ? ctx.request.header.authorization.split(' ')[1]
      : '';

  if (token) {
    const payload = verifyJwtToken(token);
    // console.log(payload);
    if (payload !== null || payload !== undefined) {
      ctx.status = 200;
      ctx.request.user = payload;
      ctx.request.user.authenticated = true;
      // console.log(ctx.request.user);
    } else {
      ctx.status = 200;
      ctx.reuqest.user.authenticated = {};
      // console.log(ctx.request.user);
    }
  }
  await next();
};

exports.authenticated = async (ctx, next) => {
  if (ctx.request.user.authenticated) {
    // console.log(ctx.request.user);
    await next();
  } else {
    ctx.status = 401;
    ctx.body = errorMessage('Login and try again');
  }
};
