require('dotenv').config();
const env = process.env;

const username = env.MYSQL_USERNAME;
const password = env.MYSQL_PASSWORD;
const host = env.MYSQL_HOST;
const dialect = env.MYSQL_DIALECT;
const port = env.MYSQL_PORT;
const define = {
  freezeTableName: true,
  timestamps: false
};

const development = {
  username,
  password,
  database: env.MYSQL_DATABASE,
  host,
  dialect,
  port,
  define
};

const production = {
  username,
  password,
  database: env.MYSQL_DATABASE,
  host,
  dialect,
  port,
  define
};

const test = {
  username,
  password,
  database: env.MYSQL_DATABASE_TEST,
  host,
  dialect,
  port,
  define
};

module.exports = {
  development,
  production,
  test
};
