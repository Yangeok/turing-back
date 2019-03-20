const jwt = require('jsonwebtoken');
const { errorMessage } = require('./response');
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

exports.verifyJwt = (ctx, next) => {
  if (
    ctx.request.header.authorization &&
    ctx.request.header.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = ctx.request.header.authorization.split(' ')[1];
    const payload = verifyJwtToken(token);
    if (payload !== null || [payload !== undefined]) {
      ctx.request.user = payload;
      ctx.request.user.authenticated = true;
    } else {
      ctx.request.user = {};
    }
  }
  next();
};

exports.authenticated = async (ctx, next) => {
  if (ctx.request.user.authenticated) {
    ctx.body = ctx.request.user;
    next();
  } else {
    ctx.status = 401;
    ctx.body = errorMessage('Login and try again');
  }
};
