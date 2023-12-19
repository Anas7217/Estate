import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup=async(req,res)=>{
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
        res.status(500).json(error.message)

        
    }
}
