import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-11-17.clover',
});

export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: process.env.STRIPE_CURRENCY || 'usd',
  successUrl: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/payment/success',
  cancelUrl: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/payment/cancel',
};