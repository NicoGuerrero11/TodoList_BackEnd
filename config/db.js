import mongoose from 'mongoose';
import { config } from 'dotenv';


config()

// Function that allows connection to the database
const connectDB = async  () => {
   try{
       await mongoose.connect(process.env.MONGODB_URI)
       console.log('Connected to MongoDB Atlas')
   } catch (err) {
       console.error(err);
       process.exit(1);
   }
}

export default connectDB;