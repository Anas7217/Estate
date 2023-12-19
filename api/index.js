import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

// MONGO_URL=mongodb+srv://anasmalik1999786:ysxtN2D1IENEPkMm@cluster0.ksqqdp3.mongodb.net/stock
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected!")

})
.catch((error)=>{
    console.log(error,"database Error")
})


const app=express()



app.listen(3000,()=>{
    console.log(`server is running at 3000`);
})

