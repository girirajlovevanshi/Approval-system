import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRouters from './routers/auth.js'
import applicationRoutes from './routers/application.js';
import cors from 'cors'



dotenv.config({path: "./config/.env"})
const PORT = process.env.PORT ;

connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json()); //parser 

app.use('/api/auth',authRouters)
app.use('/api/applications', applicationRoutes);

app.listen(PORT, ()=>{
    console.log('server is running',PORT);
    
})





