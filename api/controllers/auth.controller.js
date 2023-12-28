import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    // res.send("this is get seignup")
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Assuming User is a mongoose model
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    // next(errorHandler(550,'error from the function'))
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassowrd = bcryptjs.compareSync(password, user.password);
    if (!validPassowrd)
      return next(errorHandler(401, "Invalid email or passowrd"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY
    );
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // 36->(0 to 9 and A to Z, -8 means last eight digit)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),  // Anas7217 like this
        email: req.body.email,
        password: hashedPassword,
        avatar:req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);

    }
  } catch (error) {
    next(error);
  }
};


export const signOut=async(req,res)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json("log out successfully!")
    
  } catch (error) {
      next(error)
  }
}
