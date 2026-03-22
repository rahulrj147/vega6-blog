const CommonService = require("../services/common.service");
const Blog = require("../models/blog.model");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const blogService = new CommonService(Blog);

class BlogController {
  static async createBlog(req, res) {
    const data = { ...req.body, author: req.user._id };
    if (req.file) data.image = `/uploads/vega6/blogs/${req.file.filename}`;
    const blog = await blogService.create(data);
    return res.status(201).json(new ApiResponse(201, blog, "Blog created successfully"));
  }

  static async getAllBlogs(req, res) {
    const blogs = await blogService.getAll(req.query, "author");
    return res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
  }

  static async getBlogById(req, res) {
    const blog = await blogService.getById(req.params.id, "author");
    return res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
  }

  static async updateBlog(req, res) {
    const blog = await blogService.getById(req.params.id);
    if (blog.author.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this blog");
    }
    const updates = { ...req.body };
    if (req.file) updates.image = `/uploads/vega6/blogs/${req.file.filename}`;
    const updated = await blogService.updateById(req.params.id, updates);
    return res.status(200).json(new ApiResponse(200, updated, "Blog updated successfully"));
  }

  static async deleteBlog(req, res) {
    const blog = await blogService.getById(req.params.id);
    if (blog.author.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this blog");
    }
    await blogService.deleteById(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, "Blog deleted successfully"));
  }
}

module.exports = BlogController;
