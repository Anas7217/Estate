import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)



app.listen(3000,()=>{
    console.log(`server is running at 3000`);
})

