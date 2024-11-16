const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/signup', async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;
   
   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
      const newUser = new User({ fullName, email, phoneNumber });
      await newUser.save();
      res.status(201).json({ message: "submitted successfully" });
    } 
   catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
