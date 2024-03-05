import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config()

// MONGO_URL=mongodb+srv://anasmalik1999786:ysxtN2D1IENEPkMm@cluster0.ksqqdp3.mongodb.net/stock
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected!")

})
.catch((error)=>{
    console.log(error,"database Error")
})

const __dirname=path.resolve();


const app=express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)


app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))   // /client/dist/index.html
})


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



app.listen(3000,()=>{
    console.log(`server is running at 3000`);
})

