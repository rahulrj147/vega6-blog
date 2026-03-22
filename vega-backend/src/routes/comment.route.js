const express = require("express");
const router = express.Router();
const CommentController = require("../controller/comment.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const asyncHandler = require("../utils/asyncHandler");

// Public routes
router.route("/blog/:blogId").get(asyncHandler(CommentController.getBlogComments));
router.route("/replies/:commentId").get(asyncHandler(CommentController.getCommentReplies));

// Protected routes
router.route("/add").post(authenticateToken, asyncHandler(CommentController.addComment));
router.route("/reply").post(authenticateToken, asyncHandler(CommentController.addReply));
router.route("/:id").delete(authenticateToken, asyncHandler(CommentController.deleteComment));

module.exports = router;
