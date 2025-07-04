const mongoose = require('mongoose');

const clergySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imagePath: String,
  bio: String,
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clergy', clergySchema);
