import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env fayldan olinadi (Vite uchun)
});

// Har bir so‘rovga token qo‘shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Javoblar interceptori (token yangilash logikasi)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token muddati o‘tgan bo‘lsa
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refreshToken");

      if (refresh) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, { refresh });

          const newAccess = res.data.access;
          localStorage.setItem("accessToken", newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest); // qayta so‘rov
        } catch (err) {
          console.error("Token yangilashda xato:", err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
