import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup=async(req,res,next)=>{
    try {
        // res.send("this is get seignup")
        const { username, email, password } = req.body;
        // console.log(username, email, password);
        const hashedPassword=bcryptjs.hashSync(password,10);
      
        // Assuming User is a mongoose model
        const newUser = new User({
          username,
          email,
          password:hashedPassword
        });
      
        await newUser.save();
        res.status(201).json("user created successfully");
    } catch (error) {
        // next(errorHandler(550,'error from the function'))
        next(error)

        
    }
}
