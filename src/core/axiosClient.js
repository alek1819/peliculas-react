import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://peliculas-api-3.onrender.com/api",
});

export default axiosClient;