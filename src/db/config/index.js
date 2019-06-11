require('dotenv').config();

let username, password, database, host, port, dialect, define;
const env = process.env;

// switch (env.NODE_ENV) {
//   case 'development':
//     username = env.MYSQL_USERNAME;
//     password = env.MYSQL_PASSWORD;
//     database = env.MYSQL_DATABASE;
//     host = env.MYSQL_HOST;
//     dialect = env.MYSQL_DIALECT;
//     port = env.MYSQL_PORT;
//     define = {
//       freezeTableName: true,
//       timestamps: false
//     };
//     break;

//   case 'production':
//     username = env.MYSQL_USERNAME;
//     password = env.MYSQL_PASSWORD;
//     database = env.MYSQL_DATABASE;
//     host = env.MYSQL_HOST;
//     dialect = env.MYSQL_DIALECT;
//     port = env.MYSQL_PORT;
//     define = {
//       freezeTableName: true,
//       timestamps: false
//     };
//     break;

//   case 'test':
//     username = env.MYSQL_USERNAME;
//     password = env.MYSQL_PASSWORD;
//     database = env.MYSQL_DATABASE_TEST;
//     host = env.MYSQL_HOST;
//     dialect = env.MYSQL_DIALECT;
//     port = env.MYSQL_PORT;
//     define = {
//       freezeTableName: true,
//       timestamps: false
//     };
//     break;
// }

// module.exports = { username, password, database, host, port, dialect, define };

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  define: {
    freezeTableName: true,
    timestamps: false
  }
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  define: {
    freezeTableName: true,
    timestamps: false
  }
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  define: {
    freezeTableName: true,
    timestamps: false
  }
};

module.exports = {
  development,
  production,
  test
};
