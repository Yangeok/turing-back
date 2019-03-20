const Koa = require('koa');
const cors = require('koa2-cors');
const json = require('koa-json');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const { verifyJwt, authenticated } = require('./utils/jwt.js');

const app = new Koa();
const router = new Router();

const api = require('./routes/index');
router.use(api.routes());

app.use(cors());
app.use(helmet());
app.use(json());
app.use(bodyParser());
app.use(logger());
app.use(verifyJwt);
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
    app.listen(PORT, () => {
      console.log(`> Koa server is listening on port ${PORT}`);
    });
  });
