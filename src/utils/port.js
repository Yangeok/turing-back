let PORT;
const env = process.env;

switch (env.NODE_ENV) {
  case 'development':
    PORT = env.DEV_PORT || 3000;
    break;

  case 'production':
    PORT = env.PROD_PORT || 80;
    break;

  case 'test':
    PORT = env.TEST_PORT || 3001;
    break;
}

module.exports = PORT;
