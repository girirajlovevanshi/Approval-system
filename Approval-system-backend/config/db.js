import mongoose from 'mongoose'
import { DB_NAME } from '../constaints.js';

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log(`DB Connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.error("Unable to Connect with Db",error);
        process.exit(1);       
    }
}

export default connectDB;