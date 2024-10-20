const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const loanRoutes = require('./Routes/loanRoutes');
const userRoutes = require('./Routes/userRoutes');

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin : ["https://mini-loan-techdome-asg.vercel.app/"],
    methods : ["GET", "POST", "DELETE", "PATCH"],
    credentials : true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', userRoutes);
app.use('/api', loanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
