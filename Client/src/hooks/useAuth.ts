import { useNavigate } from "react-router-dom";
import { useAxios } from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const api = useAxios();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);


    if (!auth) {
        throw new Error('useAuth must be used inside AuthProvider')
    }

    const { setUser} = auth;


    const handleSignUp = async (email: string, password: string) => {
        try {
         
            const response = await api.post("/auth/signup", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token)
            navigate("/workspace")

            setUser(response.data.uesr)

        } catch (err) {
            console.log(err);
        }

    };

    const handleLogin = async (email: string, password: string) => {
        try {

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            setUser(response.data.user)
            localStorage.setItem("token", response.data.token)

            navigate("/workspace")
        } catch (error) { }
    }

    return { handleSignUp, handleLogin };
};

