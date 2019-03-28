const Koa = require('koa');
const path = require('path');
const json = require('koa-json');
const cors = require('koa2-cors');
const serve = require('koa-static');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const cache = require('koa-redis-cache');
const { verifyJwt } = require('./utils/jwt.js');

const app = new Koa();
const router = new Router();
const options = {
  expire: 1,
  routes: '/category'
};

const api = require('./routes/index');
router.use(api.routes());

app.use(cors());
app.use(helmet());
app.use(json());
app.use(bodyParser());
app.use(logger());
app.use(cache(options));
app.use(verifyJwt);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve('src/images/product_images'));

const { PORT, hostname } = require('./utils/env');
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
    app.listen(PORT, hostname, () => {
      console.log(`> Koa server is listening on port ${PORT}`);
    });
  });

module.exports = app;
