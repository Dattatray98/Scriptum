// src/components/ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
    const auth = useContext(AuthContext);

    if (!auth) return null;

    const { user, loading } = auth;

    if (loading) {
        return <div className="flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
