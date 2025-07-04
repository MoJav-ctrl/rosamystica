const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  weekStart: { type: Date, required: true, unique: true },
  firstReading: { type: String, required: true },
  psalm: { type: String, required: true },
  secondReading: String,
  gospel: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BibleReading', readingSchema);
