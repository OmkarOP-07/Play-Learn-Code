import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = async () => {
  try {
    // Log the MongoDB URI (but mask the password)
    const maskedUri = process.env.MONGODB_URI 
      ? process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@')
      : 'undefined';
    console.log('Attempting to connect with URI:', maskedUri);

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error('Environment variables loaded:', {
      MONGODB_URI_exists: !!process.env.MONGODB_URI,
      NODE_ENV: process.env.NODE_ENV
    });
    process.exit(1);
  }
};

export default connectDB; 