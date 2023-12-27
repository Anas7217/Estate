import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken=async(req,res,next)=>{

    const token = req.cookies.access_token;
    // console.log(token)

    if(!token){
        return next(errorHandler(401,"Unauthorized user"))
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err) return next(errorHandler(403,'Forbidden'))

        req.user=user;
        next();

    })


}