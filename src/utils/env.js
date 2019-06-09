require('dotenv').config();

let PORT, hostname;
let username, password, database, host, port, dialect, define;
const env = process.env;

switch (env.NODE_ENV) {
  case 'development':
    PORT = env.DEV_PORT || 3000;

    username = env.DB_USERNAME;
    password = env.DB_PASSWORD;
    database = env.DB_DATABASE;
    host = env.DB_HOST;
    dialect = env.DB_DIALECT;
    port = env.DB_PORT;
    define = {
      freezeTableName: true,
      timestamps: false
    };
    break;

  case 'production':
    PORT = env.PORT || 80;

    username = env.DB_USERNAME;
    password = env.DB_PASSWORD;
    database = env.DB_DATABASE_TEST;
    host = env.DB_HOST;
    dialect = env.DB_DIALECT;
    port = env.DB_PORT;
    define = {
      freezeTableName: true,
      timestamps: false
    };
    break;

  case 'test':
    PORT = env.TEST_PORT || 8080;
    hostname = 'localhost';

    username = env.DB_USERNAME;
    password = env.DB_PASSWORD;
    database = env.DB_DATABASE;
    host = env.DB_HOST;
    dialect = env.DB_DIALECT;
    port = env.DB_PORT;
    define = {
      freezeTableName: true,
      timestamps: false
    };
    break;
}

module.exports = {
  PORT,
  hostname,
  username,
  password,
  database,
  host,
  port,
  dialect,
  define
};
