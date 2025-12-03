import axios from "axios";

export const useAxios = () => {
    const token = localStorage.getItem("token");

    const instance = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json"
        }
    });

    return instance;
};