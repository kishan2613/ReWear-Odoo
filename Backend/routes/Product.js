const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

router.post('/add', productController.addProduct);
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/user/:userId', productController.getProductsByUser);
router.get('/nearby/:address', productController.getNearbyProducts);
router.get('/top-liked', productController.getTopLikedProducts);
router.post('/like/:id', productController.likeProduct);
router.patch('/status/:id', productController.updateProductStatus);
router.delete('/delete/:id', productController.deleteProduct);
// Add this to your existing product routes
router.get('/search', productController.searchProducts);

module.exports = router;
