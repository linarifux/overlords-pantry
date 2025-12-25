import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`The Vault is open.`);
  } catch (error) { 
    console.error(`Error: ${error.message}`);
    console.error(`System Self-Destruct Initiated... just kidding, but fix the DB string.`);
    process.exit(1); 
  }
};

export default connectDB;