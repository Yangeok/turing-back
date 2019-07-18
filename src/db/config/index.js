require('dotenv').config();
const env = process.env;

const username = env.MYSQL_USERNAME;
const password = env.MYSQL_PASSWORD;
const host = env.MYSQL_HOST;
const dialect = env.MYSQL_DIALECT;
const port = env.MYSQL_PORT;

const development = {
  username,
  password,
  database: env.MYSQL_DATABASE,
  host,
  dialect,
  port,
  freezeTableName: true,
  timestamps: false
};

const production = {
  username,
  password,
  database: env.MYSQL_DATABASE,
  host,
  dialect,
  port,
  freezeTableName: true,
  timestamps: false,
  logging: false
};

const test = {
  username,
  password,
  database: env.MYSQL_DATABASE_TEST,
  host,
  dialect,
  port,
  freezeTableName: true,
  timestamps: false,
  logging: false
};

module.exports = {
  development,
  production,
  test
};
