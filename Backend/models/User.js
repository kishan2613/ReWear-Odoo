const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // Profile Information
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  
  // User Statistics & Activity
  points: {
    type: Number,
    default: 0
  },
  successfulSwaps: {
    type: Number,
    default: 0
  },
  totalSoldItems: {
    type: Number,
    default: 0
  },
  totalPurchasedItems: {
    type: Number,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  },
  spent: {
    type: Number,
    default: 0
  },
  
  // Liked Items
  likedItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  
}, { 
  timestamps: true
});

// Method to add points for successful swaps (10 points per swap)
userSchema.methods.addSwapPoints = function() {
  this.points += 10;
  this.successfulSwaps += 1;
  return this.save();
};

// Method to add to liked items
userSchema.methods.addLikedItem = function(productId) {
  if (!this.likedItems.includes(productId)) {
    this.likedItems.push(productId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove from liked items
userSchema.methods.removeLikedItem = function(productId) {
  this.likedItems = this.likedItems.filter(id => !id.equals(productId));
  return this.save();
};

// Method to update earnings
userSchema.methods.addEarnings = function(amount) {
  this.earnings += amount;
  this.totalSoldItems += 1;
  return this.save();
};

// Method to update spent amount
userSchema.methods.addSpent = function(amount) {
  this.spent += amount;
  this.totalPurchasedItems += 1;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);