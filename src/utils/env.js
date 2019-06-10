require('dotenv').config();

let PORT, hostname;
const env = process.env;

switch (env.NODE_ENV) {
  case 'development':
    PORT = env.DEV_PORT || 3000;

    break;

  case 'production':
    PORT = env.PORT || 80;

    break;

  case 'test':
    PORT = env.TEST_PORT || 8080;
    hostname = 'localhost';

    break;
}

module.exports = {
  PORT,
  hostname
};
