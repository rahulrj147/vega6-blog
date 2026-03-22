const userService = require("../services/user.service");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");


class UserController {
  static async register(req, res) {
    const userData = { ...req.body };
    if (req.file) userData.profilePicture = `/uploads/vega6/users/${req.file.filename}`;
    const user = await userService.register(userData);
    return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, "Please provide email and password");

    const result = await userService.login(email, password);
    return res.status(200).json(new ApiResponse(200, result, "Login successful"));
  }

  static async refreshAccessToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new ApiError(401, "Refresh token is missing");

    const tokens = await userService.refreshAccessToken(refreshToken);
    return res.status(200).json(new ApiResponse(200, tokens, "Tokens refreshed"));
  }

  static async logout(req, res) {
    await userService.logout(req.user._id);
    return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
  }

  static async getProfile(req, res) {
    const user = await userService.getById(req.user._id);
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
  }

  static async updateProfile(req, res) {
    const updates = { ...req.body };
    if (req.file) updates.profilePicture = `/uploads/vega6/users/${req.file.filename}`; // local URL
    const updatedUser = await userService.updateById(req.user._id, updates);
    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  }

  static async getAllUsers(req, res) {
    const users = await userService.getAll(req.query);
    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  }

  static async getUserById(req, res) {
    const user = await userService.getById(req.params.id);
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
  }

  static async deleteUser(req, res) {
    await userService.deleteById(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
  }
  static async getDashboardStats(req, res) {
    const [blogCount, commentCount] = await Promise.all([
      Blog.countDocuments({ author: req.user._id }),
      Comment.countDocuments({ author: req.user._id }),
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { blogCount, commentCount },
          "Stats fetched successfully"
        )
      );
  }
}


module.exports = UserController;
