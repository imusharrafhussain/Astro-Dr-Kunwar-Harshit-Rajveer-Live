const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // 'YYYY-MM-DD'
  visitors: { type: Number, default: 0 },
  formOpened: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
