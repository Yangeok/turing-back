const faker = require('faker');

/**
 * @returns {object}
 */
const createDatetime = () => {
  const a = JSON.stringify(faker.date.past());
  return a
    .replace('"', '')
    .replace('"', '')
    .replace('T', ' ')
    .replace('Z', '');
};

/**
 * @param {array} arr
 * @returns {array}
 */
const getRandomIndex = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = {
  createDatetime,
  getRandomIndex
};
