const User = require('../models/User');
const Product = require('../models/Product');

const ADMIN_ACCESS_TOKEN = 'supersecrettoken123'; // Replace with your actual token

// Utility: Check token once at top of each function
const checkAdmin = (req, res) => {
  if (req.body.adminToken !== ADMIN_ACCESS_TOKEN) {
    res.status(403).json({ message: 'Access denied: Invalid admin token' });
    return false;
  }
  return true;
};

// Get all users
exports.getAllUsers = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const products = await Product.find().populate('user', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get a single product
exports.getProductById = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Platform Stats
exports.getStats = async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    res.status(200).json({ users: userCount, products: productCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};
