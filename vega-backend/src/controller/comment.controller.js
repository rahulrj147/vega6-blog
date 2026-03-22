const CommonService = require("../services/common.service");
const Comment = require("../models/comment.model");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const commentService = new CommonService(Comment);

class CommentController {
  static async addComment(req, res) {
    const { content, blogId } = req.body;
    if (!content || !blogId) throw new ApiError(400, "Content and Blog ID are required");

    const commentData = { content, blog: blogId, author: req.user._id };
    const comment = await commentService.create(commentData);
    return res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
  }

  static async addReply(req, res) {
    const { content, blogId, parentCommentId } = req.body;
    if (!content || !blogId || !parentCommentId) throw new ApiError(400, "Content, Blog ID, and Parent Comment ID are required");

    const replyData = { content, blog: blogId, author: req.user._id, parentComment: parentCommentId };
    const reply = await commentService.create(replyData);
    return res.status(201).json(new ApiResponse(201, reply, "Reply added successfully"));
  }

  static async getBlogComments(req, res) {
    const { blogId } = req.params;
    const comments = await commentService.getAll({ ...req.query, blog: blogId, parentComment: null }, "author");
    return res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"));
  }

  static async getCommentReplies(req, res) {
    const { commentId } = req.params;
    const replies = await commentService.getAll({ ...req.query, parentComment: commentId }, "author");
    return res.status(200).json(new ApiResponse(200, replies, "Replies fetched successfully"));
  }

  static async deleteComment(req, res) {
    const comment = await commentService.getById(req.params.id);
    if (comment.author.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Not authorized to delete this comment");
    }
    await commentService.deleteById(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
  }
}

module.exports = CommentController;
