"use client";
import React, { useState, useEffect } from "react";
import { commentService } from "@/services/comment.service";
import Button from "@/components/ui/Button";
import { MessageSquare, User, LogIn, CornerDownRight, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import { getImageUrl } from "@/lib/utils";

// Helper: Comment Input form
function CommentForm({
  onSubmit,
  placeholder,
  value,
  onChange,
  loading,
  buttonText = "Post",
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <textarea
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] resize-none outline-none focus:border-indigo-500 focus:bg-white transition"
        placeholder={placeholder}
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          className="!px-4 !py-1.5 !rounded-lg !text-xs font-semibold"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

// Sub-component: Individual Comment Item (Recursively handles replies)
function CommentItem({ comment, blogId, user, onReload }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyPagination, setReplyPagination] = useState(null);
  const [replyPage, setReplyPage] = useState(1);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const replyLimit = 4;

  useEffect(() => {
    if (showReplies) fetchReplies();
  }, [comment._id, showReplies, replyPage]);

  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const d = await commentService.getReplies(comment._id, {
        page: replyPage,
        limit: replyLimit,
      });
      setReplies(d?.result || []);
      setReplyPagination(d?.pagination);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      await commentService.addReply({
        content: replyText,
        blogId,
        parentCommentId: comment._id,
      });
      setReplyText("");
      setShowReplyForm(false);
      setShowReplies(true);
      fetchReplies();
      if (onReload) onReload();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
          {comment.author?.profilePicture ? (
            <img src={getImageUrl(comment.author.profilePicture)} className="w-full h-full object-cover" />
          ) : (
            <User size={16} className="text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">
              {comment.author?.name}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-1">{comment.content}</p>

          <div className="flex items-center gap-4 mt-1">
            {user && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
              >
                <CornerDownRight size={12} />
                Reply
              </button>
            )}

            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1"
            >
              {showReplies ? (
                <>
                  <ChevronUp size={14} /> Hide
                </>
              ) : (
                <>
                  <ChevronDown size={14} /> Replies
                </>
              )}
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-3 ml-4 border-l pl-4">
              <CommentForm
                onSubmit={handleReply}
                placeholder={`Reply to ${comment.author?.name}`}
                value={replyText}
                onChange={setReplyText}
                loading={submitting}
                buttonText="Reply"
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {showReplies && (
        <div className="ml-11 space-y-3 border-l pl-4">
          {loadingReplies ? (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <MoreHorizontal size={14} /> Loading...
            </div>
          ) : replies.length > 0 ? (
            <>
              {replies.map((reply) => (
                <div key={reply._id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center overflow-hidden">
                    {reply.author?.profilePicture ? (
                      <img src={getImageUrl(reply.author.profilePicture)} className="w-full h-full object-cover" />
                    ) : (
                      <User size={14} className="text-indigo-300" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-800">
                        {reply.author?.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{reply.content}</p>
                  </div>
                </div>
              ))}

              {/* Reply Pagination */}
              <div className="pt-2">
                <Pagination 
                  small 
                  pagination={replyPagination} 
                  onPageChange={setReplyPage} 
                />
              </div>
            </>
          ) : (
            <div className="text-xs text-gray-400">No replies yet.</div>
          )}
        </div>
      )}
    </div>
  );
}

// Main Component: Full Comment Section with Pagination
export default function CommentSection({ blogId, user }) {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId, page]);

  const fetchComments = async () => {
    const d = await commentService.getBlogComments(blogId, {
      page,
      limit,
    });
    setComments(d?.result || []);
    setPagination(d?.pagination);
  };

  const postComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await commentService.addComment({ content: text, blogId });
      setText("");
      setPage(1);
      fetchComments();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={18} className="text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Discussion ({pagination?.totalItems || comments.length})
        </h3>
      </div>

      {user ? (
        <div className="mb-6">
          <CommentForm
            onSubmit={postComment}
            placeholder="Write a comment..."
            value={text}
            onChange={setText}
            loading={loading}
            buttonText="Comment"
          />
        </div>
      ) : (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl text-center">
          <LogIn className="mx-auto mb-2 text-gray-400" size={20} />
          <p className="text-sm text-gray-600 mb-3">
            Sign in to join the discussion.
          </p>
          <Link href="/login">
            <Button className="!px-5 !py-2 !rounded-lg !text-xs">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((c) => (
          <CommentItem
            key={c._id}
            comment={c}
            blogId={blogId}
            user={user}
            onReload={fetchComments}
          />
        ))}

        {!comments.length && (
          <div className="text-center py-8 text-sm text-gray-400">
            No comments yet.
          </div>
        )}
      </div>

      {/* Main Pagination */}
      <div className="mt-8">
        <Pagination 
          pagination={pagination} 
          onPageChange={setPage} 
        />
      </div>
    </div>
  );
}