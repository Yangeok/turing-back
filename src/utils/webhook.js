require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const webhook = ctx => {
  stripe.webhookEndpoints.create(
    {
      url: `http://1ded0b0a.ngrok.io/payment/webhook`,
      enabled_events: ['charge.failed', 'charge.succeeded']
    },
    (e, webhookEndpoints) => {
      if (e) {
        console.log(`> error: ${e.message}`);
      }
      return webhookEndpoints;
    }
  );
};

module.exports = webhook;
