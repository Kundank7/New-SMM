const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        userId: req.user._id.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Handle successful payment webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;
    const amount = paymentIntent.amount / 100; // Convert from cents

    try {
      const user = await User.findById(userId);
      user.balance += amount;
      await user.save();
    } catch (error) {
      console.error('Error updating user balance:', error);
      return res.status(500).send('Error updating user balance');
    }
  }

  res.json({ received: true });
});

// Get payment history
router.get('/history', auth, async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      customer: req.user._id.toString(),
      limit: 10
    });

    res.json(paymentIntents.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;