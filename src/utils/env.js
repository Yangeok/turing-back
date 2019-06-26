require('dotenv').config();

let port, hostname;
const env = process.env;

switch (env.NODE_ENV) {
  case 'development':
    port = env.DEV_PORT || 3000;
    hostname = 'http://localhost';
    break;

  case 'production':
    port = env.PORT || 80;
    hostname = 'https://turing-back.herokuapp.com';
    break;

  case 'test':
    port = env.TEST_PORT || 8080;
    hostname = 'http://localhost';
    break;
}

module.exports = {
  port,
  hostname
};
