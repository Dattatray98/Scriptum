import React, { createContext, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

interface AuthContextType {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);   // it has user state
  const [loading, setLoading] = useState<boolean>(true);  // it has loading state
  const api = useAxios();  // backend initial api


  useEffect(() => {
    const handleProfile = async () => {
      const token = localStorage.getItem("token");   // getting token from localStorage

      if (!token) {   // validating token
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/profile");  // api response fetching 
        setUser(response.data.user);   // setting the user 

      } catch (error) {
        console.log("Profile fetch error:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    handleProfile();
  }, [api]); // re-run when api instance (and therefore token) changes

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
