import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGOUSER = process.env.MONGOUSER;
const MONGOPASSWORD = process.env.MONGOPASSWORD;
const MONGO_URL = process.env.MONGO_URL;
const MONGOPORT = process.env.MONGOPORT;

const uri = `mongodb://${MONGO_URL}:${MONGOPORT}`;

const connectDB = async () => {
  try {
    await mongoose.connect(
      uri,
      { dbName: 'newtest' }
    ); //dbname
    console.log('MongoDB connected successfully. 🥳');
  } catch (error) {
    console.error('Error connecting to MongoDB: 🛑', error);
  }
};

export default connectDB;

//this file is solely for connection purposes to the db, in the router.ts the connection is established
