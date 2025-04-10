import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables first
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';

const app = express();

// CORS configuration - extremely permissive for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Routes
console.log('Registering auth routes...');
app.use('/api/auth', authRoutes);
console.log('Registering user routes...');
app.use('/api/user', userRoutes);

// Test endpoint for CORS
app.get('/api/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Log all registered routes
console.log('Registered routes:');
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.path)
    } else if (r.name === 'router') {
        console.log('Router middleware:', r.regexp);
        r.handle.stack.forEach(function(h) {
            if (h.route) {
                console.log('  -', h.route.path)
            }
        });
    }
});

const PORT = process.env.PORT || 5000;

// Start server only after database connection is established
const startServer = async () => {
  try {
    // Log environment variables (safely)
    console.log('Environment check:', {
      MONGODB_URI_exists: !!process.env.MONGODB_URI,
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV
    });

    // Connect to database
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('MongoDB connection status:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 