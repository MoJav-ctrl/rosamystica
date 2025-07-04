const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDateTime: { type: Date, required: true },
  endDateTime: Date,
  location: String,
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: String,
  imageUrl: String,
  categories: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
