import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/stores/AuthStore";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, checkLogin } = useAuthStore();

  useEffect(() => {
    if (loading) {
      checkLogin();
    }
  }, [loading, checkLogin]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.usuRole)) {
    const rolePath = `/${user.usuRole}`;
    return <Navigate to={rolePath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
