import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// REQUEST INTERCEPTOR (Attach token)
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN SENT:", token); // 👈 DEBUG (remove later)

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// 🔥 RESPONSE INTERCEPTOR (Handle errors globally)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized → logout automatically
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized - logging out");

      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;