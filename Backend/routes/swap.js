const express = require('express');
const router = express.Router();
const {
  createSwapRequest,
  getRequestsByProduct,
  getRequestsByUser,
  updateRequestStatus,
  deleteSwapRequest
} = require('../controllers/swapcontroller');

// POST /api/swaps/create
router.post('/create', createSwapRequest);

// GET /api/swaps/product/:productId
router.get('/product/:productId', getRequestsByProduct);

// GET /api/swaps/user/:userId
router.get('/user/:userId', getRequestsByUser);

// PATCH /api/swaps/update-status/:id
router.patch('/update-status/:id', updateRequestStatus);

// DELETE /api/swaps/delete/:id
router.delete('/delete/:id', deleteSwapRequest);

module.exports = router;
