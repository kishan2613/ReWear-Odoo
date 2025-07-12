const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mode: {
    type: String,
    enum: ['Swap', 'Coins'],
    required: true
  },
  swapImage: {
    type: String, // Only required if mode === 'Swap'
    required: function () {
      return this.mode === 'Swap';
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);
