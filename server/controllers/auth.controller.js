import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../ulti/createError.js";

export const register = async (req, res, next) => {
  try {
    const exitUser = await UserModel.findOne({ userName: req.body.userName });
    if (exitUser) {
      return next(createError(404, "User already exists"));
    }
    const exitEmail = await UserModel.findOne({ email: req.body.email });
    if (exitEmail) {
      return next(createError(404, "This email already registered"));
    }
    // Hashing password
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // Create User if not registered
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    const { password, _id, ...info } = newUser.toObject();
    // after create, func to work like login in method
    const token = jwt.sign(
      { id: newUser.id, isSeller: newUser.isSeller },
      process.env.JWT_KEY
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    const { password, _id, ...info } = user.toObject();
    const token = jwt.sign(
      { id: user.id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    // Check password || username

    if (!isCorrect) {
      return next(createError(404, "Wrong password & Username"));
    } else {
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({ id: _id, ...info });
      // .send(info);
    }
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken").status(200).send("User has been logged out");
  } catch (err) {
    next(err);
  }
};
