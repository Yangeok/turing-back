/**
 *
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
 *
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
 *
 * @param {string} err
 * @return {string}
 */
const fsErrorMessage = err => {
  console.log(`> error: ${err}`);
};

module.exports = {
  errorMessage,
  successMessage,
  fsErrorMessage
};
