exports.validateEmail = email => {
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

exports.validatePassword = password => {
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

exports.removeKeys = (obj, fields) => {
  const newObj = obj;
  const keys = Object.keys(newObj.dataValues);
  keys.forEach(key => {
    fields.forEach(field => {
      if (key === field) {
        delete newObj.dataValues[key];
      }
    });
  });
  return newObj;
};
