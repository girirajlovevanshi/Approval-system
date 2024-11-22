import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';



dotenv.config({path: "./config/.env"})
const PORT = process.env.PORT ;

connectDB();

const app = express();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log('server is running',PORT);
    
})

app.get('/',(req,res)=>{
    res.send('.......')
})





