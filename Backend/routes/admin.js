const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');

// User routes
router.get('/users', adminController.getAllUsers);
router.get('/user/:id', adminController.getUserById);
router.delete('/user/:id', adminController.deleteUser);

// Product routes
router.get('/products', adminController.getAllProducts);
router.get('/product/:id', adminController.getProductById);
router.delete('/product/:id', adminController.deleteProduct);

// Stats
router.get('/stats', adminController.getStats);

module.exports = router;
