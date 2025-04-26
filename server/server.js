import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables first
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';

const app = express();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://play-learn-code.vercel.app',
  'https://play-learn-code-backend.onrender.com',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://play-learn-code-6tew-7uw605rc5-ompotdar7498-gmailcoms-projects.vercel.app',
  'https://play-learn-code-git-main-ompotdar7498-gmailcoms-projects.vercel.app'
];

// CORS configuration with allowed origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
     
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));  

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
app.use("/api/user", userRoutes); 
console.log('Registering user routes...');

console.log("Registered routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`${Object.keys(r.route.methods).join(",").toUpperCase()} - ${r.route.path}`);
  }
});

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