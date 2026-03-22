const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");

const blogRoutes = require("./blog.route");
const commentRoutes = require("./comment.route");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
