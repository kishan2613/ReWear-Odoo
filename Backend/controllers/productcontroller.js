const Product = require('../models/Product');

// @desc    Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      description,
      heroImage,
      images,
      address,
      user,
    } = req.body;

    const newProduct = new Product({
      productName,
      category,
      description,
      heroImage,
      images,
      address,
      user,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('user', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get products by user
exports.getProductsByUser = async (req, res) => {
  try {
    const products = await Product.find({ user: req.params.userId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get nearby products by address
exports.getNearbyProducts = async (req, res) => {
  try {
    const { address } = req.params;
    const products = await Product.find({ address: { $regex: new RegExp(address, 'i') } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get top liked products
exports.getTopLikedProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ likes: -1 }).limit(10);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like a product (increase swap interest)
exports.likeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.likes += 1;
    await product.save();

    res.status(200).json({ message: 'Product liked', likes: product.likes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search products by name/category only
exports.searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ message: 'Product name is required' });
    }

    // Build search query - search in name, category, and description
    let query = { 
      status: 'Available',
      $or: [
        { productName: { $regex: name, $options: 'i' } },
        { category: { $regex: name, $options: 'i' } },
        { description: { $regex: name, $options: 'i' } }
      ]
    };
    
    const products = await Product.find(query)
      .sort({ likes: -1, createdAt: -1 }) // Sort by popularity then newest
      .limit(5)
      .populate('user', 'name email')
      .select('productName category description heroImage images likes address status');
    
    res.status(200).json(products);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Update product status
exports.updateProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.status = req.body.status;
    await product.save();

    res.status(200).json({ message: 'Status updated', status: product.status });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
