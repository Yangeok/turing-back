const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// Middlewares
const middlewares = require('./middleware');
middlewares(app);

// Routes
const routerConfig = require('./routes');
routerConfig(app);

// HTTP
const { port } = require('./utils/env');
const db = require('./db/models');
db.sequelize
  .sync()
  .then(() => {
    console.log(`> DB connected on ${process.env.NODE_ENV} environment`);
  })
  .catch(err => {
    console.error(err).log(`> DB connection error`);
    process.exit();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`> Koa server is listening on port ${port}`);
    });
  });
