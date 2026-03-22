import api from "@/lib/axios";

export const blogService = {
  create: async (formData) => {
    const res = await api.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getAll: async (params) => {
    const res = await api.get("/blogs", { params });
    return res.data.data;
  },

  getById: async (id) => {
    const res = await api.get(`/blogs/${id}`);
    return res.data.data;
  },

  update: async (id, formData) => {
    const res = await api.put(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  },
};
