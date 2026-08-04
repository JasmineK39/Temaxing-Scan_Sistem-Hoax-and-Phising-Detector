// components/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function PrivateRoute({ 
  children, 
  allowedRoles = ["user", "admin"] 
}: PrivateRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    if (userRole === "user" && allowedRoles.includes("admin")) {
      return <Navigate to="/dashboard" replace />;
    }
    if (userRole === "admin" && allowedRoles.includes("user")) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}