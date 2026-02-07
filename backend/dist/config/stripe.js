"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeConfig = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is required');
}
if (stripeSecretKey === 'sk_test_your_stripe_secret_key_here') {
    console.warn('STRIPE_SECRET_KEY is using placeholder value. Please set a valid Stripe test secret key in .env');
}
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
if (!publishableKey || publishableKey === 'pk_test_your_stripe_publishable_key_here') {
    console.warn('STRIPE_PUBLISHABLE_KEY is not set or using placeholder. Please set a valid Stripe test publishable key in .env');
}
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret || webhookSecret === 'whsec_your_webhook_secret_here') {
    console.warn('STRIPE_WEBHOOK_SECRET is not set or using placeholder. Please set a valid Stripe webhook secret in .env');
}
exports.stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: '2025-11-17.clover',
});
exports.stripeConfig = {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    currency: process.env.STRIPE_CURRENCY || 'usd',
    successUrl: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/payment/success',
    cancelUrl: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/payment/cancel',
};
//# sourceMappingURL=stripe.js.map