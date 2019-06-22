const faker = require('faker');

const createDatetime = () => {
  const a = JSON.stringify(faker.date.past());
  return a
    .replace('"', '')
    .replace('"', '')
    .replace('T', ' ')
    .replace('Z', '');
};

const getRandomIndex = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = {
  createDatetime,
  getRandomIndex
};
