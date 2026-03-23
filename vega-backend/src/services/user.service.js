const CommonService = require("./common.service");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { generateTokens, verify } = require("../utils/token");
const { REFRESH_TOKEN_SECRET } = require("../config/env.config");

class UserService extends CommonService {
  constructor() {
    super(User);
  }

  async register(userData) {
    const existing = await User.findOne({ email: userData.email });
    if (existing) throw new ApiError(400, "User already exists");
    return this.create(userData);
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid credentials");
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, ...tokens };
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = verify(refreshToken, REFRESH_TOKEN_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Invalid or expired refresh token");
      }

      const tokens = generateTokens(user);
      user.refreshToken = tokens.refreshToken;
      await user.save();

      return tokens;
    } catch (error) {
      throw new ApiError(401, "Invalid refresh token");
    }
  }

  async logout(userId) {
    return User.findByIdAndUpdate(userId, { refreshToken: null });
  }
}

module.exports = new UserService();
