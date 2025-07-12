const SwapRequest = require('../models/SwapRequest');
const Product = require('../models/Product');

// @desc Create a new swap/coin request
exports.createSwapRequest = async (req, res) => {
  const { product, requestedBy, mode, swapImage } = req.body;

  try {
    const newRequest = new SwapRequest({
      product,
      requestedBy,
      mode,
      swapImage: mode === 'Swap' ? swapImage : undefined
    });

    await newRequest.save();

    // Increment product's like count (swap interest)
    await Product.findByIdAndUpdate(product, { $inc: { likes: 1 }, status: 'In Negotiation' });

    res.status(201).json({ message: 'Swap request created', requestId: newRequest._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
};

// @desc Get all requests for a product
exports.getRequestsByProduct = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ product: req.params.productId }).populate('requestedBy', 'name email');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all requests made by a user
exports.getRequestsByUser = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requestedBy: req.params.userId }).populate('product');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update swap request status
exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const request = await SwapRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();

    // If completed, mark product as sold
    if (status === 'Completed') {
      await Product.findByIdAndUpdate(request.product, { status: 'Sold' });
    }

    res.status(200).json({ message: 'Status updated', status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

// @desc Delete a swap request
exports.deleteSwapRequest = async (req, res) => {
  try {
    const deleted = await SwapRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });

    res.status(200).json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete request', error: error.message });
  }
};
