# Stripe Setup Instructions

## Get Your Stripe Test Keys

### Step 1: Create/Login to Stripe Account
1. Go to https://stripe.com
2. Sign up for a free account or login

### Step 2: Get API Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Make sure you're in **TEST MODE** (toggle in top right)
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal test key"

### Step 3: Get Webhook Secret (Optional for now)
1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `http://localhost:5000/api/v1/payments/webhook`
4. Select events to listen to (or select all)
5. Copy the **Signing secret** (starts with `whsec_`)

### Step 4: Update .env File
Replace these lines in your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_ACTUAL_WEBHOOK_SECRET_HERE
```

## Current Status
Your `.env` file has placeholder Stripe keys. Replace them with real test keys from Stripe dashboard.

## Note
- Test keys are safe to use in development
- Never commit real keys to git
- Use environment variables in production
