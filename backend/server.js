import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';

// env varaible loading
dotenv.config({path:'./config/.env'})

//initializing the app
const app = express();

//Middlewares
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

//Routes
app.use('/api/test', testRoutes)
app.use('/api/auth', authRoutes)

// Starting server
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is listing on PORT: ${PORT}`);
    
})