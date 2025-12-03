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
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const api = useAxios();

  useEffect(() => {
    const handleProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.log("Profile fetch error:", error);
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
