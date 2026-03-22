const express = require("express");
const router = express.Router();
const BlogController = require("../controller/blog.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const asyncHandler = require("../utils/asyncHandler");

const createUploader = require("../middleware/upload.middleware");

const upload = createUploader("vega6/blogs");

// Root-level Routes (List & Create)
router.route("/")
    .get(asyncHandler(BlogController.getAllBlogs))
    .post(authenticateToken, upload.single("image"), asyncHandler(BlogController.createBlog));

// Single Item Routes (Read, Update, Delete)
router.route("/:id")
    .get(asyncHandler(BlogController.getBlogById))
    .put(authenticateToken, upload.single("image"), asyncHandler(BlogController.updateBlog))
    .delete(authenticateToken, asyncHandler(BlogController.deleteBlog));

module.exports = router;
