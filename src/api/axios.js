import axios from "axios";

const api = axios.create({

  baseURL:
    "https://snagpro-backend.onrender.com/api",

});

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }

);

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (

      error.response?.status === 401

      &&

      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const refresh =
          localStorage.getItem(
            "refresh"
          );

        const res =
          await axios.post(

            "http://127.0.0.1:8000/api/accounts/token/refresh/",

            {
              refresh
            }

          );

        localStorage.setItem(

          "token",

          res.data.access

        );

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(
          originalRequest
        );

      }

      catch {

        localStorage.clear();

        window.location.href =
          "/";

      }

    }

    return Promise.reject(
      error
    );

  }

);

export default api;