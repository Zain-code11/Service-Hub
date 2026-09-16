import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    window.alert("Access Denied: Providers cannot book services. Please switch to a customer account to book services.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
