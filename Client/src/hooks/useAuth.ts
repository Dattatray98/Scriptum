import { useNavigate } from "react-router-dom";
import { useAxios } from "./useAxios";

export const useAuth = () => {
    const api = useAxios();
    const navigate = useNavigate();

    const handleSignUp = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/signup", {
                email,
                password,
            });

            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/scriptum")

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

            localStorage.setItem("token", JSON.stringify(response.data.token))

            navigate("/scriptum")
        } catch (error) { }
    }

    return { handleSignUp, handleLogin };
};

