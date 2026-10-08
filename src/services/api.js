import axios from "axios";

const api = axios.create({
    baseURL: "https://freelance-platform-backend-8.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;