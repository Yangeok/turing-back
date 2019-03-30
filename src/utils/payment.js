require('dotenv').config();

const env = process.env;
const stripe = require('stripe')(env.STRIPE_SECRET);

const customer = await stripe.customers.create({
    email: 'wooky92@naver.com';

    
})

stripe.setTimeout(60000);

