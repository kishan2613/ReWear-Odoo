const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Ethnic Wear', 'Casual Wear', "Men's Activewear", "Women's Activewear", 'Western Wear', 'Footwear', 'Sportswear', 'Office Wear', "Men's Ethnic Wear", "Size Inclusive Styles"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  heroImage: {
    type: String, // URL or path
    required: true
  },
  images: [{
    type: String 
  }],
  likes: {
    type: Number,
    default: 0
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'In Negotiation', 'Sold'],
    default: 'Available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
