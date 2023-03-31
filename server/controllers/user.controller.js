import userModel from "../models/user.model.js";
import createError from "../ulti/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) return next(createError(401, "Account not found"));

  // From verify middleware.js
  if (req.userId !== user.id) {
    return next(createError(404, "You can delete only your account"));
  }
  await userModel.findByIdAndDelete(req.params.id);
  res.status(200).send("Your account has been deleted");
};
export const getUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) return next(createError(401, "Account not found"));
  const { password, ...info } = user.toObject();
  res.status(200).json(info);
};
