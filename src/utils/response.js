/**
 * @param {*} ctx
 * @param {*} next
 */
const errorHandler = (ctx, next) => {
  try {
    next();
  } catch (err) {
    err.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};

/**
 * @param {string} message
 * @return error message
 */
const errorMessage = message => {
  return {
    status: false,
    message
  };
};

/**
 * @param {string} key
 * @param {object} params
 * @return {object} the key of the object is key and the value is params.
 */
const successMessage = (key, params) => {
  return {
    status: true,
    [key]: params
  };
};

/**
 * @param {string} err
 * @return {string}
 */
const fsErrorMessage = err => {
  console.log(`> error: ${err}`);
};

module.exports = {
  errorHandler,
  errorMessage,
  successMessage,
  fsErrorMessage
};
