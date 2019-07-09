const ignoreFavicon = (ctx, next) => {
  if (
    ctx.request.originalUrl &&
    ctx.request.originalUrl.split('/').pop() === 'favicon.ico'
  ) {
    return (ctx.status = 204);
  }
  return next();
};

const ignoreRobots = (ctx, next) => {
  if (ctx.request.url === '/robots.txt') {
    ctx.type = 'text/plain';
    ctx.body = { 'User-agent': '*\nDisallow: /' };
  }
  return next();
};

const ignoreRequest = app => {
  app.use(ignoreFavicon);
  app.use(ignoreRobots);
};

module.exports = ignoreRequest;
