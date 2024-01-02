// require('dotenv').config({path: './env'})

// ager dotenv ko import statement se  karna hai toh ye code use karo
// import dotenv from "dotenv";
// dotenv.config({path: './env'})
// or package.json me experimental feature use kar sakte ho


import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./env" });


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("MONGODB connection failed !!!: ", error);
    });






// this code is for connecting with database and server 
/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("error: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.log("error: ",error)
        throw error
    }
})()
*/