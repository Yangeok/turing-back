exports.errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    throw err;
  }
};

// ddddHandle case where user requests nonexistent endpoint
exports.nullRoute = (req, res, next) => {
  res.status(404).json({ message: 'not found' });
};

// Create an error for the api error handler
exports.newHttpError = (status, message) => {
  let err;

  // Eliminates problem where a null message would get passed in and the final
  // error message would become 'null' (stringified null)
  if (message == null) {
    err = new Error();
  } else {
    err = new Error(message);
  }

  err.status = status;
  return err;
};
