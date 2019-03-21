require('dotenv').config();

let PORT;
let force;
const env = process.env;

switch (env.NODE_ENV) {
  case 'development':
    PORT = env.DEV_PORT || 3000;
    force = {};
    break;

  case 'production':
    PORT = env.PORT || 80;
    force = {};
    break;

  case 'test':
    PORT = env.TEST_PORT || 3001;
    force = { force: true };
    break;
}

module.exports = { PORT, force };
