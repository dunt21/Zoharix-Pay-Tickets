import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zoharix-pay-tickets';
    
    // Check if we can connect to the provided URI
    try {
      await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
      console.log(`MongoDB connected successfully to ${mongoURI}`);
    } catch (err) {
      console.log('Local MongoDB connection failed. Attempting to start in-memory database...');
      
      // Fallback to in-memory server
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      
      console.log('Starting in-memory MongoDB instance...');
      await mongoose.connect(uri);
      console.log(`Connected to in-memory MongoDB at: ${uri}`);
      console.log('⚠️  NOTE: Data will be lost when the server restarts.');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;