import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded ({extended: true, limit: '10kb' }));
app.use(express.static('public'));
app.use(cookieParser());


// routes import

import userRouter from './routes/user.routes.js'


// routes declaration
// app.use("/users", userRouter)

// api ke throw karte he to
app.use("/api/v1/users", userRouter)

// url is prakar banega 
// http://localhost:8000/users/register 
// http://localhost:8000/api/v1/users/register



export default app;