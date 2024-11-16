const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//const authRoutes = require('./routes/auth');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use('/api', authRoutes);
const PORT = process.env.PORT || 5000;
app.post('/signup', async (req, res) => {
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
app.use('/',async (req,res)=>{
  res.send('welcome to first project')
})
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
