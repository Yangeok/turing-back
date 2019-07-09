/**
 *
 * @param {*} ngrokHostname
 * @param {*} stripe
 */
const webhook = (ngrokHostname, stripe) => {
  stripe.webhookEndpoints.create(
    {
      url: `http://${ngrokHostname}.ngrok.io/payment/webhook`,
      enabled_events: ['charge.failed', 'charge.succeeded'],
      connect: false
    },
    (e, webhookEndpoints) => {
      console.log(webhookEndpoints);
      return webhookEndpoints;
    }
  );
};

module.exports = webhook;
