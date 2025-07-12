const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//Routes
const productRoutes = require('./routes/Product');
app.use('/api/products', productRoutes);
const authRoutes = require('./routes/User');
app.use('/api/auth', authRoutes);
const swapRoutes = require('./routes/swap');
app.use('/api/swaps', swapRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
