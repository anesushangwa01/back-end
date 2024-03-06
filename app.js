const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const app = express();

// Connect to MongoDB
connectDB();

// Cors middleware
app.use(cors());

// Body parser middleware


app.use(bodyParser.json());

// Import routes
const productRoutes = require('./product-routes');

// Use routes
app.use('/product', productRoutes);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
