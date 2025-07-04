const mongoose = require('mongoose');

const massTimeSchema = new mongoose.Schema({
  dayOfWeek: { 
    type: String, 
    required: true,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  time: { type: String, required: true }, // Store as "HH:MM" string
  type: { type: String, required: true },
  language: String,
  isRegular: { type: Boolean, default: true },
  notes: String,
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('MassTime', massTimeSchema);
