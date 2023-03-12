import createError from "../ulti/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  //   check if user already logged in
  if (!token) return next(createError(401, "You are not aithorized"));

  //   check if user is authorized or not with jwt token from the cookie
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is invalid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    // Important
    next();
  });
};
