const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Instagram', 'Facebook', 'Twitter', 'YouTube', 'TikTok', 'Other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  minQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  maxQuantity: {
    type: Number,
    required: true
  },
  averageTime: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;