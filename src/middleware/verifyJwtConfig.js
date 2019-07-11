const { verifyJwtToken } = require('../utils/jwt');

const verifyJwt = async (ctx, next) => {
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

const verifyJwtConfig = app => {
  app.use(verifyJwt);
};

module.exports = verifyJwtConfig;
