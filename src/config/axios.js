import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api"
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {

            localStorage.removeItem('token');

            // Optionally redirect to login or dispatch logout action
            window.location.href = '/login'; // or use navigate() if you're using React Router

            // Optionally show a toast or message
            console.error("Session expired. Please login again.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;