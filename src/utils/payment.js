require('dotenv').config();
const keySecret = process.env.STRIPE_SECRET;
const keyPublishable = process.env.STRIPE_PUBLISHABLE;

const stripe = require('stripe')(keySecret);
