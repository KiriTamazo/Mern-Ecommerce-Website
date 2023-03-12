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
    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ userName: req.body.userName });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    const { password, ...info } = user.toObject();

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
        })
        .status(200)
        .send(info);
    }
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", { sameSite: "none", security: true })
      .status(200)
      .send("User has been logged out");
  } catch (err) {
    next(err);
  }
};
