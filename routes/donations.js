const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../models/Donation');
const { ErrorHandler } = require('../utils/error');

// Process donation
router.post('/process', async (req, res, next) => {
  try {
    const { amount, donorName, email, paymentMethod, isRecurring, frequency } = req.body;
    
    // Validate input
    if (!amount || !donorName || !email || !paymentMethod) {
      throw new ErrorHandler(400, 'Missing required fields');
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      payment_method_types: [paymentMethod],
      receipt_email: email,
      metadata: { donor_name: donorName }
    });

    // Save to MongoDB
    const donation = new Donation({
      donorName,
      email,
      amount,
      paymentMethod,
      isRecurring,
      frequency: isRecurring ? frequency : undefined,
      transactionId: paymentIntent.id
    });

    await donation.save();

    res.json({ 
      success: true, 
      clientSecret: paymentIntent.client_secret,
      donationId: donation._id
    });
  } catch (err) {
    next(err);
  }
});

// Webhook endpoint for Stripe
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      await Donation.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { status: 'completed' }
      );
      console.log(`Donation ${paymentIntent.id} marked as completed`);
    } catch (err) {
      console.error('Error updating donation status:', err);
    }
  }

  res.json({ received: true });
});

module.exports = router;
