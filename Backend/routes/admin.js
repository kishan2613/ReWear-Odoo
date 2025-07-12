const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');

// User routes
router.post('/users', adminController.getAllUsers);
router.post('/user/:id', adminController.getUserById);
router.delete('/user/:id', adminController.deleteUser);

// Product routes
router.post('/products', adminController.getAllProducts);
router.post('/product/:id', adminController.getProductById);
router.delete('/product/:id', adminController.deleteProduct);

// Stats
router.post('/stats', adminController.getStats);

module.exports = router;
