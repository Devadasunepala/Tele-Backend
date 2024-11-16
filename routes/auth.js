const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup Route
router.get('/',async (req,res)=>{
   res.send('welcome to first project')
})
router.post('/signup', async (req, res) => {
   //console.log("request.body",req.body);
  const { fullName, email, phoneNumber } = req.body;
   
   try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      // Create new user
      const newUser = new User({ fullName, email, phoneNumber });
      await newUser.save();

      res.status(201).json({ message: "submitted successfully" });
    } 
   catch (error) {
      console.error(error.stack);  // Provides more details about the error
      res.status(500).json({ message: "Server error" });
  }
  
});

module.exports = router;
