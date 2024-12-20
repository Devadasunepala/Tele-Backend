const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/api', authRoutes);
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Ensure the IP is whitelisted and URI is correct.');
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
