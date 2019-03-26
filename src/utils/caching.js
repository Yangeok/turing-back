require('dotenv').config();
const redis = require('redis');
const { successMessage } = require('./response');
let client;

if (process.env.NODE_ENV === 'production') {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient();
}

client.on('error', err => {
  console.log('error ' + err);
});

exports.redisMiddleware = async (ctx, next) => {
  const key = ctx.request.originalUrl || ctx.request.url;
  client.get(key, (err, result) => {
    if (result) {
      ctx.body = successMessage('message', JSON.parse(result));
    } else {
      ctx.body = client.set(key, JSON.stringify());
    }
  });
};
