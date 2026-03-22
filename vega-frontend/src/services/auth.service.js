import api from "@/lib/axios";

export const authService = {
  register: async (formData) => {
    const res = await api.post("/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/users/login", data);
    const { accessToken, refreshToken, user } = res.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    return res.data;
  },

  logout: async () => {
    await api.post("/users/logout");
    localStorage.clear();
  },

  getProfile: async () => {
    const res = await api.get("/users/profile");
    return res.data.data;
  },

  updateProfile: async (formData) => {
    const res = await api.put("/users/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  getDashboardStats: async () => {
    const res = await api.get("/users/stats/dashboard");
    return res.data.data;
  },
};

