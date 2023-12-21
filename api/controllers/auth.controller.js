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
    const {password:pass,...rest}=user._doc
    res.cookie('access_token',token,{httpOnly:true}).status(201).json(rest)
  } catch (error) {
    next(error);
  }
};
