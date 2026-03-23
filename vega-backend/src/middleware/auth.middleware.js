const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

const { ACCESS_TOKEN_SECRET: accessTokenSecret } = require("../config/env.config");

const authenticateToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new ApiError(401, "Unauthorized: No token provided");

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = await User.findById(decoded.id).select("name email");
    if (!req.user) throw new ApiError(401, "Unauthorized: User not found");
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid or expired token");
  }
});

module.exports = { authenticateToken };
