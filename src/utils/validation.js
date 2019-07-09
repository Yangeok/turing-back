/**
 *
 * @param {string} email
 * @description make sure the email is in the correct format.
 */
const validateEmail = email => {
  let errorMessages = [];
  const regex = /\S+@\S+\.\S+/;
  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 40) {
    errorMessages.push('> Email is too long, please use shorter email address');
  }
  if (!regex.test(trimmedEmail) || trimmedEmail.length === 0) {
    errorMessages.push('> Email must be in valid format');
  }

  return errorMessages;
};

/**
 *
 * @param {string} password
 * @description make sure the password is in the correct format.
 */
const validatePassword = password => {
  const errorMessages = [];

  if (password.length > 50) {
    errorMessages.push('> Must be fewer than 50 chars');
  }
  if (password.length < 6) {
    errorMessages.push('> Must be longer than 5 chars');
  }
  if (!password.match(/[!@#$%^&*]/g)) {
    errorMessages.push('> Missing a symbol(! @ # $ % ^ & *)');
  }
  if (!password.match(/\d/g)) {
    errorMessages.push('> Missing a number');
  }
  if (!password.match(/[a-z]/g)) {
    errorMessages.push('> Missing a lowercase letter');
  }
  if (!password.match(/[A-Z]/g)) {
    errorMessages.push('> Missing an uppercase letter');
  }
  return errorMessages;
};

module.exports = {
  validateEmail,
  validatePassword
};
