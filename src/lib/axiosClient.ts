import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: process.env.API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    let token = null;

    if(typeof window !== "undefined") {
        token = Cookies.get("token");
    }

    if(token && token !== "") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    (error) => Promise.reject(error)
);

export default axiosClient;
