const Koa = require('koa');
const app = new Koa();

// Middlewares
const middlewares = require('./middleware');
middlewares(app);

// Routes
const routers = require('./routes');
routers(app);

// HTTP
const servers = require('./server');
servers(app);
