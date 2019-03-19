const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const logger = require('koa-logger');
const serve = require('koa-static');
const bodyParser = require('koa-body');

const app = new Koa();
const router = new Router();

const api = require('./routes/index');
router.use(api.routes());

app.use(json());
app.use(bodyParser());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

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
    app.listen(PORT || process.env.PORT, () => {
      console.log(`> Koa server is listening on port ${PORT}`);
    });
  });
