const express = require('express');
const registerRoutes = express.Router();
const bcrypt = require('bcrypt');
const Register = require('./register.model');

// Register endpoint

  registerRoutes.post("/", async (req, res) => {
    try {
      const bakeryEntry = new  Register(req.body); // Assuming req.body contains the product data
      await bakeryEntry.save();
      // Send a JSON response with the created bakery entry
      res.status(201).json({ message: '  new user Created', bakeryEntry });
    } catch (error) {
      res.status(400).json({ message: 'unable to  create user check  inputs' , error});
    }
  });



  registerRoutes.post("/", async (req, res) => {
    try {
      const { userName, password } = req.body;
      // Find the user by email
      const user = await Register.findOne({ userName });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      // Successful login
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  module.exports =registerRoutes ;