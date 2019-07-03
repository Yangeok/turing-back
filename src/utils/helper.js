const faker = require('faker');

/**
 * @returns {object}
 */
const createDatetime = () => {
  const a = JSON.stringify(faker.date.past());
  return a
    .replace(/"/g, '')
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

const concat = (x, y) => x.concat(y);
const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
Array.prototype.flatMap = function(f) {
  return flatMap(f, this);
};

module.exports = {
  createDatetime,
  getRandomIndex,
  flatMap
};
