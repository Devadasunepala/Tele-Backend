const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/signup', async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;
   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Details Already Submittted. Thank you!" });
      const newUser = new User({ fullName, email, phoneNumber });
      await newUser.save();
      res.status(201).json({ message: "Submitted Successfully! We Will Respond To You Shortly" });
    } 
   catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Server error" });
  }
});
router.get('/',async (req,res)=>{
  res.send('welcome to my first project')
})
module.exports = router;
