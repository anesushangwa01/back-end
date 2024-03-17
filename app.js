// Importing required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add JWT
const Register = require('./register.model');
const BakeryEntryModel = require('./model');

// Creating an Express application instance
const app = express();

// Connecting to MongoDB
connectDB();

// Using CORS middleware
app.use(cors());

// Using body-parser middleware
app.use(bodyParser.json());

// JWT Secret Key
const JWT_SECRET = 'd6ee031dddb7965bf73006ca7b02413bb0c232fb0aabfe7569e79e8dc5e0c773'; // Replace with your secret key

// Importing route handlers
const productRoutes = require('./product-routes');
const registerRoutes = require('./register.routes');
 // Import bakery router

// Using route handlers
app.use('/product', productRoutes);
app.use('/register', registerRoutes);

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Register.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    // Generate JWT Token
    const token = jwt.sign({ userName: user.userName }, JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Setting up the port
const PORT = process.env.PORT || 5200;

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
