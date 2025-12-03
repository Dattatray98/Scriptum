// src/components/ProtectedRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import type { JSX } from "react/jsx-runtime";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const auth = useContext(AuthContext);

    // If context is not ready, block until it is (safer than assuming a value)
    if (!auth) return <Navigate to="/" replace />;

    // While we check auth status, show a loader (avoids flicker)
    if (auth.loading) {
        return <div className="flex items-center justify-center">Loading...</div>;
    }

    // If user is not logged in, redirect to landing page (where your login popup lives)
    if (!auth.user) {
        return <Navigate to="/" replace />;
    }

    // Authenticated → allow access
    return children;
};

export default ProtectedRoute;
