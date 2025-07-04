const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['credit_card', 'bank_transfer', 'paypal'], 
    required: true 
  },
  isRecurring: { type: Boolean, default: false },
  frequency: { 
    type: String, 
    enum: ['weekly', 'monthly', 'quarterly', 'yearly'] 
  },
  transactionId: String,
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
