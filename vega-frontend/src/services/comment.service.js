import api from "@/lib/axios";

export const commentService = {
  getBlogComments: async (blogId, params = {}) => {
    const res = await api.get(`/comments/blog/${blogId}`, { params });
    return res.data.data;
  },

  getReplies: async (commentId, params = {}) => {
    const res = await api.get(`/comments/replies/${commentId}`, { params });
    return res.data.data;
  },

  addComment: async (data) => {
    const res = await api.post("/comments/add", data);
    return res.data;
  },

  addReply: async (data) => {
    const res = await api.post("/comments/reply", data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/comments/${id}`);
    return res.data;
  },
};
