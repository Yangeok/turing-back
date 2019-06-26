/**
 * @param {*} ctx
 * @param {*} next
 */
const ignoreFavicon = (ctx, next) => {
  if (
    ctx.request.originalUrl &&
    ctx.request.originalUrl.split('/').pop() === 'favicon.ico'
  ) {
    return res.sendStatus(204);
  }
  return next();
};

/**
 * @param {*} ctx
 * @param {*} next
 */
const ignoreRobots = (ctx, next) => {
  if (ctx.request.url === '/robots.txt') {
    res.type('text/plain');
    return res.send('User-agent: *\nDisallow: /');
  }
  return next();
};

/**
 * @param {*} app
 */
const ignoreRequest = app => {
  app.use(ignoreFavicon);
  app.use(ignoreRobots);
};

module.exports = ignoreRequest;
