require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./middleware/db');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Server is running' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
