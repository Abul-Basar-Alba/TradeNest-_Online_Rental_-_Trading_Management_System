import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect('${process.env.MONGO_URI}')
    
    console.log(`\n MongoDB Connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}; 