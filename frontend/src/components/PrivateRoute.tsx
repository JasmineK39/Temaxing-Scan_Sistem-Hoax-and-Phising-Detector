// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Jika ada token, render children
  return <>{children}</>;
};

export default PrivateRoute;