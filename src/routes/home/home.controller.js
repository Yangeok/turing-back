const moment = require('moment-timezone');
const { successMessage } = require('../../utils/response');

exports.list = async ctx => {
  ctx.status = 200;
  ctx.body = successMessage('server', {
    host: ctx.header,
    message: 'API up and running.',
    timestamp: moment.tz(new Date(), 'Asia/Seoul').format()
  });
};
