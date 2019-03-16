const Koa = require('koa');
const Router = require('koa-router');

const logger = require('koa-logger');
const bodyParser = require('koa-body');
const json = require('koa-json');

const app = new Koa();
const router = new Router();

const api = require('./routes/index');
router.use(api.routes());

app
  .use(json())
  .use(bodyParser())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())
const PORT = require('./utils/port');
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
    app.listen(PORT, () => {
      console.log(`> Koa server is listening on port ${PORT}`);
    });
  });
