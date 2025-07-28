import express from "express";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from "./config/mongoDB.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000 ;
connectDB();

const allowedOrigins = ['https://auth-yadev.netlify.app']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}));

// API Endpoints
app.get('/', (req,res)=> res.send('API Working...'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, ()=> console.log(`Server Started on Port:${port}`));