require('dotenv').config();
const env = process.env;
const { port } = require('./utils/env');
const db = require('./db/models');

const servers = app => {
  db.sequelize
    .sync()
    .then(() => {
      env.NODE_ENV !== 'test' &&
        console.log(`> MySQL connected on ${env.NODE_ENV} environment`);
    })
    .catch(err => {
      console.error(err).log(`> MySQL connection error`);
      process.exit();
    })
    .then(() => {
      app.listen(port, () => {
        env.NODE_ENV !== 'test' &&
          console.log(`> Koa server is listening on port ${port}`);
      });
    });
};

module.exports = servers;
