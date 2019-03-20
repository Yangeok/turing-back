exports.errorHandler = (ctx, next) => {
  try {
    next();
  } catch (err) {
    err.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};

exports.errorMessage = message => {
  return {
    status: false,
    message
  };
};

exports.successMessage = (key, params) => {
  return {
    status: true,
    [key]: params
  };
};
