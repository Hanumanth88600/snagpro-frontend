import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://snagpro-backend.onrender.com/api";
console.log("API URL =", API_URL);
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;

  }

  return config;

});

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (

      error.response?.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const refresh =
          localStorage.getItem(
            "refresh"
          );

        if (!refresh) {

          localStorage.clear();

          window.location.href = "/";

          return;

        }

        const res =
          await axios.post(

            `${API_URL}/accounts/token/refresh/`,

            {
              refresh,
            }

          );

        localStorage.setItem(

          "token",

          res.data.access

        );

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);

      }

      catch (err) {

        localStorage.clear();

        window.location.href = "/";

      }

    }

    return Promise.reject(error);

  }

);

export default api;